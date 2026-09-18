import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Flame, Bomb } from 'lucide-react';
import { Question } from '../types';
import RealisticCastleWall from './RealisticCastleWall';
import RealisticCannon from './RealisticCannon';
import ExplosionEffect from './ExplosionEffect';

interface GameStageProps {
  currentQuestion: Question;
  questionIndex: number;
  totalQuestions: number;
  remainingBalls: number;
  streak: number;
  isFiring: boolean;
  fireStatus: 'idle' | 'firing' | 'hit' | 'miss';
  selectedOption: string | null;
  gateCracks: number; // 0 to 10
  showKoreanHint: boolean;
  onToggleKoreanHint: () => void;
  screenShake: boolean;
}

export default function GameStage({
  currentQuestion,
  questionIndex,
  totalQuestions,
  remainingBalls,
  streak,
  isFiring,
  fireStatus,
  selectedOption,
  gateCracks,
  showKoreanHint,
  onToggleKoreanHint,
  screenShake,
}: GameStageProps) {
  // Split sentence around the highlighted word to render a stylish highlight badge
  const renderSentenceWithHighlight = () => {
    const sentence = currentQuestion.sentence;
    const word = currentQuestion.highlightedWord;

    if (!word || !sentence.includes(word)) {
      return <span>{sentence}</span>;
    }

    const parts = sentence.split(word);
    return (
      <span className="leading-relaxed">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="inline-block mx-1 px-3 py-0.5 rounded-lg bg-yellow-400 text-stone-950 font-extrabold shadow-[0_0_12px_rgba(250,204,21,0.8)] border border-yellow-200 transform -rotate-1 scale-105">
                {word}
              </span>
            )}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      className={`w-full relative flex flex-col items-center justify-between min-h-[320px] sm:min-h-[380px] max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.8)] p-2.5 sm:p-4 overflow-hidden select-none ${
        screenShake ? 'animate-screen-shake' : ''
      }`}
    >
      {/* Background Castle Wallpaper & Sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-950/70 to-black pointer-events-none" />

      {/* Top Status Bar: Question Number (Left) & Remaining Balls & Streak (Right) */}
      <div className="w-full flex items-center justify-between z-10 gap-2 mb-2 font-jua">
        {/* Left: Question Number */}
        <div className="flex items-center gap-2 bg-amber-950/90 border border-amber-600/70 px-3 py-1.5 rounded-xl shadow-md">
          <div className="text-xl">🏰</div>
          <div>
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">성문 번호</div>
            <div className="text-base sm:text-lg font-black text-yellow-300">
              {questionIndex + 1} <span className="text-xs text-amber-400">/ {totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Center: Stage Crack Progress */}
        <div className="hidden sm:flex flex-col items-center">
          <div className="text-xs text-amber-300/90 mb-1 flex items-center gap-1">
            <span>성문 돌파 게이지</span>
            <span className="text-yellow-400 font-bold">({gateCracks}/{totalQuestions})</span>
          </div>
          <div className="w-48 h-3 bg-stone-800 rounded-full border border-stone-600 overflow-hidden flex p-0.5">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              style={{ width: `${Math.min(100, (gateCracks / totalQuestions) * 100)}%` }}
            />
          </div>
        </div>

        {/* Right: Remaining Balls & Streak */}
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-2.5 py-1 rounded-xl shadow-md border border-orange-400 animate-bounce">
              <Flame className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-xs sm:text-sm font-bold">{streak}연속!</span>
            </div>
          )}

          <div className="flex items-center gap-2 bg-stone-900/90 border border-amber-700/60 px-3 py-1.5 rounded-xl shadow-md">
            <Bomb className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-stone-400 font-bold">남은 포환</div>
              <div className="text-base sm:text-lg font-black text-amber-200">
                {remainingBalls} <span className="text-xs text-stone-400">발</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Top: The Realistic Medieval Castle Fortress Wall with Question Parchment Scroll */}
      <RealisticCastleWall
        gateCracks={gateCracks}
        isDamaged={fireStatus === 'hit'}
        status={fireStatus}
      >
        {/* Authentic Royal Parchment Scroll for the Question */}
        <div className="relative bg-gradient-to-b from-[#fef8e7] via-[#f7ebd0] to-[#eedcb5] text-stone-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-amber-400/80 shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex flex-col items-center text-center">
          {/* Parchment Curled Edge Shadow Accents */}
          <div className="absolute -top-1 inset-x-8 h-1 bg-amber-900/10 rounded-full blur-[1px]" />

          {/* Target Category & Word Class Quest Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stone-900 text-amber-300 text-xs font-jua mb-1.5 shadow-sm border border-amber-600/40">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span>
              문법 갈래: <strong className="text-yellow-300 font-bold">{currentQuestion.category}</strong> (Word Class)
            </span>
          </div>

          {/* The English Sentence with Highlight */}
          <div className="text-lg sm:text-2xl md:text-3xl font-bold font-sans tracking-wide text-stone-900 my-1 drop-shadow-sm">
            {renderSentenceWithHighlight()}
          </div>

          {/* Korean Meaning Translation with Toggle */}
          <div className="mt-1.5 flex items-center justify-center gap-2">
            <button
              id="btn-toggle-hint"
              onClick={onToggleKoreanHint}
              className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-950 font-jua px-2.5 py-1 rounded-lg bg-amber-300/80 hover:bg-amber-400/80 border border-amber-500/40 shadow-sm transition-all cursor-pointer"
              title="한글 뜻 힌트 보기/숨기기"
            >
              <Eye className="w-3.5 h-3.5 text-amber-800" />
              <span>{showKoreanHint ? '뜻 숨기기' : '해석 힌트 보기'}</span>
            </button>
          </div>

          {showKoreanHint && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs sm:text-sm text-stone-800 font-jua bg-amber-200/90 px-3 py-1 rounded-xl border border-amber-400/70 shadow-sm"
            >
              💡 &ldquo;{currentQuestion.koreanMeaning}&rdquo;
            </motion.div>
          )}
        </div>
      </RealisticCastleWall>

      {/* Middle Stage: The Dynamic Realistic Cannon & Ball Trajectory View */}
      <div className="relative w-full h-36 sm:h-44 flex items-center justify-center overflow-visible z-20 mt-1 mb-3">
        {/* Flying Cannonball Trajectory Animation */}
        <AnimatePresence>
          {isFiring && selectedOption && (
            <motion.div
              initial={{ x: 0, y: -25, scale: 0.75, opacity: 1 }}
              animate={{
                x: 0,
                y: -105,
                scale: fireStatus === 'hit' ? 1.4 : fireStatus === 'miss' ? 1.2 : 1.1,
                opacity: 1,
              }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.44, ease: 'easeOut' }}
              className="absolute z-30 flex flex-col items-center pointer-events-none"
            >
              {/* Realistic Heavy Cast Iron Ball */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-stone-400 via-stone-800 to-black border-2 border-stone-400 shadow-[0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
                {/* Metallic Highlight Glint */}
                <div className="absolute top-1.5 left-2 w-3.5 h-3.5 rounded-full bg-white/40 blur-[1px]" />
                {/* Fuse spark flame */}
                <div className="text-yellow-300 text-sm animate-spin select-none">✨</div>
              </div>
              {/* Selected grammar label tag on ball */}
              <div className="text-[10px] font-jua text-amber-200 bg-black/90 px-2.5 py-0.5 rounded-full mt-1 border border-amber-400/60 shadow-lg">
                {selectedOption}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explosions / Hits / Sparks Overlay (Green for Hit, Red for Miss) */}
        <AnimatePresence mode="wait">
          {(fireStatus === 'hit' || fireStatus === 'miss') && (
            <ExplosionEffect key={`${questionIndex}-${fireStatus}`} status={fireStatus} />
          )}
        </AnimatePresence>

        {/* The Realistic Siege Cannon */}
        <RealisticCannon isFiring={isFiring} selectedOption={selectedOption} />
      </div>

      {/* Target Question Instruction - Clear of cannon and flying objects */}
      <div className="z-10 text-center font-jua text-amber-200 text-xs sm:text-sm py-1 px-3 rounded-xl bg-stone-950/70 border border-amber-800/40 shadow-sm backdrop-blur-[2px]">
        아래에서 <strong className="text-yellow-400 underline decoration-amber-500">[{currentQuestion.highlightedWord}]</strong>의 올바른 품사(Word Class) 포환을 골라 발사하세요!
      </div>
    </div>
  );
}
