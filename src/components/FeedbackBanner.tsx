import { useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Question } from '../types';
import { getWordClassMeta } from '../data/wordClasses';

interface FeedbackBannerProps {
  isCorrect: boolean;
  question: Question;
  selectedOption: string;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export default function FeedbackBanner({
  isCorrect,
  question,
  selectedOption,
  onNextQuestion,
  isLastQuestion,
}: FeedbackBannerProps) {
  // Listen for Space bar or Enter key to go to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onNextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNextQuestion]);

  const selectedMeta = getWordClassMeta(selectedOption);
  const correctMeta = getWordClassMeta(question.correctAnswer);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border-4 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center font-jua select-none transform scale-100 transition-all ${
          isCorrect
            ? 'bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 border-emerald-500'
            : 'bg-gradient-to-b from-stone-900 via-rose-950 to-stone-950 border-rose-500'
        }`}
      >
        {/* Status Icon */}
        <div className="mb-2">
          {isCorrect ? (
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          ) : (
            <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-400 animate-pulse">
              <XCircle className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black mb-1">
          {isCorrect ? (
            <span className="text-emerald-300">💥 초록빛 명중! 성벽 타격 성공!</span>
          ) : (
            <span className="text-rose-300">💥 붉은 폭발! 성벽 방어벽에 폭발!</span>
          )}
        </h2>

        <p className="text-sm text-stone-300 mb-4">
          {isCorrect
            ? '정확한 문법 포환을 명중시켜 성문에 강력한 균열을 냈습니다!'
            : '단어에 맞는 올바른 문법 개념을 확인해 볼까요?'}
        </p>

        {/* Comparison Box */}
        <div className="w-full bg-stone-950/80 rounded-2xl border border-stone-700 p-3 sm:p-4 mb-4 text-left">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span>문제 문장</span>
            <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              분류: {question.category}
            </span>
          </div>
          <div className="text-base sm:text-lg font-bold text-yellow-300 mb-3 font-sans">
            &ldquo;{question.sentence}&rdquo;
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-sm">
            {/* 내가 쏜 포환 */}
            <div className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-stone-400 mb-0.5">내가 쏜 포환</div>
                <div
                  className={`font-bold flex items-center gap-1 text-sm sm:text-base ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  <span>{isCorrect ? '⭕' : '❌'}</span>
                  <span>{selectedOption}</span>
                </div>
              </div>
              <div className="mt-1.5 text-[10.5px] text-stone-400 border-t border-stone-800 pt-1">
                {selectedMeta.english} • {selectedMeta.shortDesc}
              </div>
            </div>

            {/* 올바른 정답 */}
            <div className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-stone-400 mb-0.5">올바른 정답</div>
                <div className="font-bold text-emerald-300 flex items-center gap-1 text-sm sm:text-base">
                  <span>🎯</span>
                  <span>{question.correctAnswer}</span>
                </div>
              </div>
              <div className="mt-1.5 text-[10.5px] text-emerald-300/80 border-t border-stone-800 pt-1">
                {correctMeta.english} • {correctMeta.shortDesc}
              </div>
            </div>
          </div>

          {/* Child-friendly 1-line grammar explanation */}
          <div className="mt-3 pt-3 border-t border-stone-800 flex items-start gap-2 bg-amber-950/40 p-2.5 rounded-xl border border-amber-600/30">
            <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200 leading-snug">
              {question.explanation}
            </div>
          </div>
        </div>

        {/* Next Button with explicit Space Bar shortcut cue */}
        <button
          id="btn-next-question"
          onClick={onNextQuestion}
          autoFocus
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black text-lg sm:text-xl shadow-lg border-2 border-yellow-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{isLastQuestion ? '최종 결과 확인하기' : '다음 성문으로 전진'}</span>
          <span className="hidden sm:inline-block text-xs font-sans font-bold px-2 py-0.5 rounded-md bg-stone-950/20 border border-stone-950/30 text-stone-900">
            Space ␣
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
