import { Volume2, VolumeX, Home, Shield, Sparkles, User, FileSpreadsheet } from 'lucide-react';
import { Difficulty } from '../types';
import { playClickSound } from '../utils/sound';
import { getStoredSheetUrl } from '../utils/googleSheets';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
  difficulty?: Difficulty;
  score?: number;
  showInGame?: boolean;
  studentName?: string;
  playCount?: number;
  correctCount?: number;
  wrongCount?: number;
  onOpenSheetModal?: () => void;
}

export default function Header({
  soundEnabled,
  onToggleSound,
  onGoHome,
  difficulty,
  score = 0,
  showInGame = false,
  studentName,
  playCount = 0,
  correctCount = 0,
  wrongCount = 0,
  onOpenSheetModal,
}: HeaderProps) {
  const difficultyLabels: Record<Difficulty, { text: string; color: string }> = {
    easy: { text: '초급 (하)', color: 'bg-emerald-600 text-emerald-100 border-emerald-400' },
    medium: { text: '중급 (중)', color: 'bg-amber-600 text-amber-100 border-amber-400' },
    hard: { text: '고급 (상)', color: 'bg-rose-600 text-rose-100 border-rose-400' },
  };

  const hasSheetUrl = Boolean(getStoredSheetUrl());

  return (
    <header className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between z-20">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <button
          id="btn-nav-home"
          onClick={onGoHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/80 transition-all active:scale-95 shadow-sm text-xs sm:text-sm font-jua cursor-pointer"
          title="처음으로"
        >
          <Home className="w-4 h-4" />
          <span>처음으로</span>
        </button>

        {difficulty && (
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm flex items-center gap-1 font-jua ${
              difficultyLabels[difficulty].color
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{difficultyLabels[difficulty].text}</span>
          </div>
        )}

        {studentName && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-900/90 border border-stone-700/80 rounded-xl text-xs font-jua text-stone-200 shadow-sm">
            <User className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-bold text-amber-300">{studentName}</span>
            <span className="text-[10.5px] text-stone-400">({playCount}회차)</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {showInGame && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-amber-950/70 border border-amber-700/60 rounded-xl text-amber-300 text-xs sm:text-sm font-jua shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span><strong className="text-yellow-400">{score}</strong>점</span>
            </div>

            {/* Live Correct & Wrong answer counters tracked during gameplay */}
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-950/70 border border-emerald-600/60 rounded-xl text-emerald-300 text-xs font-jua shadow-sm" title="현재 정답 개수 (correct_count)">
              <span>⭕</span>
              <span>정답 <strong className="text-emerald-200">{correctCount}</strong></span>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 bg-rose-950/70 border border-rose-600/60 rounded-xl text-rose-300 text-xs font-jua shadow-sm" title="현재 오답 개수 (wrong_count)">
              <span>❌</span>
              <span>오답 <strong className="text-rose-200">{wrongCount}</strong></span>
            </div>
          </div>
        )}

        {onOpenSheetModal && (
          <button
            id="btn-header-sheet"
            onClick={() => {
              playClickSound();
              onOpenSheetModal();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all active:scale-95 text-xs font-jua cursor-pointer ${
              hasSheetUrl
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/70 hover:bg-emerald-900'
                : 'bg-amber-950/80 text-amber-300 border-amber-700/70 hover:bg-amber-900'
            }`}
            title="구글 시트 연동 설정"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">구글 시트</span>
            <span
              className={`w-2 h-2 rounded-full ${
                hasSheetUrl ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
          </button>
        )}

        <button
          id="btn-sound-toggle"
          onClick={onToggleSound}
          className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-95 shadow-sm cursor-pointer ${
            soundEnabled
              ? 'bg-amber-800/90 text-yellow-300 border-amber-600 hover:bg-amber-700'
              : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:bg-neutral-700'
          }`}
          title={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
          aria-label={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </header>
  );
}
