import React from 'react';
import { Volume2, VolumeX, ShieldCheck, BookOpen, RotateCcw } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeaderProps {
  currentView: 'select' | 'game' | 'result' | 'handbook';
  onNavigate: (view: 'select' | 'game' | 'result' | 'handbook') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestartCurrentGame?: () => void;
  hasActiveGame: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isMuted,
  onToggleMute,
  onRestartCurrentGame,
  hasActiveGame
}) => {
  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-rose-950/60 shadow-[0_4px_20px_rgba(225,29,72,0.06)]">
      {/* Top Hazard Warning Bar */}
      <div className="h-1 caution-hazard-strip w-full opacity-70" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <button
          onClick={() => {
            playClickSound();
            onNavigate('select');
          }}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20 group-hover:border-rose-400 transition-colors shadow-[0_0_12px_rgba(244,63,94,0.2)]">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors flex items-center gap-1.5">
              PsychShield
              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                ACTIVE
              </span>
            </span>
            <span className="text-[10px] text-rose-300/70 font-medium tracking-wider uppercase font-mono">
              Cyber Threat Simulator
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              playClickSound();
              onNavigate('select');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'select' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            難易度選択
          </button>

          {hasActiveGame && (
            <button
              onClick={() => {
                playClickSound();
                onNavigate('game');
              }}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
                currentView === 'game' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              演習プレイ中
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              onNavigate('handbook');
            }}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'handbook' ? 'text-emerald-400 font-semibold' : 'text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>心理誘導図鑑</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Audio Control */}
        <div className="flex items-center gap-3 shrink-0">
          {hasActiveGame && currentView === 'game' && onRestartCurrentGame && (
            <button
              onClick={() => {
                playClickSound();
                if (window.confirm('現在の演習を最初からやり直しますか？')) {
                  onRestartCurrentGame();
                }
              }}
              title="演習をリセット"
              className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">リセット</span>
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              onToggleMute();
            }}
            title={isMuted ? 'サウンドをオン' : 'サウンドをミュート'}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition-colors"
            aria-label={isMuted ? '効果音ミュート中' : '効果音有効'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {currentView !== 'game' ? (
            <button
              onClick={() => {
                playClickSound();
                onNavigate('select');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              防衛演習を開始
            </button>
          ) : (
            <button
              onClick={() => {
                playClickSound();
                onNavigate('handbook');
              }}
              className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              手口図鑑を見る
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
