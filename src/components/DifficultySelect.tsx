import React from 'react';
import { Difficulty } from '../types/game';
import { DIFFICULTY_CONFIGS, SCENARIOS } from '../data/scenarios';
import { Shield, ShieldAlert, Zap, Clock, Award, CheckCircle2, BookOpen, AlertTriangle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface DifficultySelectProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onOpenHandbook: () => void;
  highScores?: Record<Difficulty, { score: number; accuracy: number; date: string } | null>;
}

export const DifficultySelect: React.FC<DifficultySelectProps> = ({
  onSelectDifficulty,
  onOpenHandbook,
  highScores
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-950/70 bg-[#12070c] shadow-[0_0_40px_rgba(225,29,72,0.12)]">
        {/* Top Caution Strip */}
        <div className="h-1 caution-hazard-strip w-full opacity-80" />

        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_cyber_defense_1793334451137.jpg"
            alt="Cyber Defense Command Operations"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0509] via-[#0d0509]/95 to-[#160810]/70" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider font-mono text-[11px] animate-pulse">
              ● THREAT ALERT: ELEVATED
            </span>
            <span className="text-rose-900" aria-hidden="true">·</span>
            <span className="text-slate-300 font-medium">ソーシャルエンジニアリング迎撃訓練</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            巧妙な心理誘導・なりすましの罠を暴け<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">
              実践的トリアージ防衛シミュレーション
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            サイバー攻撃者はあなたのPCではなく、<strong className="text-rose-300 font-semibold">「焦り・恐怖・権威・好意」という人間の心理的盲点</strong>を突いてきます。
            リアルに再現されたメール・チャット・SMSの脅威を分析し、組織と自分を守る判断力を養いましょう。
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>本物の正規連絡も混在（過剰拒否も防ぐ実戦仕様）</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>全問に手口と心理トリガーの詳細解説つき</span>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Selection Deck */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">演習の難易度を選択してください</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              ご自身の習熟度や訓練目的に合わせてモードを選択できます。
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onOpenHandbook();
            }}
            className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-auto"
          >
            <BookOpen className="w-4 h-4" />
            <span>先に心理誘導の6大パターンを予習する</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['easy', 'normal', 'hard'] as Difficulty[]).map((diffKey) => {
            const config = DIFFICULTY_CONFIGS[diffKey];
            const prevScore = highScores?.[diffKey];

            const themeClasses = {
              easy: {
                border: 'border-slate-800 hover:border-emerald-500/50',
                badgeBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
                icon: Shield,
                glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              },
              normal: {
                border: 'border-slate-800 hover:border-blue-500/50',
                badgeBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
                btnBg: 'bg-blue-600 hover:bg-blue-500 text-white font-bold',
                icon: ShieldAlert,
                glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
              },
              hard: {
                border: 'border-slate-800 hover:border-rose-500/50',
                badgeBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
                btnBg: 'bg-rose-600 hover:bg-rose-500 text-white font-bold',
                icon: Zap,
                glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]'
              }
            }[diffKey];

            const IconComponent = themeClasses.icon;

            return (
              <div
                key={diffKey}
                className={`group relative flex flex-col justify-between rounded-xl bg-[#13070d]/90 p-6 border transition-all duration-300 ${themeClasses.border} ${themeClasses.glow}`}
              >
                <div className="space-y-4">
                  {/* Top line metadata */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${themeClasses.badgeBg}`}>
                      {config.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <IconComponent className="w-4 h-4" />
                      <span>{config.questionCount}問出題</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-rose-400/90 font-mono text-[11px]">全{SCENARIOS.filter(s => s.difficulty === diffKey).length}問からランダム</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                      {config.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {config.subTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[40px]">
                    {config.description}
                  </p>

                  {/* Conditions & Constraints */}
                  <div className="py-2.5 px-3 rounded-lg bg-[#0c0408]/90 border border-rose-950/60 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">許容ミス数</span>
                      <span className="font-semibold text-white">
                        {config.initialLives === 1 ? '1ミス即終了（緊張感最大）' : `${config.initialLives}回までミス可能`}
                      </span>
                    </div>
                    {config.timeLimitPerQuestion ? (
                      <div className="flex items-center justify-between text-rose-300 font-medium">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-rose-400" />
                          制限時間
                        </span>
                        <span>{config.timeLimitPerQuestion}秒 / 問</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">制限時間</span>
                        <span>じっくり検討可能（なし）</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">ヒント機能</span>
                      <span className={config.hintAllowed ? 'text-emerald-400' : 'text-slate-500'}>
                        {config.hintAllowed ? '利用可能' : '使用不可'}
                      </span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <span className="text-[11px] font-semibold text-slate-300 block">主な出題手口：</span>
                    {config.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-900 mt-0.5">·</span>
                        <span className="text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Past High Score record */}
                  {prevScore && (
                    <div className="pt-2 border-t border-rose-950/50 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Award className="w-3.5 h-3.5" />
                        過去最高スコア
                      </span>
                      <span className="font-mono font-semibold text-white">
                        {prevScore.score} pts ({prevScore.accuracy}%)
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectDifficulty(diffKey);
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow-md ${themeClasses.btnBg}`}
                  >
                    この難易度で開始する
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#17090f]/90 border border-amber-800/40 flex items-start gap-3 text-xs text-slate-300 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-200 flex items-center gap-2">
            <span>セキュリティ教育における「トリアージ力」の重要性</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ALERT
            </span>
          </p>
          <p className="text-slate-300 leading-relaxed">
            現代の攻撃者は、公式ロゴや実在の社内・取引先の名前を巧妙に偽装します。疑うあまり全ての正規連絡を無視すると業務が停滞し、逆に安易に信用すると重大な情報漏洩に繋がります。本演習を通じて「送信元ドメインの検証」「別ルート確認の習慣」「心理トリガーへの気付き」を身につけましょう。
          </p>
        </div>
      </div>
    </div>
  );
};
