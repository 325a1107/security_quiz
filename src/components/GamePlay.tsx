import React, { useState, useEffect, useRef } from 'react';
import { Difficulty, Scenario, UserAnswerRecord, GameStats, PsychologicalTriggerType } from '../types/game';
import { DIFFICULTY_CONFIGS, SCENARIOS } from '../data/scenarios';
import { MessageRenderer } from './MessageRenderer';
import { InspectorPanel } from './InspectorPanel';
import { QuestionFeedback } from './QuestionFeedback';
import { Shield, ShieldAlert, Heart, Clock, Award, Flame, AlertCircle } from 'lucide-react';
import { playClickSound, playSuccessSound, playFailureSound } from '../utils/audio';

interface GamePlayProps {
  difficulty: Difficulty;
  onFinishGame: (stats: GameStats) => void;
  onOpenHandbook: () => void;
}

export const GamePlay: React.FC<GamePlayProps> = ({
  difficulty,
  onFinishGame,
  onOpenHandbook
}) => {
  const config = DIFFICULTY_CONFIGS[difficulty];

  // Select scenarios for current difficulty
  const [scenarioList, setScenarioList] = useState<Scenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gameplay state
  const [lives, setLives] = useState(config.initialLives);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState<UserAnswerRecord[]>([]);

  // Inspector & clue state
  const [isInspectionMode, setIsInspectionMode] = useState(false);
  const [unlockedClueIds, setUnlockedClueIds] = useState<string[]>([]);
  const [selectedTrigger, setSelectedTrigger] = useState<PsychologicalTriggerType | undefined>();

  // Feedback dialog state
  const [activeFeedback, setActiveFeedback] = useState<{
    userJudgedSpoofed: boolean;
    isCorrect: boolean;
  } | null>(null);

  // Timer for Hard mode
  const [timeLeft, setTimeLeft] = useState<number | null>(config.timeLimitPerQuestion || null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fisher-Yates shuffle algorithm for true unbiased randomness
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initialize scenarios on mount or difficulty change with guaranteed random selection
  useEffect(() => {
    // Filter scenarios matching this difficulty
    const matched = SCENARIOS.filter(s => s.difficulty === difficulty);
    // Shuffle the full pool using Fisher-Yates
    const randomizedPool = shuffleArray(matched);
    // Take the target question count
    const selected = randomizedPool.slice(0, config.questionCount);
    // Ensure final presentation order is also freshly shuffled
    setScenarioList(shuffleArray(selected));
    setCurrentIndex(0);
    setLives(config.initialLives);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnswers([]);
    setUnlockedClueIds([]);
    setSelectedTrigger(undefined);
    setIsInspectionMode(false);
  }, [difficulty]);

  // Current scenario
  const currentScenario = scenarioList[currentIndex];

  // Countdown timer logic for Hard mode
  useEffect(() => {
    if (activeFeedback || !config.timeLimitPerQuestion || !currentScenario) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(config.timeLimitPerQuestion);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Time expired -> count as incorrect timeout
          handleDecision(false, true); // Timeout auto-fails
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, activeFeedback]);

  // Clue discovery
  const handleClueClick = (clueId: string) => {
    if (!unlockedClueIds.includes(clueId)) {
      setUnlockedClueIds(prev => [...prev, clueId]);
      setScore(s => s + 20); // Small bonus for actively investigating!
    }
  };

  const handleRevealAllClues = () => {
    if (!currentScenario) return;
    setUnlockedClueIds(currentScenario.clues.map(c => c.id));
  };

  // User decision (Safe vs Spoofed)
  const handleDecision = (userJudgedSpoofed: boolean, isTimeout = false) => {
    if (!currentScenario || activeFeedback) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = !isTimeout && (userJudgedSpoofed === currentScenario.isSpoofed);

    // Calculate score addition
    let gainedScore = 0;
    let newStreak = streak;
    let newMaxStreak = maxStreak;
    let newLives = lives;

    if (isCorrect) {
      playSuccessSound();
      newStreak = streak + 1;
      if (newStreak > newMaxStreak) newMaxStreak = newStreak;

      // Base score
      gainedScore += 100;

      // Streak multiplier bonus
      gainedScore += Math.min(newStreak * 20, 100);

      // Speed bonus if hard mode with time remaining
      if (timeLeft && timeLeft > 0) {
        gainedScore += timeLeft * 2;
      }

      // Bonus if correctly diagnosed psychological trigger
      if (selectedTrigger && currentScenario.psychologicalTriggers.some(t => t.type === selectedTrigger)) {
        gainedScore += 50;
      }
    } else {
      playFailureSound();
      newStreak = 0;
      newLives = Math.max(0, lives - 1);
    }

    setLives(newLives);
    setScore(s => s + gainedScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);

    // Record answer
    const record: UserAnswerRecord = {
      scenarioId: currentScenario.id,
      scenario: currentScenario,
      userJudgedSpoofed,
      isCorrect,
      selectedTrigger,
      cluesFound: unlockedClueIds,
      timeSpentSeconds: config.timeLimitPerQuestion ? (config.timeLimitPerQuestion - (timeLeft || 0)) : 0
    };

    setAnswers(prev => [...prev, record]);

    // Show immediate feedback modal
    setActiveFeedback({
      userJudgedSpoofed,
      isCorrect
    });
  };

  // Move to next question or complete
  const handleNextQuestion = () => {
    setActiveFeedback(null);
    setUnlockedClueIds([]);
    setSelectedTrigger(undefined);
    setIsInspectionMode(false);

    const isLast = currentIndex >= scenarioList.length - 1;
    const isOutOfLives = lives <= 0;

    if (isLast || isOutOfLives) {
      // Complete game
      const finalStats: GameStats = {
        difficulty,
        totalQuestions: answers.length,
        correctCount: answers.filter(a => a.isCorrect).length,
        score,
        streak,
        maxStreak,
        livesRemaining: lives,
        answers,
        completedAt: new Date().toISOString()
      };
      onFinishGame(finalStats);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!currentScenario) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <div className="text-slate-400">シナリオデータを読み込んでいます...</div>
      </div>
    );
  }

  const isLastQuestion = currentIndex >= scenarioList.length - 1 || lives <= 0;
  const progressPercent = Math.round(((currentIndex + 1) / scenarioList.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
      {/* HUD & Status Bar */}
      <div className="p-4 rounded-xl bg-[#12070c]/90 border border-rose-950/60 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(225,29,72,0.08)]">
        {/* Progress & Difficulty */}
        <div className="space-y-1 min-w-[160px]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white uppercase">{config.name}</span>
            <span className="text-rose-900">·</span>
            <span className="text-rose-400 font-mono font-semibold">
              第 {currentIndex + 1} / {scenarioList.length} 問
            </span>
          </div>

          <div className="w-full sm:w-48 h-2 bg-slate-950 rounded-full overflow-hidden border border-rose-950/50">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lives / Shields */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-rose-300/80 font-medium">防衛残機:</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: config.initialLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-colors ${
                  i < lives ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]' : 'text-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hard Mode Timer if applicable */}
        {config.timeLimitPerQuestion && timeLeft !== null && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-950/40 border border-rose-900/50">
            <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            <span className={`text-sm font-mono font-bold ${timeLeft <= 10 ? 'text-rose-400' : 'text-white'}`}>
              残り {timeLeft} 秒
            </span>
          </div>
        )}

        {/* Streak & Score */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-amber-400 animate-pulse">
              <Flame className="w-4 h-4" />
              <span>{streak} 連続迎撃！</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-[#0a0407] px-3 py-1.5 rounded-lg border border-rose-950/80">
            <Award className="w-4 h-4 text-rose-400" />
            <span className="text-slate-400">SCORE:</span>
            <span className="font-bold text-white text-sm">{score}</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Message Viewer on Left (7 cols), Inspector on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Communication Viewer */}
        <div className="lg:col-span-8 space-y-4">
          <MessageRenderer
            scenario={currentScenario}
            isInspectionMode={isInspectionMode}
            onClueClick={handleClueClick}
            unlockedClueIds={unlockedClueIds}
          />

          {/* Decision Action Deck */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#12070c]/90 border border-rose-950/60 space-y-3 shadow-[0_0_25px_rgba(225,29,72,0.06)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>このメッセージをトリアージ判定してください：</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                THREAT EVALUATION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  handleDecision(false);
                }}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                <Shield className="w-5 h-5" />
                <span>安全・正規メッセージ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  handleDecision(true);
                }}
                className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
              >
                <ShieldAlert className="w-5 h-5" />
                <span>なりすまし・心理誘導</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Security Inspector Deck */}
        <div className="lg:col-span-4">
          <InspectorPanel
            scenario={currentScenario}
            isInspectionMode={isInspectionMode}
            onToggleInspectionMode={() => setIsInspectionMode(!isInspectionMode)}
            unlockedClueIds={unlockedClueIds}
            onRevealAllClues={handleRevealAllClues}
            hintAllowed={config.hintAllowed}
            selectedTrigger={selectedTrigger}
            onSelectTrigger={setSelectedTrigger}
          />
        </div>
      </div>

      {/* Immediate Question Result Modal */}
      {activeFeedback && (
        <QuestionFeedback
          scenario={currentScenario}
          userJudgedSpoofed={activeFeedback.userJudgedSpoofed}
          isCorrect={activeFeedback.isCorrect}
          selectedTrigger={selectedTrigger}
          isLastQuestion={isLastQuestion}
          onNext={handleNextQuestion}
          onOpenHandbook={onOpenHandbook}
        />
      )}
    </div>
  );
};
