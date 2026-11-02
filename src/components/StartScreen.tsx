import { useState, useEffect } from 'react';
import {
  Shield,
  Sparkles,
  Flame,
  Play,
  HelpCircle,
  Trophy,
  User,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { Difficulty } from '../types';
import { playClickSound } from '../utils/sound';
import CastleIllustration from './CastleIllustration';
import { getStoredSheetUrl } from '../utils/googleSheets';

interface StartScreenProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  playCount: number;
  onOpenSheetModal: () => void;
  onStartGame: (difficulty: Difficulty) => void;
}

export default function StartScreen({
  studentName,
  onUpdateStudentName,
  playCount,
  onOpenSheetModal,
  onStartGame,
}: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [showHowTo, setShowHowTo] = useState(false);
  const [localName, setLocalName] = useState(studentName);
  const hasSheetUrl = Boolean(getStoredSheetUrl());

  useEffect(() => {
    setLocalName(studentName);
  }, [studentName]);

  const handleDifficultyClick = (diff: Difficulty) => {
    playClickSound();
    setSelectedDifficulty(diff);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalName(val);
    onUpdateStudentName(val);
  };

  const handleQuickName = (name: string) => {
    playClickSound();
    setLocalName(name);
    onUpdateStudentName(name);
  };

  const handleStart = () => {
    playClickSound();
    onStartGame(selectedDifficulty);
  };

  // Allow pressing Space bar to start immediately with selected difficulty
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger start if user is typing in the input
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDifficulty]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[85vh] px-4 py-3 relative text-center select-none font-jua">
      {/* Background Decorative Castle Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-end">
        <svg viewBox="0 0 800 400" className="w-full max-w-3xl text-amber-900 fill-current">
          <path d="M50 400 V200 H100 V160 H140 V200 H180 V160 H220 V200 H260 V260 H540 V200 H580 V160 H620 V200 H660 V160 H700 V200 H750 V400 Z" />
          <path d="M350 400 V250 Q400 210 450 250 V400 Z" fill="#1c100a" />
        </svg>
      </div>

      {/* Top Section: Title & Logo */}
      <div className="relative z-10 mt-1 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/60 border border-amber-600/70 text-amber-300 text-xs sm:text-sm font-jua mb-2 shadow-md backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span>초등학교 5학년 영어 단어 & 품사 퀴즈 배틀</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-jua tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-1 flex items-center gap-2">
          <span>영문법 뚫기</span>
          <span className="text-3xl sm:text-5xl">💣</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-amber-200/90 font-jua max-w-lg mx-auto leading-relaxed drop-shadow">
          대포로 올바른 <span className="text-yellow-300 font-bold underline decoration-amber-400">품사(Word Class) 포환</span>을 발사하여 10개의 성문을 뚫고 구글 시트에 성적을 기록하세요!
        </p>
      </div>

      {/* Center Section: Castle Graphic */}
      <div className="relative z-10 my-3 flex flex-col items-center">
        {/* Castle Gate Graphic */}
        <div className="relative w-80 sm:w-96 md:w-[420px] h-48 sm:h-52 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-950 border-4 border-amber-800/80 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between p-2.5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black pointer-events-none" />

          {/* Castle Illustration */}
          <div className="relative w-full h-36 sm:h-40 z-10 flex items-center justify-center">
            <CastleIllustration className="w-full h-full max-h-40" />
          </div>

          <div className="relative z-10 text-[11px] font-jua text-amber-200 bg-stone-950/95 px-3.5 py-1 rounded-full border border-amber-500/60 shadow flex items-center gap-1.5">
            <span className="text-amber-300">💥</span>
            <span>대포 포격 배틀 · 명중 시 성문이 아래로 완전히 내려갑니다!</span>
            <span className="text-amber-300">🏰</span>
          </div>
        </div>

        {/* Student Name & Google Sheet Configuration Bar */}
        <div className="w-full max-w-md mt-3.5 p-3 rounded-2xl bg-stone-900/90 border-2 border-amber-700/70 shadow-lg flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>학생 이름 (구글 시트 기록용)</span>
            </div>
            <div className="text-[11px] text-amber-400/90 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-700/50">
              🎮 플레이 횟수: <strong className="text-yellow-300">{playCount}</strong>회차
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="input-student-name"
              type="text"
              value={localName}
              onChange={handleNameChange}
              placeholder="이름 입력 (예: 영희, 5학년 1반 민수)"
              maxLength={20}
              className="flex-1 bg-stone-950 border border-amber-500/60 rounded-xl px-3 py-1.5 text-stone-100 text-sm font-jua focus:outline-none focus:border-yellow-400"
            />
            <button
              id="btn-open-sheet-setup"
              onClick={() => {
                playClickSound();
                onOpenSheetModal();
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 border border-emerald-500/60 font-jua text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all active:scale-95"
              title="구글 시트 연동 및 앱스 스크립트 코드"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span>구글 시트 연동</span>
              {hasSheetUrl && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          </div>

          {/* Quick Name Tags */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-stone-400">
            <span>빠른 선택:</span>
            {['익명 학생', '영희', '철수', '민수', '지우'].map((name) => (
              <button
                key={name}
                onClick={() => handleQuickName(name)}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  localName === name
                    ? 'bg-amber-600 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Big Game Start Button */}
        <button
          id="btn-start-game"
          onClick={handleStart}
          className="mt-4 px-10 py-3.5 sm:px-14 sm:py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-black font-jua text-xl sm:text-2xl tracking-wide shadow-[0_8px_25px_rgba(245,158,11,0.5)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.7)] border-4 border-yellow-200 active:scale-95 transition-all transform hover:-translate-y-1 flex items-center gap-3 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-stone-950" />
          <span>게임 시작!</span>
          <span className="text-xs font-sans px-2 py-1 rounded-lg bg-stone-950/20 text-stone-900 font-bold">
            Space ␣
          </span>
          <Flame className="w-6 h-6 text-amber-800 animate-pulse" />
        </button>
      </div>

      {/* Bottom Section: Difficulty Selector (하단, 상/중/하) */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2 text-amber-200 font-jua text-xs sm:text-sm">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>도전할 난이도를 선택하세요:</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
          {/* 하 (Easy) */}
          <button
            id="btn-diff-easy"
            onClick={() => handleDifficultyClick('easy')}
            className={`p-2 sm:p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-0.5 font-jua cursor-pointer ${
              selectedDifficulty === 'easy'
                ? 'bg-emerald-700/90 border-emerald-300 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">🌱</div>
            <span className="text-sm sm:text-base font-bold">하 (초급)</span>
            <span className="text-[10.5px] sm:text-xs opacity-85 text-emerald-200">명사, 동사, 형용사, 부사</span>
          </button>

          {/* 중 (Medium) */}
          <button
            id="btn-diff-medium"
            onClick={() => handleDifficultyClick('medium')}
            className={`p-2 sm:p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-0.5 font-jua cursor-pointer ${
              selectedDifficulty === 'medium'
                ? 'bg-amber-600/90 border-amber-300 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">⚔️</div>
            <span className="text-sm sm:text-base font-bold">중 (중급)</span>
            <span className="text-[10.5px] sm:text-xs opacity-85 text-amber-200">조동사, be동사, 전치사</span>
          </button>

          {/* 상 (Hard) */}
          <button
            id="btn-diff-hard"
            onClick={() => handleDifficultyClick('hard')}
            className={`p-2 sm:p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-0.5 font-jua cursor-pointer ${
              selectedDifficulty === 'hard'
                ? 'bg-rose-700/90 border-rose-300 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105'
                : 'bg-stone-900/80 border-stone-700 text-stone-300 hover:bg-stone-800/80'
            }`}
          >
            <div className="text-xl sm:text-2xl">👑</div>
            <span className="text-sm sm:text-base font-bold">상 (고급)</span>
            <span className="text-[10.5px] sm:text-xs opacity-85 text-rose-200">비교급, 최상급, 복수형</span>
          </button>
        </div>

        {/* How to Play Help Button */}
        <button
          id="btn-how-to-play"
          onClick={() => {
            playClickSound();
            setShowHowTo(!showHowTo);
          }}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-300/90 hover:text-yellow-300 font-jua underline cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>게임 방법 & 단축키 보기</span>
        </button>

        {/* How to Play Modal / Dropdown */}
        {showHowTo && (
          <div className="mt-2.5 p-3.5 rounded-2xl bg-amber-950/90 border border-amber-600/80 text-amber-100 text-xs font-jua text-left shadow-xl w-full">
            <h3 className="text-sm font-bold text-yellow-300 mb-1.5 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>영문법 품사 뚫기 규칙 & 키보드 단축키</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-amber-200 text-xs">
              <li>성문에 쓰인 영어 문장과 <strong>강조된 단어</strong>를 확인해요.</li>
              <li>
                하단의 4개 <strong>품사 포환</strong> 중 정답을 눌러 발사해요. (키보드 <strong>[1, 2, 3, 4]</strong> 가능)
              </li>
              <li>
                포환이 명중하면 <strong>성문이 아래로 완전히 내려가며</strong> 함락됩니다!
              </li>
              <li>
                문제를 풀고 난 뒤 <strong>스페이스바 (Space Bar)</strong>를 누르면 다음 성문으로 전진해요!
              </li>
              <li>
                게임이 끝나면 학생 이름, 플레이 횟수, 정답/오답 수가 <strong>구글 시트에 자동 기록</strong>됩니다!
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
