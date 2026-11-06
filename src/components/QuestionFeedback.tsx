import React from 'react';
import { Scenario, PsychologicalTriggerType } from '../types/game';
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface QuestionFeedbackProps {
  scenario: Scenario;
  userJudgedSpoofed: boolean;
  isCorrect: boolean;
  selectedTrigger?: PsychologicalTriggerType;
  isLastQuestion: boolean;
  onNext: () => void;
  onOpenHandbook: () => void;
}

export const QuestionFeedback: React.FC<QuestionFeedbackProps> = ({
  scenario,
  userJudgedSpoofed,
  isCorrect,
  selectedTrigger,
  isLastQuestion,
  onNext,
  onOpenHandbook
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Result Header Banner */}
        <div
          className={`p-6 border-b flex items-start gap-4 ${
            isCorrect
              ? 'bg-emerald-950/50 border-emerald-800/80'
              : 'bg-rose-950/50 border-rose-800/80'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {isCorrect ? '正解！見抜きました' : '不正解・要警戒'}
              </span>
              <span className="text-xs text-slate-400">トリアージ判定結果</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {isCorrect
                ? scenario.isSpoofed
                  ? '巧妙ななりすまし・心理誘導を見破りました！'
                  : '安全な正規通知であることを正しく見極めました！'
                : scenario.isSpoofed
                  ? '注意：このメッセージは「なりすまし詐欺」でした'
                  : '注意：これは「安全な正規の連絡」でした（過検知）'}
            </h3>
            <p className="text-xs text-slate-300 pt-0.5">
              あなたの回答: <strong className="text-white">{userJudgedSpoofed ? 'なりすまし・詐欺' : '安全・正規連絡'}</strong>
              <span className="mx-2">/</span>
              正解: <strong className="text-emerald-400">{scenario.isSpoofed ? 'なりすまし・詐欺' : '安全・正規連絡'}</strong>
              （{scenario.attackType}）
            </p>
          </div>
        </div>

        {/* Deep Dive Learning Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto text-xs sm:text-sm">
          {/* Core Verdict */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              {scenario.isSpoofed ? (
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>手口の結論と見極めのポイント</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              {scenario.explanation.summary}
            </p>
            <p className="text-slate-300 text-xs leading-relaxed border-t border-slate-800 pt-2">
              {scenario.explanation.whySafeOrSpoofed}
            </p>
          </div>

          {/* Psychological Traps Breakdown */}
          {scenario.isSpoofed && scenario.psychologicalTriggers.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>攻撃者が仕掛けた心理的誘導（ソーシャルエンジニアリング）</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenHandbook();
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>図鑑で手口確認</span>
                </button>
              </div>

              <div className="space-y-2">
                {scenario.psychologicalTriggers.map((trig, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="font-bold text-amber-300 block mb-1">
                      【{trig.label}】
                    </span>
                    <span className="text-slate-300 leading-relaxed">{trig.description}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
                💡 <strong className="text-slate-300">心理トラップの正体:</strong> {scenario.explanation.psychologicalTrap}
              </p>
            </div>
          )}

          {/* Checklist for Verification */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white block">
              現場でチェックすべき着眼点リスト：
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {scenario.explanation.checklistPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Golden Defense Rule */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 text-xs text-slate-200">
            <strong className="text-emerald-400 block mb-0.5">🛡️ 実践の黄金ルール:</strong>
            {scenario.explanation.defenseRule}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenHandbook();
            }}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            心理誘導図鑑で復習する
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onNext();
            }}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 transition-colors shadow-md"
          >
            <span>{isLastQuestion ? '総合リザルト画面へ' : '次の問題へ進む'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
