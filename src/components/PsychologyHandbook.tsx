import React, { useState } from 'react';
import { PSYCHOLOGY_GUIDES } from '../data/scenarios';
import { BookOpen, ShieldCheck, AlertCircle, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface PsychologyHandbookProps {
  onBack: () => void;
  onStartGame?: () => void;
}

export const PsychologyHandbook: React.FC<PsychologyHandbookProps> = ({
  onBack,
  onStartGame
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const currentGuide = PSYCHOLOGY_GUIDES[selectedIdx];

  const triggerIcons: Record<string, string> = {
    urgency: '⏰',
    fear: '😨',
    authority: '👑',
    greed: '🎁',
    familiarity: '🤝',
    confusion: '🧩'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            playClickSound();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>戻る</span>
        </button>

        {onStartGame && (
          <button
            onClick={() => {
              playClickSound();
              onStartGame();
            }}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
          >
            演習をプレイする
          </button>
        )}
      </div>

      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>ソーシャルエンジニアリング攻略ハンドブック</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          人はなぜ騙されるのか？ 6大心理誘導パターンの解剖
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          攻撃者は高度なハッキング技術だけでなく、人間の認知的バイアス（直感的な思考のクセ）を徹底的に利用してきます。
          どのような心理トリガーが存在するのかを把握しておくことが、最大の自己防衛になります。
        </p>
      </div>

      {/* Handbook Interactive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Trigger Switcher */}
        <div className="md:col-span-4 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            心理的誘導トリガー一覧
          </span>
          <div className="space-y-1.5">
            {PSYCHOLOGY_GUIDES.map((guide, idx) => {
              const isSelected = selectedIdx === idx;
              const icon = triggerIcons[guide.type] || '⚡';
              return (
                <button
                  key={guide.type}
                  onClick={() => {
                    playClickSound();
                    setSelectedIdx(idx);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/80 text-white font-bold shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <span className="block truncate">{guide.title}</span>
                    <span className="text-[10px] text-slate-400 block truncate font-normal">
                      {guide.catchphrase}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Trigger Detail Content */}
        <div className="md:col-span-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Header */}
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{triggerIcons[currentGuide.type]}</span>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {currentGuide.title}
                  </h2>
                  <span className="text-xs text-amber-300 font-medium">
                    頻出フレーズ: {currentGuide.catchphrase}
                  </span>
                </div>
              </div>
            </div>

            {/* Attack Goal */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>攻撃者の狙い（心理的メカニズム）</span>
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                {currentGuide.attackGoal}
              </p>
            </div>

            {/* Real World Attack Examples */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                現場でよく見られる実際の詐欺文例
              </h3>
              <div className="space-y-2">
                {currentGuide.realExamples.map((example, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 font-mono flex items-start gap-2"
                  >
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Countermeasure / Defense Action */}
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
              <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>実践的な防御策（カウンターメジャー）</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-sans">
                {currentGuide.countermeasure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
