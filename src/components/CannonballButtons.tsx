import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { getWordClassMeta } from '../data/wordClasses';

interface CannonballButtonsProps {
  options: string[];
  disabled: boolean;
  onSelectOption: (option: string) => void;
  selectedOption: string | null;
  correctAnswer?: string;
  showAnswerState?: boolean;
}

export default function CannonballButtons({
  options,
  disabled,
  onSelectOption,
  selectedOption,
  correctAnswer,
  showAnswerState = false,
}: CannonballButtonsProps) {
  // Listen for keyboard keys 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const keyIndex = parseInt(e.key, 10) - 1;
      if (keyIndex >= 0 && keyIndex < options.length) {
        onSelectOption(options[keyIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, options, onSelectOption]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-3 sm:mt-4 px-2 select-none">
      {/* 4 Cannonball Buttons in a responsive grid: 2x2 on mobile, 4-in-a-row on desktop & landscape */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        {options.map((option, index) => {
          const isChosen = selectedOption === option;
          const isCorrect = option === correctAnswer;
          const meta = getWordClassMeta(option);

          let buttonStyle =
            'bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950 border-stone-500 text-stone-100 hover:from-stone-600 hover:to-stone-900 hover:border-yellow-400 shadow-[0_6px_15px_rgba(0,0,0,0.6)]';

          if (showAnswerState) {
            if (isCorrect) {
              buttonStyle =
                'bg-gradient-to-b from-emerald-600 to-emerald-900 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-102 ring-2 ring-emerald-400/50';
            } else if (isChosen && !isCorrect) {
              buttonStyle =
                'bg-gradient-to-b from-rose-700 to-rose-950 border-rose-400 text-stone-300 opacity-80';
            }
          } else if (isChosen) {
            buttonStyle =
              'bg-gradient-to-b from-amber-600 to-yellow-700 border-yellow-300 text-white shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-102 ring-2 ring-yellow-400/50';
          }

          return (
            <button
              key={index}
              id={`btn-cannonball-${index + 1}`}
              disabled={disabled}
              onClick={() => onSelectOption(option)}
              className={`relative group rounded-3xl border-3 p-2.5 sm:p-3.5 flex flex-col items-center justify-between min-h-[82px] sm:min-h-[102px] transition-all duration-200 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${buttonStyle}`}
            >
              {/* Cannonball Metallic Sphere Aesthetic Effect */}
              <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/20 blur-[1px] pointer-events-none" />

              {/* Number Badge (1, 2, 3, 4) */}
              <div className="absolute top-1.5 right-2 sm:top-2 sm:right-2.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-950/90 border border-stone-600 flex items-center justify-center text-[10px] sm:text-xs font-bold text-amber-300 shadow-sm">
                {index + 1}
              </div>

              {/* English Word Class Category Badge for Crystal Clear Distinction */}
              <div className="w-full flex justify-start pl-1 z-10">
                <span className="text-[10px] sm:text-[11px] font-sans font-bold px-1.5 py-0.2 rounded-md bg-stone-950/80 text-amber-300 border border-amber-600/40 tracking-wider uppercase">
                  {meta.english}
                </span>
              </div>

              {/* Main Korean Word Class Name */}
              <div className="flex items-center gap-1.5 z-10 my-1">
                <span className="text-base sm:text-lg drop-shadow-sm">💣</span>
                <span className="text-base sm:text-xl md:text-2xl font-black font-jua tracking-wide">
                  {option}
                </span>
              </div>

              {/* Clear Word Class Definition / Role Explanatory Sub-label */}
              <div className="w-full text-center text-[10.5px] sm:text-xs font-jua px-1.5 py-0.5 rounded-lg bg-black/40 border border-white/10 text-amber-100/90 truncate z-10">
                {meta.shortDesc}
              </div>

              {/* Hover Sparkle Effect */}
              {!disabled && (
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Landscape/Desktop Keyboard Shortcut Reminder */}
      <div className="hidden sm:flex justify-center items-center gap-4 text-[11px] text-amber-300/70 font-jua mt-2.5">
        <span>💡 키보드 숫자 키 [ 1, 2, 3, 4 ] 로 즉시 포환을 발사할 수 있어요!</span>
      </div>
    </div>
  );
}
