import React from 'react';
import { Scenario, PsychologicalTriggerType } from '../types/game';
import { Search, Lightbulb, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { playInspectSound, playClickSound } from '../utils/audio';

interface InspectorPanelProps {
  scenario: Scenario;
  isInspectionMode: boolean;
  onToggleInspectionMode: () => void;
  unlockedClueIds: string[];
  onRevealAllClues: () => void;
  hintAllowed: boolean;
  selectedTrigger?: PsychologicalTriggerType;
  onSelectTrigger: (trigger: PsychologicalTriggerType) => void;
}

const PSYCHOLOGICAL_OPTIONS: { type: PsychologicalTriggerType; label: string; icon: string }[] = [
  { type: 'urgency', label: '緊急性・締切の焦り', icon: '⏰' },
  { type: 'fear', label: '恐怖・アカウント停止', icon: '😨' },
  { type: 'authority', label: '権威・社長や情シスの命令', icon: '👑' },
  { type: 'greed', label: '欲求・還付金や特別利益', icon: '🎁' },
  { type: 'social_proof', label: '同調圧力・全社員対応', icon: '👥' },
  { type: 'familiarity', label: '好意・親近感・既成事実', icon: '🤝' },
  { type: 'confusion', label: '技術的煙幕・難解エラー', icon: '🧩' },
];

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  scenario,
  isInspectionMode,
  onToggleInspectionMode,
  unlockedClueIds,
  onRevealAllClues,
  hintAllowed,
  selectedTrigger,
  onSelectTrigger
}) => {
  const totalClues = scenario.clues.length;
  const foundCluesCount = unlockedClueIds.length;

  return (
    <div className="space-y-4">
      {/* Inspector Toggle & Hint Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">
              インスペクター（手がかり調査ツール）
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            手がかり: {foundCluesCount} / {totalClues}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {isInspectionMode
            ? '💡 メッセージ内の差出人、本文、URL、添付ファイルをクリックして不審点を調査してください。'
            : '調査モードをオンにすると、メッセージ各部をクリックして隠れたチェックポイントを照会できます。'}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              playInspectSound();
              onToggleInspectionMode();
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
              isInspectionMode
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isInspectionMode ? '調査モード稼働中' : '調査モードを起動'}</span>
          </button>

          {hintAllowed && foundCluesCount < totalClues && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onRevealAllClues();
              }}
              className="py-2 px-3 rounded-lg text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>ヒントを開示</span>
            </button>
          )}
        </div>
      </div>

      {/* Discovered Clues List */}
      {unlockedClueIds.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            発見された着眼点
          </span>
          <div className="space-y-2">
            {scenario.clues
              .filter(clue => unlockedClueIds.includes(clue.id))
              .map((clue) => (
                <div
                  key={clue.id}
                  className={`p-3 rounded-lg text-xs border ${
                    clue.isSuspicious
                      ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {clue.isSuspicious ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                    <span>{clue.label}</span>
                    <span className="text-[10px] ml-auto font-normal opacity-80">
                      {clue.isSuspicious ? '危険要因' : '正規基準合致'}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{clue.explanation}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Psychological Trigger Diagnosis (Interactive learning option) */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white">心理誘導の狙い（任意分析）</h4>
          </div>
          <span className="text-[10px] text-slate-400">ボーナス考察</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          もしこのメッセージが「なりすまし」だとすれば、攻撃者はどの心理的弱点（バイアス）を突こうとしていますか？
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          {PSYCHOLOGICAL_OPTIONS.map((opt) => {
            const isSelected = selectedTrigger === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectTrigger(opt.type);
                }}
                className={`p-2 rounded-lg text-left text-xs transition-colors border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-sm shrink-0">{opt.icon}</span>
                <span className="truncate text-[11px]">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
