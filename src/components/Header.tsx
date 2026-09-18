import { Volume2, VolumeX, Home, Shield, Sparkles } from 'lucide-react';
import { Difficulty } from '../types';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
  difficulty?: Difficulty;
  score?: number;
  showInGame?: boolean;
}

export default function Header({
  soundEnabled,
  onToggleSound,
  onGoHome,
  difficulty,
  score = 0,
  showInGame = false,
}: HeaderProps) {
  const difficultyLabels: Record<Difficulty, { text: string; color: string }> = {
    easy: { text: '초급 (하)', color: 'bg-emerald-600 text-emerald-100 border-emerald-400' },
    medium: { text: '중급 (중)', color: 'bg-amber-600 text-amber-100 border-amber-400' },
    hard: { text: '고급 (상)', color: 'bg-rose-600 text-rose-100 border-rose-400' },
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <button
          id="btn-nav-home"
          onClick={onGoHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/80 transition-all active:scale-95 shadow-sm text-sm font-jua"
          title="처음으로"
        >
          <Home className="w-4 h-4" />
          <span>처음으로</span>
        </button>

        {difficulty && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm flex items-center gap-1 font-jua ${
              difficultyLabels[difficulty].color
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{difficultyLabels[difficulty].text}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {showInGame && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/70 border border-amber-700/60 rounded-xl text-amber-300 text-sm font-jua shadow-inner">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>점수: <strong className="text-yellow-400 text-base">{score}</strong>점</span>
          </div>
        )}

        <button
          id="btn-sound-toggle"
          onClick={onToggleSound}
          className={`p-2 rounded-xl border transition-all active:scale-95 shadow-sm ${
            soundEnabled
              ? 'bg-amber-800/90 text-yellow-300 border-amber-600 hover:bg-amber-700'
              : 'bg-neutral-800/80 text-neutral-400 border-neutral-700 hover:bg-neutral-700'
          }`}
          title={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
          aria-label={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
