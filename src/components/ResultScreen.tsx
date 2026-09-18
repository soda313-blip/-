import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, Trophy, Star, CheckCircle, XCircle, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';
import { GameStats, Difficulty } from '../types';
import { playClickSound, playVictoryFanfare, playDefeatSound, playGateExplosion } from '../utils/sound';
import { getWordClassMeta } from '../data/wordClasses';

interface ResultScreenProps {
  stats: GameStats;
  onRetry: () => void;
  onSelectDifficulty: () => void;
}

export default function ResultScreen({ stats, onRetry, onSelectDifficulty }: ResultScreenProps) {
  const isVictory = stats.correctCount >= 7;
  const isPerfect = stats.correctCount === stats.totalQuestions;

  // Star ratings: 3 stars for 9-10, 2 stars for 7-8, 1 star for 5-6, 0 for < 5
  const starCount =
    stats.correctCount >= 9 ? 3 : stats.correctCount >= 7 ? 2 : stats.correctCount >= 5 ? 1 : 0;

  useEffect(() => {
    if (isVictory) {
      playGateExplosion();
      setTimeout(() => {
        playVictoryFanfare();
      }, 500);

      // Trigger colorful celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);

      return () => clearTimeout(timer);
    } else {
      playDefeatSound();
    }
  }, [isVictory]);

  // Support Space bar to easily retry and go again!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        playClickSound();
        onRetry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRetry]);

  const wrongRecords = stats.records.filter((r) => !r.isCorrect);

  const difficultyNames: Record<Difficulty, string> = {
    easy: '초급 (하)',
    medium: '중급 (중)',
    hard: '고급 (상)',
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none font-jua">
      {/* Top Banner: Gate Breach Victory vs Defense Animation */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden mb-6">
        {/* Decorative Top Glow */}
        <div
          className={`absolute top-0 inset-x-0 h-24 ${
            isVictory
              ? 'bg-gradient-to-b from-emerald-500/20 to-transparent'
              : 'bg-gradient-to-b from-rose-500/20 to-transparent'
          }`}
        />

        {/* Victory/Defeat Icon */}
        <div className="relative mb-3">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center border-4 shadow-xl ${
              isVictory
                ? 'bg-gradient-to-b from-amber-400 to-yellow-600 border-yellow-200 text-stone-950'
                : 'bg-gradient-to-b from-stone-700 to-stone-900 border-stone-600 text-stone-300'
            }`}
          >
            {isVictory ? (
              <Trophy className="w-11 h-11 drop-shadow" />
            ) : (
              <div className="text-4xl">🛡️</div>
            )}
          </div>
        </div>

        {/* Victory/Defeat Title */}
        <h1 className="text-3xl sm:text-4xl font-black mb-1">
          {isVictory ? (
            <span className="text-yellow-300 drop-shadow">🎉 성문 함락 성공! 대승리!</span>
          ) : (
            <span className="text-stone-300">성문 돌파 실패! 재정비가 필요해요</span>
          )}
        </h1>

        <p className="text-sm sm:text-base text-stone-400 mb-4 max-w-md">
          {isVictory
            ? '문법 포환이 성벽을 무너뜨렸습니다! 영문법 정복자가 되셨어요!'
            : '성벽이 단단했습니다. 다시 도전하여 올바른 품사를 명중시켜 보세요!'}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-4 bg-stone-950/80 px-4 py-2 rounded-2xl border border-stone-800 shadow-inner">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 ${
                star <= starCount
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse'
                  : 'text-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md mb-2">
          <div className="bg-stone-950/80 p-2 sm:p-3 rounded-xl border border-stone-800">
            <div className="text-xs text-stone-400">총 점수</div>
            <div className="text-lg sm:text-2xl font-black text-yellow-300">{stats.score}점</div>
          </div>

          <div className="bg-stone-950/80 p-2 sm:p-3 rounded-xl border border-stone-800">
            <div className="text-xs text-stone-400">명중률</div>
            <div className="text-lg sm:text-2xl font-black text-emerald-400">
              {stats.correctCount} / {stats.totalQuestions}
            </div>
          </div>

          <div className="bg-stone-950/80 p-2 sm:p-3 rounded-xl border border-stone-800">
            <div className="text-xs text-stone-400">난이도</div>
            <div className="text-sm sm:text-base font-bold text-amber-300">
              {difficultyNames[stats.difficulty]}
            </div>
          </div>
        </div>

        {/* Action Buttons: Retry & Select Difficulty */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-5">
          <button
            id="btn-retry-same"
            onClick={() => {
              playClickSound();
              onRetry();
            }}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black text-lg shadow-lg border-2 border-yellow-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시 도전하기</span>
            <span className="text-xs font-sans px-1.5 py-0.5 rounded bg-stone-950/20 text-stone-900 font-bold">
              Space ␣
            </span>
          </button>

          <button
            id="btn-change-difficulty"
            onClick={() => {
              playClickSound();
              onSelectDifficulty();
            }}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 border-2 border-stone-600 font-bold text-base shadow active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>난이도 변경 / 홈</span>
          </button>
        </div>
      </div>

      {/* Review Section: 틀린 문법 목록 & 자가 확인 */}
      <div className="w-full max-w-2xl bg-stone-900/90 rounded-3xl border-2 border-stone-700 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-yellow-300">
              틀린 품사/문법 복습 노트 ({wrongRecords.length}개)
            </h2>
          </div>
          <span className="text-xs text-stone-400">품사 개념 다지기</span>
        </div>

        {wrongRecords.length === 0 ? (
          <div className="p-6 text-center flex flex-col items-center bg-stone-950/60 rounded-2xl border border-emerald-800/40">
            <Sparkles className="w-10 h-10 text-yellow-400 mb-2 animate-bounce" />
            <div className="text-lg font-bold text-emerald-300">틀린 문제가 하나도 없어요! 💯</div>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              영문법 품사 기초가 아주 탄탄해요. 다음 난이도에도 도전해 보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {wrongRecords.map((rec, idx) => {
              const wrongMeta = getWordClassMeta(rec.selectedAnswer);
              const correctMeta = getWordClassMeta(rec.question.correctAnswer);

              return (
                <div
                  key={idx}
                  className="bg-stone-950/90 rounded-2xl border border-stone-800 p-3 sm:p-4 text-left transition-all hover:border-amber-700/60"
                >
                  {/* Sentence */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800">
                      성문 #{stats.records.indexOf(rec) + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                      갈래: {rec.question.category}
                    </span>
                  </div>

                  <div className="text-base sm:text-lg font-bold text-stone-100 font-sans mb-1">
                    {rec.question.sentence}
                  </div>

                  <div className="text-xs text-stone-400 mb-2">
                    뜻: {rec.question.koreanMeaning}
                  </div>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mb-2">
                    <div className="bg-rose-950/40 border border-rose-900/60 p-2 rounded-xl flex flex-col justify-between text-rose-300">
                      <div className="flex items-center gap-1.5 mb-1">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>내가 쏜 포환: <strong>{rec.selectedAnswer}</strong></span>
                      </div>
                      <div className="text-[10.5px] text-stone-400 border-t border-rose-900/40 pt-0.5">
                        {wrongMeta.english} • {wrongMeta.shortDesc}
                      </div>
                    </div>

                    <div className="bg-emerald-950/40 border border-emerald-900/60 p-2 rounded-xl flex flex-col justify-between text-emerald-300">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>정답 포환: <strong>{rec.question.correctAnswer}</strong></span>
                      </div>
                      <div className="text-[10.5px] text-emerald-300/80 border-t border-emerald-900/40 pt-0.5">
                        {correctMeta.english} • {correctMeta.shortDesc}
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="flex items-start gap-1.5 bg-amber-950/30 border border-amber-700/30 p-2.5 rounded-xl text-xs sm:text-sm text-amber-200">
                    <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{rec.question.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
