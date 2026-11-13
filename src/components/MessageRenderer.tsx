import React, { useState } from 'react';
import { Scenario } from '../types/game';
import { Mail, MessageSquare, Smartphone, ShieldAlert, Paperclip, ExternalLink, Globe, Lock, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { sanitizeDisplayText } from '../utils/security';

interface MessageRendererProps {
  scenario: Scenario;
  isInspectionMode: boolean;
  onClueClick?: (clueId: string) => void;
  unlockedClueIds: string[];
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  scenario,
  isInspectionMode,
  onClueClick,
  unlockedClueIds
}) => {
  const [showHeaders, setShowHeaders] = useState(false);
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);

  const getClueForArea = (area: 'sender' | 'subject' | 'body' | 'url' | 'attachment' | 'header') => {
    return scenario.clues.find(c => c.targetArea === area);
  };

  const handleAreaClick = (area: 'sender' | 'subject' | 'body' | 'url' | 'attachment' | 'header') => {
    if (!isInspectionMode || !onClueClick) return;
    const clue = getClueForArea(area);
    if (clue) {
      onClueClick(clue.id);
    }
  };

  const isAreaUnlocked = (area: 'sender' | 'subject' | 'body' | 'url' | 'attachment' | 'header') => {
    const clue = getClueForArea(area);
    return clue ? unlockedClueIds.includes(clue.id) : false;
  };

  // 1. EMAIL CLIENT VIEW
  if (scenario.medium === 'email') {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl flex flex-col">
        {/* Email Client Top Bar */}
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">受信トレイ - メッセージ詳細</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">{scenario.timestamp}</span>
            {scenario.headers && (
              <button
                type="button"
                onClick={() => setShowHeaders(!showHeaders)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                <span>生ヘッダー情報</span>
                {showHeaders ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Email Metadata Header Block */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/40 space-y-2 text-xs">
          <div
            onClick={() => handleAreaClick('subject')}
            className={`transition-all rounded-md p-1.5 ${
              isInspectionMode ? 'cursor-pointer hover:bg-slate-800/80 border border-dashed border-slate-700 hover:border-emerald-500' : ''
            } ${isAreaUnlocked('subject') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-slate-400 w-14 shrink-0 font-medium">件名:</span>
              <h2 className="text-sm sm:text-base font-bold text-white break-words">
                {sanitizeDisplayText(scenario.subject || scenario.title)}
              </h2>
            </div>
          </div>

          <div
            onClick={() => handleAreaClick('sender')}
            className={`transition-all rounded-md p-1.5 ${
              isInspectionMode ? 'cursor-pointer hover:bg-slate-800/80 border border-dashed border-slate-700 hover:border-emerald-500' : ''
            } ${isAreaUnlocked('sender') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
          >
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-slate-400 w-14 shrink-0 font-medium">差出人:</span>
              <span className="font-semibold text-slate-200">{sanitizeDisplayText(scenario.senderDisplay)}</span>
              <span className="font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] break-all">
                &lt;{sanitizeDisplayText(scenario.senderAddress)}&gt;
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 px-1.5">
            <span className="text-slate-400 w-14 shrink-0 font-medium">宛先:</span>
            <span className="text-slate-300">{sanitizeDisplayText(scenario.recipientDisplay)}</span>
          </div>

          {/* Raw Header Expansion Box */}
          {showHeaders && scenario.headers && (
            <div
              onClick={() => handleAreaClick('header')}
              className={`mt-3 p-3 rounded bg-slate-950 border text-[11px] font-mono text-slate-300 space-y-1 ${
                isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : 'border-slate-800'
              } ${isAreaUnlocked('header') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
            >
              <div className="text-emerald-400 font-bold mb-1">=== メール認証ヘッダー分析 ===</div>
              {Object.entries(scenario.headers).map(([key, val]) => (
                <div key={key} className="break-all">
                  <span className="text-slate-400 font-semibold">{sanitizeDisplayText(key)}: </span>
                  <span className={key.toLowerCase().includes('reply-to') ? 'text-amber-300 font-bold' : 'text-slate-300'}>
                    {sanitizeDisplayText(val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Email Body Content */}
        <div
          onClick={() => handleAreaClick('body')}
          className={`p-5 sm:p-6 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans min-h-[160px] ${
            isInspectionMode ? 'cursor-pointer hover:bg-slate-800/30' : ''
          }`}
        >
          {sanitizeDisplayText(scenario.content)}
        </div>

        {/* Interactive URL Link Banner if exists */}
        {scenario.urlInfo && (
          <div
            onClick={() => handleAreaClick('url')}
            onMouseEnter={() => setHoveredUrl(sanitizeDisplayText(scenario.urlInfo?.actualUrl || '') || null)}
            onMouseLeave={() => setHoveredUrl(null)}
            className={`mx-5 mb-4 p-3 rounded-lg bg-slate-950/80 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
              isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : 'border-slate-800'
            } ${isAreaUnlocked('url') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
          >
            <div className="flex items-center gap-2 text-xs">
              <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium">本文内リンク（カーソルを重ねて実リンク先を確認）：</span>
                <span className="font-mono text-cyan-300 underline break-all">
                  {sanitizeDisplayText(scenario.urlInfo.displayText)}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 self-end sm:self-auto bg-slate-800 px-2 py-0.5 rounded">
              ホバーでURL検証
            </span>
          </div>
        )}

        {/* Attachment Card if exists */}
        {scenario.attachmentInfo && (
          <div
            onClick={() => handleAreaClick('attachment')}
            className={`mx-5 mb-4 p-3 rounded-lg bg-slate-950/90 border flex items-center justify-between gap-3 ${
              isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : 'border-slate-800'
            } ${isAreaUnlocked('attachment') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-300">
                <Paperclip className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-semibold text-white font-mono break-all">
                  {sanitizeDisplayText(scenario.attachmentInfo.fileName)}
                </span>
                <span className="text-slate-400 text-[11px]">
                  容量: {sanitizeDisplayText(scenario.attachmentInfo.fileSize)} · {sanitizeDisplayText(scenario.attachmentInfo.note)}
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 bg-slate-800 rounded">
              添付ファイル
            </span>
          </div>
        )}

        {/* Realistic Status Bar at Bottom showing hovered URL */}
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>ステータス: </span>
            {hoveredUrl ? (
              <span className="text-amber-400 font-bold underline truncate">
                実際の遷移先 → {hoveredUrl}
              </span>
            ) : (
              <span className="text-slate-500">待機中（リンクにカーソルを重ねると真のURLが表示されます）</span>
            )}
          </div>
          <span className="hidden sm:inline text-slate-500 shrink-0">Security Sandbox Enabled</span>
        </div>
      </div>
    );
  }

  // 2. CHAT / SLACK / TEAMS VIEW
  if (scenario.medium === 'chat') {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl flex flex-col">
        {/* Chat Client Header */}
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">社内ワークスペースチャット (DM)</span>
          </div>
          <span className="text-slate-400">{scenario.recipientDisplay}</span>
        </div>

        {/* Chat Message Window */}
        <div className="p-5 sm:p-6 space-y-4">
          <div
            onClick={() => handleAreaClick('sender')}
            className={`flex items-start gap-3 transition-all rounded-lg p-2 ${
              isInspectionMode ? 'cursor-pointer hover:bg-slate-800/80 border border-dashed border-slate-700 hover:border-emerald-500' : ''
            } ${isAreaUnlocked('sender') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
              {scenario.senderDisplay.slice(0, 2)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white text-sm">{sanitizeDisplayText(scenario.senderDisplay)}</span>
                <span className="font-mono text-slate-400 text-xs">{sanitizeDisplayText(scenario.senderAddress)}</span>
                <span className="text-[11px] text-slate-400 ml-auto">{sanitizeDisplayText(scenario.timestamp)}</span>
              </div>

              <div
                onClick={() => handleAreaClick('body')}
                className={`p-4 rounded-2xl rounded-tl-none bg-slate-800 border border-slate-700 text-sm text-slate-100 whitespace-pre-wrap leading-relaxed shadow-sm ${
                  isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : ''
                } ${isAreaUnlocked('body') ? 'border-amber-500/50' : ''}`}
              >
                {sanitizeDisplayText(scenario.content)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>チャットログ暗号化済み</span>
          <span>組織内トリアージ待機中</span>
        </div>
      </div>
    );
  }

  // 3. SMARTPHONE SMS VIEW
  if (scenario.medium === 'sms') {
    return (
      <div className="max-w-md mx-auto rounded-3xl border-2 border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Smartphone Status Bar */}
        <div className="bg-slate-900 px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-800">
          <span>14:23</span>
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span>5G</span>
            <span>■■■</span>
          </div>
        </div>

        {/* SMS Header */}
        <div
          onClick={() => handleAreaClick('sender')}
          className={`p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-center flex-col gap-1 ${
            isInspectionMode ? 'cursor-pointer hover:bg-slate-800/80 border-dashed border-emerald-500' : ''
          } ${isAreaUnlocked('sender') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-sm">{sanitizeDisplayText(scenario.senderDisplay)}</span>
          <span className="text-[11px] font-mono text-slate-400">{sanitizeDisplayText(scenario.senderAddress)}</span>
        </div>

        {/* SMS Message Bubble */}
        <div className="p-6 space-y-3 min-h-[220px]">
          <div className="text-center text-[10px] text-slate-500">{sanitizeDisplayText(scenario.timestamp)}</div>
          <div
            onClick={() => handleAreaClick('body')}
            className={`p-4 rounded-2xl rounded-bl-sm bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-100 whitespace-pre-wrap leading-relaxed shadow-md ${
              isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : ''
            } ${isAreaUnlocked('body') ? 'border-amber-500/50' : ''}`}
          >
            {sanitizeDisplayText(scenario.content)}
          </div>

          {scenario.urlInfo && (
            <div
              onClick={() => handleAreaClick('url')}
              className={`p-2.5 rounded-lg bg-slate-900 border text-xs text-slate-300 space-y-1 ${
                isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : 'border-slate-800'
              } ${isAreaUnlocked('url') ? 'bg-amber-500/10 border-amber-500/40' : ''}`}
            >
              <div className="text-[10px] text-slate-400">SMS内URL解析:</div>
              <div className="font-mono text-cyan-400 break-all text-[11px]">
                {sanitizeDisplayText(scenario.urlInfo.displayText)}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-900/70 p-3 text-center text-[11px] text-slate-500 border-t border-slate-800">
          SMS / MMS メッセージ受信
        </div>
      </div>
    );
  }

  // 4. BROWSER SECURITY ALERT / OAUTH DIALOG
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-2xl flex flex-col">
      {/* Browser Bar */}
      <div className="bg-slate-800 px-4 py-2.5 border-b border-slate-700 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <div
          onClick={() => handleAreaClick('sender')}
          className={`flex-1 flex items-center gap-2 bg-slate-950 px-3 py-1 rounded text-xs font-mono text-slate-300 ${
            isInspectionMode ? 'cursor-pointer hover:border hover:border-emerald-500' : ''
          } ${isAreaUnlocked('sender') ? 'bg-amber-500/10 border border-amber-500/40' : ''}`}
        >
          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{sanitizeDisplayText(scenario.senderAddress)}</span>
        </div>
      </div>

      {/* Alert Content Box */}
      <div className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">{sanitizeDisplayText(scenario.title)}</h2>
            <p className="text-xs text-slate-400">{sanitizeDisplayText(scenario.senderDisplay)}</p>
          </div>
        </div>

        <div
          onClick={() => handleAreaClick('body')}
          className={`p-5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed ${
            isInspectionMode ? 'cursor-pointer hover:border-emerald-500' : ''
          } ${isAreaUnlocked('body') ? 'border-amber-500/50' : ''}`}
        >
          {sanitizeDisplayText(scenario.content)}
        </div>
      </div>

      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Web Security Sandbox</span>
        <span>侵入防止システム待機</span>
      </div>
    </div>
  );
};
