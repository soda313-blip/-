import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Home,
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  FileSpreadsheet,
  Copy,
  Check,
  User,
} from 'lucide-react';
import { GameStats, Difficulty } from '../types';
import { playClickSound, playVictoryFanfare, playDefeatSound, playGateExplosion } from '../utils/sound';
import { getWordClassMeta } from '../data/wordClasses';
import { SheetRecord } from '../utils/googleSheets';

interface ResultScreenProps {
  stats: GameStats;
  studentName: string;
  playCount: number;
  sheetRecord?: SheetRecord;
  sheetStatus?: { success: boolean; message: string };
  onOpenSheetModal: () => void;
  onRetry: () => void;
  onSelectDifficulty: () => void;
}

export default function ResultScreen({
  stats,
  studentName,
  playCount,
  sheetRecord,
  sheetStatus,
  onOpenSheetModal,
  onRetry,
  onSelectDifficulty,
}: ResultScreenProps) {
  const isVictory = stats.correctCount >= 7;
  const [isCopied, setIsCopied] = useState(false);

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

  const csvLine = sheetRecord
    ? `${sheetRecord.timestamp},${sheetRecord.name},${sheetRecord.play_count},${sheetRecord.correct_count},${sheetRecord.wrong_count}`
    : `-,${studentName},${playCount},${stats.correctCount},${stats.wrongCount}`;

  const handleCopyCsvRow = () => {
    playClickSound();
    navigator.clipboard.writeText(csvLine);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none font-jua">
      {/* Top Banner: Gate Breach Victory vs Defense Animation */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden mb-5">
        {/* Decorative Top Glow */}
        <div
          className={`absolute top-0 inset-x-0 h-24 ${
            isVictory
              ? 'bg-gradient-to-b from-emerald-500/20 to-transparent'
              : 'bg-gradient-to-b from-rose-500/20 to-transparent'
          }`}
        />

        {/* Victory/Defeat Icon */}
        <div className="relative mb-2">
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

        {/* Student Name & Play Count Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-amber-600/60 text-xs sm:text-sm text-amber-200 mb-2">
          <User className="w-3.5 h-3.5 text-yellow-400" />
          <span>학생: <strong className="text-yellow-300">{studentName}</strong></span>
          <span className="text-stone-500">•</span>
          <span>총 플레이 횟수: <strong className="text-amber-400">{playCount}</strong>회차</span>
        </div>

        {/* Victory/Defeat Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1">
          {isVictory ? (
            <span className="text-yellow-300 drop-shadow">🎉 성문 완전 함락! 대승리!</span>
          ) : (
            <span className="text-stone-300">성문 돌파 실패! 재정비가 필요해요</span>
          )}
        </h1>

        <p className="text-xs sm:text-sm text-stone-400 mb-3 max-w-md">
          {isVictory
            ? '문법 포환이 성문을 무너뜨리고 아래로 완전히 내렸습니다! 멋져요!'
            : '성벽이 단단했습니다. 다시 도전하여 올바른 품사를 명중시켜 보세요!'}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-4 bg-stone-950/80 px-4 py-1.5 rounded-2xl border border-stone-800 shadow-inner">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= starCount
                  ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse'
                  : 'text-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md mb-4">
          <div className="bg-stone-950/80 p-2 sm:p-2.5 rounded-xl border border-stone-800">
            <div className="text-[11px] text-stone-400">총 점수</div>
            <div className="text-lg sm:text-xl font-black text-yellow-300">{stats.score}점</div>
          </div>

          <div className="bg-stone-950/80 p-2 sm:p-2.5 rounded-xl border border-stone-800">
            <div className="text-[11px] text-stone-400">정답 / 오답</div>
            <div className="text-sm sm:text-base font-black">
              <span className="text-emerald-400">{stats.correctCount} 정답</span>
              <span className="text-stone-500 mx-1">/</span>
              <span className="text-rose-400">{stats.wrongCount} 오답</span>
            </div>
          </div>

          <div className="bg-stone-950/80 p-2 sm:p-2.5 rounded-xl border border-stone-800">
            <div className="text-[11px] text-stone-400">난이도</div>
            <div className="text-xs sm:text-sm font-bold text-amber-300">
              {difficultyNames[stats.difficulty]}
            </div>
          </div>
        </div>

        {/* Google Sheet Sync Result Card */}
        <div className="w-full max-w-md bg-stone-950/90 border border-stone-800 rounded-2xl p-3 mb-4 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>구글 시트 기록 현황</span>
            </div>
            <button
              id="btn-result-sheet-settings"
              onClick={() => {
                playClickSound();
                onOpenSheetModal();
              }}
              className="text-[11px] text-amber-400 hover:text-yellow-300 underline cursor-pointer"
            >
              연동 설정 / 전체 보기
            </button>
          </div>

          {sheetStatus?.success ? (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/60 border border-emerald-600/70 text-emerald-200 text-xs mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                구글 시트에 성공적으로 자동 저장되었습니다!
              </span>
            </div>
          ) : (
            <div className="text-xs text-stone-300 mb-2">
              구글 시트 연동 URL이 아직 등록되지 않았습니다. [연동 설정]을 통해 Apps Script를 연결하면 자동 기록됩니다.
            </div>
          )}

          {/* Formatted Row Preview matching the user's requirement */}
          <div className="p-2 rounded-xl bg-black/80 border border-stone-800 text-[11px] font-mono flex items-center justify-between gap-2 overflow-x-auto text-stone-300">
            <span className="truncate">{csvLine}</span>
            <button
              onClick={handleCopyCsvRow}
              className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-[10px] flex items-center gap-1 shrink-0 cursor-pointer"
              title="CSV 행 복사"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? '복사됨' : '행 복사'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Retry & Select Difficulty */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            id="btn-retry-same"
            onClick={() => {
              playClickSound();
              onRetry();
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black text-base sm:text-lg shadow-lg border-2 border-yellow-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 border-2 border-stone-600 font-bold text-sm sm:text-base shadow active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
          <span className="text-xs text-stone-400">5학년 품사 핵심</span>
        </div>

        {wrongRecords.length === 0 ? (
          <div className="p-6 text-center flex flex-col items-center bg-stone-950/60 rounded-2xl border border-emerald-800/40">
            <Sparkles className="w-10 h-10 text-yellow-400 mb-2 animate-bounce" />
            <div className="text-lg font-bold text-emerald-300">10개 성문 모두 퍼펙트 명중! 💯</div>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              5학년 영문법 품사 실력이 대단해요. 다음 난이도나 새로운 문제에도 도전해 보세요!
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
