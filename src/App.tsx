import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import GameStage from './components/GameStage';
import CannonballButtons from './components/CannonballButtons';
import FeedbackBanner from './components/FeedbackBanner';
import ResultScreen from './components/ResultScreen';
import GoogleSheetModal from './components/GoogleSheetModal';
import { Difficulty, GameScreen, Question, GameStats, UserAnswerRecord } from './types';
import { getRandomQuestions } from './data/grammarQuestions';
import {
  initSoundPreference,
  isSoundEnabled,
  setSoundEnabled,
  playClickSound,
  playCannonShot,
  playGateHitSound,
  playBounceMissSound,
} from './utils/sound';
import {
  SheetRecord,
  getStoredStudentName,
  setStoredStudentName,
  getStudentPlayCount,
  incrementStudentPlayCount,
  formatCurrentTimestamp,
  saveRecordToHistory,
  sendRecordToGoogleSheet,
} from './utils/googleSheets';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [records, setRecords] = useState<UserAnswerRecord[]>([]);
  const [gateCracks, setGateCracks] = useState(0);

  // Student & Google Sheet states
  const [studentName, setStudentName] = useState(() => getStoredStudentName());
  const [playCount, setPlayCount] = useState(() => getStudentPlayCount(getStoredStudentName()));
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [sheetRecord, setSheetRecord] = useState<SheetRecord | undefined>(undefined);
  const [sheetStatus, setSheetStatus] = useState<{ success: boolean; message: string } | undefined>(
    undefined
  );

  // Animation & Feedback States
  const [isFiring, setIsFiring] = useState(false);
  const [fireStatus, setFireStatus] = useState<'idle' | 'firing' | 'hit' | 'miss'>('idle');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectHit, setIsCorrectHit] = useState(false);
  const [showKoreanHint, setShowKoreanHint] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Exit confirmation modal
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Initialize sound on mount
  useEffect(() => {
    initSoundPreference();
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) {
      playClickSound();
    }
  };

  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    setStoredStudentName(name);
    setPlayCount(getStudentPlayCount(name));
  };

  // Start a new game session
  const handleStartGame = (diff: Difficulty) => {
    setDifficulty(diff);
    // getRandomQuestions returns 10 questions with shuffled options (random 1, 2, 3, 4 position)
    const selected = getRandomQuestions(diff, 10);
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setRecords([]);
    setGateCracks(0);
    setIsFiring(false);
    setFireStatus('idle');
    setSelectedOption(null);
    setShowFeedback(false);
    setShowKoreanHint(false);
    setSheetRecord(undefined);
    setSheetStatus(undefined);
    setScreen('playing');
  };

  // Handle cannonball choice click
  const handleSelectOption = useCallback(
    (option: string) => {
      if (isFiring || showFeedback || !questions[currentIndex]) return;

      setSelectedOption(option);
      setIsFiring(true);
      setFireStatus('firing');
      playCannonShot();

      const currentQ = questions[currentIndex];
      const isCorrect = option === currentQ.correctAnswer;
      setIsCorrectHit(isCorrect);

      // Trajectory delay: cannonball hits the castle gate after 450ms
      setTimeout(() => {
        if (isCorrect) {
          setFireStatus('hit');
          playGateHitSound();
          setScreenShake(true);
          setGateCracks((prev) => prev + 1);
          setStreak((prev) => {
            const nextStreak = prev + 1;
            const comboBonus = nextStreak >= 3 ? 5 : 0;
            setScore((s) => s + 10 + comboBonus);
            return nextStreak;
          });
        } else {
          setFireStatus('miss');
          playBounceMissSound();
          setScreenShake(true);
          setStreak(0);
        }

        // Reset screen shake after 400ms
        setTimeout(() => setScreenShake(false), 400);

        // Record student's answer
        setRecords((prev) => [
          ...prev,
          {
            question: currentQ,
            selectedAnswer: option,
            isCorrect,
            timeSpentMs: 0,
          },
        ]);

        // Show feedback modal so student can review explanation while door is down
        setTimeout(() => {
          setShowFeedback(true);
        }, 750);
      }, 450);
    },
    [isFiring, showFeedback, questions, currentIndex]
  );

  // Proceed to next question or result
  const handleNextQuestion = () => {
    playClickSound();
    setShowFeedback(false);
    setIsFiring(false);
    setFireStatus('idle');
    setSelectedOption(null);
    setShowKoreanHint(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Game finished! Calculate stats, update student play count, and log to Google Sheet
      const finalRecords = records;
      const finalCorrect = finalRecords.filter((r) => r.isCorrect).length;
      const finalWrong = finalRecords.filter((r) => !r.isCorrect).length;

      const nextPlayCount = incrementStudentPlayCount(studentName);
      setPlayCount(nextPlayCount);

      const newRecord: SheetRecord = {
        timestamp: formatCurrentTimestamp(),
        name: studentName,
        play_count: nextPlayCount,
        correct_count: finalCorrect,
        wrong_count: finalWrong,
      };

      setSheetRecord(newRecord);
      saveRecordToHistory(newRecord);

      // Send to Google Sheets Apps Script Web App
      sendRecordToGoogleSheet(newRecord).then((res) => {
        setSheetStatus(res);
      });

      setScreen('result');
    }
  };

  // Global spacebar listener during active game to advance when feedback is shown
  useEffect(() => {
    const handleGlobalSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        if (screen === 'playing' && showFeedback) {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalSpace);
    return () => window.removeEventListener('keydown', handleGlobalSpace);
  }, [screen, showFeedback, currentIndex, questions.length, gateCracks, records, studentName]);

  // Return to start screen
  const handleGoHome = () => {
    playClickSound();
    if (screen === 'playing') {
      setShowQuitConfirm(true);
    } else {
      setScreen('start');
    }
  };

  const confirmQuit = () => {
    playClickSound();
    setShowQuitConfirm(false);
    setScreen('start');
  };

  const cancelQuit = () => {
    playClickSound();
    setShowQuitConfirm(false);
  };

  // Compile final statistics
  const gameStats: GameStats = {
    score,
    totalQuestions: questions.length || 10,
    correctCount: records.filter((r) => r.isCorrect).length,
    wrongCount: records.filter((r) => !r.isCorrect).length,
    difficulty,
    records,
    isGateDestroyed: records.filter((r) => r.isCorrect).length >= 7,
  };

  const currentQuestion = questions[currentIndex];

  const correctCount = records.filter((r) => r.isCorrect).length;
  const wrongCount = records.filter((r) => !r.isCorrect).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-amber-950/40 to-stone-950 text-stone-100 flex flex-col justify-between select-none">
      {/* Top Header */}
      <Header
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        onGoHome={handleGoHome}
        difficulty={screen !== 'start' ? difficulty : undefined}
        score={score}
        showInGame={screen === 'playing'}
        studentName={studentName}
        playCount={playCount + 1}
        correctCount={correctCount}
        wrongCount={wrongCount}
        onOpenSheetModal={() => setIsSheetModalOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 w-full">
        {screen === 'start' && (
          <StartScreen
            studentName={studentName}
            onUpdateStudentName={handleUpdateStudentName}
            playCount={playCount}
            onOpenSheetModal={() => setIsSheetModalOpen(true)}
            onStartGame={handleStartGame}
          />
        )}

        {screen === 'playing' && currentQuestion && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* The Castle Gate & Cannon Stage */}
            <GameStage
              currentQuestion={currentQuestion}
              questionIndex={currentIndex}
              totalQuestions={questions.length}
              remainingBalls={questions.length - currentIndex}
              streak={streak}
              isFiring={isFiring}
              fireStatus={fireStatus}
              selectedOption={selectedOption}
              gateCracks={gateCracks}
              showKoreanHint={showKoreanHint}
              onToggleKoreanHint={() => {
                playClickSound();
                setShowKoreanHint(!showKoreanHint);
              }}
              screenShake={screenShake}
              studentName={studentName}
              playCount={playCount + 1}
              correctCount={correctCount}
              wrongCount={wrongCount}
            />

            {/* The 4 Cannonball Choice Buttons (하단) */}
            <CannonballButtons
              options={currentQuestion.options}
              disabled={isFiring || showFeedback}
              onSelectOption={handleSelectOption}
              selectedOption={selectedOption}
              correctAnswer={currentQuestion.correctAnswer}
              showAnswerState={showFeedback}
            />

            {/* Immediate Answer & Grammar Feedback Banner */}
            {showFeedback && (
              <FeedbackBanner
                isCorrect={isCorrectHit}
                question={currentQuestion}
                selectedOption={selectedOption || ''}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={currentIndex === questions.length - 1}
              />
            )}
          </div>
        )}

        {screen === 'result' && (
          <ResultScreen
            stats={gameStats}
            studentName={studentName}
            playCount={playCount}
            sheetRecord={sheetRecord}
            sheetStatus={sheetStatus}
            onOpenSheetModal={() => setIsSheetModalOpen(true)}
            onRetry={() => handleStartGame(difficulty)}
            onSelectDifficulty={() => setScreen('start')}
          />
        )}
      </main>

      {/* Footer info banner */}
      <footer className="w-full py-2 text-center text-xs text-amber-300/60 font-jua">
        영문법 뚫기 © 초등학교 5학년 영어 단어 · 품사 퀴즈 배틀 & 구글 시트 성적 연동
      </footer>

      {/* Google Sheet Setup Modal */}
      <GoogleSheetModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
      />

      {/* Quit to Home Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border-2 border-amber-600 rounded-3xl p-6 max-w-sm w-full text-center font-jua shadow-2xl">
            <div className="text-4xl mb-2">🏰❓</div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2">게임을 중단하시겠어요?</h3>
            <p className="text-sm text-stone-300 mb-5">
              지금 나가시면 현재 진행 중인 성문 점수와 기록이 초기화됩니다.
            </p>
            <div className="flex gap-3">
              <button
                id="btn-confirm-quit"
                onClick={confirmQuit}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold cursor-pointer"
              >
                나가기
              </button>
              <button
                id="btn-cancel-quit"
                onClick={cancelQuit}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold cursor-pointer"
              >
                계속하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
