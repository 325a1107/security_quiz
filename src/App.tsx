/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Difficulty, GameStats } from './types/game';
import { Header } from './components/Header';
import { DifficultySelect } from './components/DifficultySelect';
import { GamePlay } from './components/GamePlay';
import { ResultReport } from './components/ResultReport';
import { PsychologyHandbook } from './components/PsychologyHandbook';
import { getMuted, setMuted } from './utils/audio';
import {
  ALLOWED_DIFFICULTIES,
  HighScoreMap,
  createEmptyHighScores,
  safeParseHighScores,
  safeSaveHighScores,
} from './utils/security';

const STORAGE_KEY_HIGHSCORES = 'psychshield_highscores_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<'select' | 'game' | 'result' | 'handbook'>('select');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [lastStats, setLastStats] = useState<GameStats | null>(null);
  const [isMuted, setIsMutedState] = useState(false);
  const [gameSessionId, setGameSessionId] = useState(1);

  // High score tracking per difficulty
  const [highScores, setHighScores] = useState<HighScoreMap>(createEmptyHighScores);

  // Load and schema-validate past high scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGHSCORES);
      if (saved) {
        setHighScores(safeParseHighScores(saved));
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMutedState(next);
    setMuted(next);
  };

  const handleSelectDifficulty = (diff: Difficulty) => {
    if (!ALLOWED_DIFFICULTIES.includes(diff)) return;
    setSelectedDifficulty(diff);
    setGameSessionId(prev => prev + 1);
    setCurrentView('game');
  };

  const handleFinishGame = (stats: GameStats) => {
    setLastStats(stats);
    setCurrentView('result');

    if (!ALLOWED_DIFFICULTIES.includes(stats.difficulty) || stats.totalQuestions <= 0) {
      return;
    }

    // Update high scores with bounded values
    const safeScore = Math.max(0, Math.min(100000, Math.round(Number.isFinite(stats.score) ? stats.score : 0)));
    const accuracy = Math.max(0, Math.min(100, Math.round((stats.correctCount / stats.totalQuestions) * 100)));
    const currentBest = highScores[stats.difficulty];

    if (!currentBest || safeScore > currentBest.score) {
      const updated: HighScoreMap = {
        ...highScores,
        [stats.difficulty]: {
          score: safeScore,
          accuracy,
          date: new Date().toISOString()
        }
      };
      setHighScores(updated);
      safeSaveHighScores(STORAGE_KEY_HIGHSCORES, updated);
    }
  };

  const handleRestartCurrentGame = () => {
    setGameSessionId(prev => prev + 1);
    setCurrentView('game');
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white relative bg-[#0b0508]">
      {/* Dynamic Cyber Threat Atmosphere Layers */}
      <div className="threat-ambient-bg" aria-hidden="true" />
      <div className="threat-grid-pattern" aria-hidden="true" />

      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onRestartCurrentGame={handleRestartCurrentGame}
        hasActiveGame={currentView === 'game'}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 pb-16 relative z-10">
        {currentView === 'select' && (
          <DifficultySelect
            onSelectDifficulty={handleSelectDifficulty}
            onOpenHandbook={() => setCurrentView('handbook')}
            highScores={highScores}
          />
        )}

        {currentView === 'game' && (
          <GamePlay
            key={gameSessionId}
            difficulty={selectedDifficulty}
            onFinishGame={handleFinishGame}
            onOpenHandbook={() => setCurrentView('handbook')}
          />
        )}

        {currentView === 'result' && lastStats && (
          <ResultReport
            stats={lastStats}
            onRestart={handleRestartCurrentGame}
            onChangeDifficulty={() => setCurrentView('select')}
            onOpenHandbook={() => setCurrentView('handbook')}
          />
        )}

        {currentView === 'handbook' && (
          <PsychologyHandbook
            onBack={() => {
              if (lastStats && currentView === 'handbook') {
                setCurrentView('select');
              } else {
                setCurrentView('select');
              }
            }}
            onStartGame={() => setCurrentView('select')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-950/40 bg-black/70 backdrop-blur-sm py-6 text-xs text-slate-400 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-rose-300">PsychShield 脅威防衛シミュレーター</span>
            <span className="text-rose-900">·</span>
            <span>ソーシャルエンジニアリング・警戒態勢トリアージ演習</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right font-mono text-[11px]">
            <span className="text-rose-400/80">THREAT DEFENSE MONITOR</span>
            <span className="mx-2 text-slate-600">|</span>
            <span>実在の詐欺手口を基にした標的型攻撃対策訓練</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
