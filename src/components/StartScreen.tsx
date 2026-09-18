import { useState, useEffect } from 'react';
import { Shield, Sparkles, Flame, Play, HelpCircle, Trophy } from 'lucide-react';
import { Difficulty } from '../types';
import { playClickSound } from '../utils/sound';
import CastleIllustration from './CastleIllustration';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [showHowTo, setShowHowTo] = useState(false);

  const handleDifficultyClick = (diff: Difficulty) => {
    playClickSound();
    setSelectedDifficulty(diff);
  };

  const handleStart = () => {
    playClickSound();
    onStartGame(selectedDifficulty);
  };

  // Allow pressing Space bar to start immediately with selected difficulty
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDifficulty]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[85vh] px-4 py-4 relative text-center select-none font-jua">
      {/* Background Decorative Castle Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-end">
        <svg viewBox="0 0 800 400" className="w-full max-w-3xl text-amber-900 fill-current">
          <path d="M50 400 V200 H100 V160 H140 V200 H180 V160 H220 V200 H260 V260 H540 V200 H580 V160 H620 V200 H660 V160 H700 V200 H750 V400 Z" />
          <path d="M350 400 V250 Q400 210 450 250 V400 Z" fill="#1c100a" />
        </svg>
      </div>

      {/* Top Section: Title & Logo */}
      <div className="relative z-10 mt-2 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/70 text-amber-300 text-xs sm:text-sm font-jua mb-3 shadow-md backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span>초등 영문법 품사 퀴즈 배틀 (CEFR A1-A2)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-jua tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-2">
          <span>영문법 뚫기</span>
          <span className="text-3xl sm:text-5xl">💣</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-amber-200/90 font-jua max-w-lg mx-auto leading-relaxed drop-shadow">
          대포로 올바른 <span className="text-yellow-300 font-bold underline decoration-amber-400">품사(Word Class) 포환</span>을 발사하여 10개의 성문을 차례대로 뚫어보세요!
        </p>
      </div>

      {/* Center Section: Animated Graphic & Big Start Button */}
      <div className="relative z-10 my-4 sm:my-6 flex flex-col items-center">
        {/* Castle Gate & Cartoon Pirate Cannon Graphic */}
        <div className="relative w-80 sm:w-96 md:w-[440px] h-60 sm:h-64 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-800/80 shadow-[0_20px_45px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between p-3 overflow-hidden">
          {/* Subtle Ambient Sky Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black pointer-events-none" />

          {/* Detailed Cartoon Castle Illustration from reference image */}
          <div className="relative w-full h-44 sm:h-48 z-10 flex items-center justify-center">
            <CastleIllustration className="w-full h-full max-h-48" />
          </div>

          {/* Mission Tag */}
          <div className="relative z-10 text-xs font-jua text-amber-200 bg-stone-950/95 px-4 py-1.5 rounded-full border border-amber-500/60 shadow flex items-center gap-2">
            <span className="text-amber-300">💥</span>
            <span>대포 포격 배틀 · 초록(명중) / 붉은색(오답)</span>
            <span className="text-amber-300">🏰</span>
          </div>
        </div>

        {/* Big Game Start Button */}
        <button
          id="btn-start-game"
          onClick={handleStart}
          className="mt-6 px-10 py-4 sm:px-14 sm:py-5 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black font-jua text-2xl sm:text-3xl tracking-wide shadow-[0_8px_25px_rgba(245,158,11,0.5)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.7)] border-4 border-yellow-200 active:scale-95 transition-all transform hover:-translate-y-1 flex items-center gap-3 cursor-pointer"
        >
          <Play className="w-8 h-8 fill-stone-950" />
          <span>게임 시작!</span>
          <span className="text-xs font-sans px-2 py-1 rounded-lg bg-stone-950/20 text-stone-900 font-bold">
            Space ␣
          </span>
          <Flame className="w-7 h-7 text-amber-800 animate-pulse" />
        </button>
      </div>

      {/* Bottom Section: Difficulty Selector (하단, 상/중/하) */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2 text-amber-200 font-jua text-sm sm:text-base">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>도전할 난이도를 선택하세요:</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
          {/* 하 (Easy) */}
          <button
            id="btn-diff-easy"
            onClick={() => handleDifficultyClick('easy')}
            className={`p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 font-jua cursor-pointer ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-700/90 border-emerald-300 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">🌱</div>
            <span className="text-base sm:text-lg font-bold">하 (초급)</span>
            <span className="text-[11px] sm:text-xs opacity-85 text-emerald-200">명사, 동사, 형용사, 부사 등</span>
          </button>

          {/* 중 (Medium) */}
          <button
            id="btn-diff-medium"
            onClick={() => handleDifficultyClick('medium')}
            className={`p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 font-jua cursor-pointer ${
              selectedDifficulty === 'medium'
                ? 'bg-amber-600/90 border-amber-300 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">⚔️</div>
            <span className="text-base sm:text-lg font-bold">중 (중급)</span>
            <span className="text-[11px] sm:text-xs opacity-85 text-amber-200">시제, 진행형, 조동사, 전치사</span>
          </button>

          {/* 상 (Hard) */}
          <button
            id="btn-diff-hard"
            onClick={() => handleDifficultyClick('hard')}
            className={`p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 font-jua cursor-pointer ${
              selectedDifficulty === 'hard'
                ? 'bg-rose-700/90 border-rose-300 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">👑</div>
            <span className="text-base sm:text-lg font-bold">상 (고급)</span>
            <span className="text-[11px] sm:text-xs opacity-85 text-rose-200">비교급, to부정사, 복수명사</span>
          </button>
        </div>

        {/* How to Play Help Button */}
        <button
          id="btn-how-to-play"
          onClick={() => {
            playClickSound();
            setShowHowTo(!showHowTo);
          }}
          className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-300/90 hover:text-yellow-300 font-jua underline cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>게임 방법 & 단축키 보기</span>
        </button>

        {/* How to Play Modal / Dropdown */}
        {showHowTo && (
          <div className="mt-3 p-4 rounded-2xl bg-amber-950/90 border border-amber-600/80 text-amber-100 text-xs sm:text-sm font-jua text-left shadow-xl w-full">
            <h3 className="text-base font-bold text-yellow-300 mb-2 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>영문법 품사 뚫기 규칙 & 키보드 단축키</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-amber-200">
              <li>성문에 쓰인 영어 문장과 <strong>강조된 단어</strong>를 확인해요.</li>
              <li>
                하단의 4개 <strong>품사 포환</strong> 중 정답을 눌러 발사해요. (키보드 <strong>[1, 2, 3, 4]</strong> 가능)
              </li>
              <li>
                문제를 풀고 난 뒤 <strong>스페이스바 (Space Bar)</strong>를 누르면 바로 다음 성문으로 전진합니다!
              </li>
              <li>10개의 성문을 모두 뚫어 영문법 챔피언에 등극해 보세요!</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
