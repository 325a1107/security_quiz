import React, { useState } from 'react';
import { GameStats, Difficulty } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/scenarios';
import { 
  Award, CheckCircle2, XCircle, RotateCcw, 
  BookOpen, Copy, Check, ChevronDown, ChevronUp,
  AlertTriangle, Shield, TrendingUp, Sparkles
} from 'lucide-react';
import { playClickSound, playVictorySound } from '../utils/audio';

interface ResultReportProps {
  stats: GameStats;
  onRestart: () => void;
  onChangeDifficulty: () => void;
  onOpenHandbook: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  stats,
  onRestart,
  onChangeDifficulty,
  onOpenHandbook
}) => {
  const [copied, setCopied] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  React.useEffect(() => {
    playVictorySound();
  }, []);

  const config = DIFFICULTY_CONFIGS[stats.difficulty];
  const accuracy = Math.round((stats.correctCount / stats.totalQuestions) * 100);

  // Determine Rank
  let rank = 'C';
  let rankTitle = '要再受講・防衛初任者';
  let rankColor = 'text-amber-400';
  let rankDescription = '日常の巧妙な罠や心理誘導に引っかかるリスクがあります。解説をしっかり復習しましょう。';

  if (accuracy >= 90) {
    rank = 'S';
    rankTitle = 'サイバーセキュリティ特務マスター';
    rankColor = 'text-emerald-400';
    rankDescription = '見事な洞察力です！巧妙なタイポスクワッティングや権威・恐怖の心理誘導を完璧に見破りました。';
  } else if (accuracy >= 75) {
    rank = 'A';
    rankTitle = 'セキュリティ防衛リーダー';
    rankColor = 'text-cyan-400';
    rankDescription = '高い防御リテラシーを持っています。正規連絡の判定や細部のドメイン確認も的確です。';
  } else if (accuracy >= 50) {
    rank = 'B';
    rankTitle = '一般セキュリティ防衛員';
    rankColor = 'text-blue-400';
    rankDescription = '基本的ななりすましは見抜けていますが、焦りや権威を突く手口に注意が必要です。';
  }

  // Filter answers
  const filteredAnswers = stats.answers.filter((ans) => {
    if (filterMode === 'incorrect') return !ans.isCorrect;
    if (filterMode === 'correct') return ans.isCorrect;
    return true;
  });

  const handleCopySummary = () => {
    playClickSound();
    const text = `【PsychShield セキュリティ防衛演習】
難易度: ${config.name}
判定結果: ランク ${rank}（${rankTitle}）
スコア: ${stats.score} 点
正答率: ${stats.correctCount}/${stats.totalQuestions} 問正解 (${accuracy}%)
心理的誘導・なりすましへの対応力を測定しました！`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleExpand = (idx: number) => {
    playClickSound();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">
      {/* Top Banner / Certificate Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Badge Image & Rank Display */}
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-slate-950">
              <img
                src="/src/assets/images/badge_security_master_1793334450741.jpg"
                alt="Cybersecurity Certificate Insignia"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-2">
                <span className={`text-3xl font-extrabold tracking-tight ${rankColor}`}>
                  RANK {rank}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                認定称号
              </span>
              <h2 className={`text-base sm:text-lg font-bold ${rankColor}`}>
                {rankTitle}
              </h2>
            </div>
          </div>

          {/* Performance Summary Metrics */}
          <div className="md:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-emerald-400 uppercase tracking-wider">{config.name}</span>
              <span aria-hidden="true">·</span>
              <span>演習完了レポート</span>
              <span aria-hidden="true">·</span>
              <span>{new Date(stats.completedAt).toLocaleString('ja-JP')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              セキュリティトリアージ演習 リザルト
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {rankDescription}
            </p>

            {/* Score Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">総合スコア</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-white">
                  {stats.score}
                  <span className="text-xs font-sans text-slate-400 ml-1">pts</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">正答率</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">
                  {accuracy}%
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">正解数</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-white">
                  {stats.correctCount} / {stats.totalQuestions}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">最大連勝記録</span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400">
                  {stats.maxStreak}
                  <span className="text-xs font-sans text-slate-400 ml-1">連続</span>
                </span>
              </div>
            </div>

            {/* Action Buttons in Banner */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRestart}
                className="py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>もう一度この難易度で挑戦</span>
              </button>

              <button
                onClick={onChangeDifficulty}
                className="py-2.5 px-4 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                別の難易度を選択
              </button>

              <button
                onClick={handleCopySummary}
                className="py-2.5 px-3.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '結果をコピーしました' : '結果をシェア'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Golden Rules Takeaway */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold">今日からオフィスや日常で実践できる「防衛の3大黄金ルール」</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>01.</span>
              <span>1分待つ「深呼吸ルール」</span>
            </span>
            <p className="text-slate-300 leading-relaxed">
              「24時間以内」「本日中」「緊急」と急かされた時こそ、攻撃者の罠です。1分間席を立って深呼吸し、冷静さを取り戻しましょう。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <span>02.</span>
              <span>別ルート「コールバックルール」</span>
            </span>
            <p className="text-slate-300 leading-relaxed">
              メール内のリンクや電話番号は偽装可能です。必ず手元のカード裏面、公式アプリ、既知の内線番号から照会してください。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>03.</span>
              <span>パスワード・OTPの「不可侵ルール」</span>
            </span>
            <p className="text-slate-300 leading-relaxed">
              社長やIT情シス、銀行員であっても、他人のパスワードやワンタイム認証コードを聞き出す正規の業務運用は100%存在しません。
            </p>
          </div>
        </div>
      </div>

      {/* Deep-Dive All-Question Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              全問振り返り・詳細解説アーカイブ
            </h2>
            <p className="text-xs text-slate-400">
              各問をクリックして展開すると、攻撃者の手口や見分け方の詳細を確認できます。
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto text-xs">
            <button
              onClick={() => {
                playClickSound();
                setFilterMode('all');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              すべて ({stats.answers.length})
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilterMode('incorrect');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterMode === 'incorrect'
                  ? 'bg-rose-500/20 text-rose-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              要復習 ({stats.answers.filter(a => !a.isCorrect).length})
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilterMode('correct');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterMode === 'correct'
                  ? 'bg-emerald-500/20 text-emerald-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              正解 ({stats.answers.filter(a => a.isCorrect).length})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-3">
          {filteredAnswers.map((record, index) => {
            const isExpanded = expandedIndex === index;
            const s = record.scenario;

            return (
              <div
                key={record.scenarioId}
                className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden transition-colors"
              >
                {/* Accordion Summary Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        record.isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {record.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>第 {index + 1} 問</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-slate-300">{s.attackType}</span>
                        <span aria-hidden="true">·</span>
                        <span className={s.isSpoofed ? 'text-rose-400' : 'text-emerald-400'}>
                          {s.isSpoofed ? 'なりすまし/攻撃' : '正規/安全'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs">
                    <div className="hidden sm:flex flex-col text-right">
                      <span className="text-[10px] text-slate-400">あなたの判定</span>
                      <span className={record.isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        {record.userJudgedSpoofed ? 'なりすまし' : '安全・正規'}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Detailed Breakdown */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-950/60 space-y-4 text-xs sm:text-sm animate-in fade-in duration-200">
                    {/* Message Snippet */}
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
                        <span>差出人: <strong className="text-white">{s.senderDisplay}</strong> &lt;{s.senderAddress}&gt;</span>
                        <span>{s.timestamp}</span>
                      </div>
                      <div className="text-slate-300 whitespace-pre-wrap font-sans max-h-36 overflow-y-auto leading-relaxed">
                        {s.content}
                      </div>
                    </div>

                    {/* Verdict Explanation */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>なぜこの判定になるのか（解説）</span>
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {s.explanation.summary}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {s.explanation.whySafeOrSpoofed}
                      </p>
                    </div>

                    {/* Psychological Triggers if Spoofed */}
                    {s.isSpoofed && s.psychologicalTriggers.length > 0 && (
                      <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <span className="font-bold text-cyan-400 block">
                          仕掛けられていた心理誘導（ソーシャルエンジニアリング）：
                        </span>
                        <div className="space-y-1.5">
                          {s.psychologicalTriggers.map((trig, tIdx) => (
                            <div key={tIdx} className="text-slate-300">
                              <strong className="text-amber-300">・{trig.label}：</strong>
                              <span>{trig.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checklist points */}
                    <div className="space-y-1.5 text-xs">
                      <span className="font-bold text-slate-300 block">見抜くための着眼点：</span>
                      <ul className="space-y-1 text-slate-400 pl-4 list-disc">
                        {s.explanation.checklistPoints.map((point, pIdx) => (
                          <li key={pIdx}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Rule */}
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200">
                      <strong>現場防衛ルール：</strong> {s.explanation.defenseRule}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Handbook CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white font-bold">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>心理誘導の全容をもっと詳しく知りたいですか？</span>
          </div>
          <p className="text-xs text-slate-300">
            攻撃者が使う6大心理誘導パターン（緊急性・恐怖・権威・利得・好意・煙幕）の体系的な図鑑を公開しています。
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenHandbook();
          }}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs border border-slate-600 transition-colors shrink-0 shadow-sm"
        >
          心理誘導図鑑を開く
        </button>
      </div>
    </div>
  );
};
