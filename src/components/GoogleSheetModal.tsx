import { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  FileSpreadsheet,
  Send,
  ExternalLink,
  Code2,
  ListOrdered,
  History,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  GOOGLE_APPS_SCRIPT_SOURCE,
  DEFAULT_GOOGLE_SCRIPT_URL,
  getConfiguredSheetUrl,
  getStoredSheetUrl,
  setStoredSheetUrl,
  getStoredStudentName,
  getStudentPlayCount,
  formatCurrentTimestamp,
  sendRecordToGoogleSheet,
  getRecordsHistory,
  SheetRecord,
} from '../utils/googleSheets';
import { playClickSound } from '../utils/sound';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUrlUpdated?: () => void;
}

export default function GoogleSheetModal({ isOpen, onClose, onUrlUpdated }: GoogleSheetModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'script' | 'history'>('settings');
  const [sheetUrl, setSheetUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isCsvCopied, setIsCsvCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });
  const [history, setHistory] = useState<SheetRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSheetUrl(getConfiguredSheetUrl());
      setHistory(getRecordsHistory());
      setTestStatus({ loading: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    playClickSound();
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SOURCE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSaveUrl = () => {
    playClickSound();
    setStoredSheetUrl(sheetUrl);
    if (onUrlUpdated) onUrlUpdated();
  };

  const handleTestSend = async () => {
    playClickSound();
    if (!sheetUrl.trim()) {
      setTestStatus({
        loading: false,
        success: false,
        message: '구글 시트 웹 앱 URL을 먼저 입력해 주세요.',
      });
      return;
    }

    setTestStatus({ loading: true });
    setStoredSheetUrl(sheetUrl);

    const studentName = getStoredStudentName();
    const playCount = getStudentPlayCount(studentName) || 1;
    const testRecord: SheetRecord = {
      timestamp: formatCurrentTimestamp(),
      name: studentName,
      play_count: playCount,
      correct_count: 8,
      wrong_count: 2,
    };

    const res = await sendRecordToGoogleSheet(testRecord, sheetUrl);
    setTestStatus({
      loading: false,
      success: res.success,
      message: res.success
        ? `테스트 전송 완료! 시트에 [${testRecord.timestamp}, ${testRecord.name}, ${testRecord.play_count}, ${testRecord.correct_count}, ${testRecord.wrong_count}]가 저장되었습니다.`
        : res.message,
    });
  };

  const handleCopyHistoryCsv = () => {
    playClickSound();
    const rows = [
      'timestamp,name,play_count,correct_count,wrong_count',
      ...history.map(
        (r) => `${r.timestamp},${r.name},${r.play_count},${r.correct_count},${r.wrong_count}`
      ),
    ];
    navigator.clipboard.writeText(rows.join('\n'));
    setIsCsvCopied(true);
    setTimeout(() => setIsCsvCopied(false), 2500);
  };

  const handleDownloadCsv = () => {
    playClickSound();
    const rows = [
      'timestamp,name,play_count,correct_count,wrong_count',
      ...history.map(
        (r) => `${r.timestamp},${r.name},${r.play_count},${r.correct_count},${r.wrong_count}`
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `english_game_scores_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-stone-900 border-2 border-amber-600 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100 font-jua">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-stone-950 via-amber-950/80 to-stone-950 border-b border-amber-700/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-yellow-300 flex items-center gap-2">
                <span>구글 시트 연동 & 앱스 스크립트</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-600">
                  Google Apps Script
                </span>
              </h2>
              <p className="text-xs text-amber-200/80">
                timestamp, name, play_count, correct_count, wrong_count 자동 기록
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 px-5 pt-2 gap-2 text-xs sm:text-sm">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('script');
            }}
            className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'script'
                ? 'border-yellow-400 text-yellow-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>1. 구글 앱스 스크립트 코드</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('settings');
            }}
            className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-yellow-400 text-yellow-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>2. 웹 앱 URL 등록 & 테스트</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('history');
            }}
            className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'border-yellow-400 text-yellow-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>3. 기록 확인 & CSV ({history.length}건)</span>
          </button>
        </div>

        {/* Tab 1: Script View & Copy */}
        {activeTab === 'script' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
            {/* Quick Instruction Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-amber-200 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm">
                <ListOrdered className="w-4 h-4 text-amber-400" />
                <span>선생님 / 학생을 위한 구글 시트 1분 연동 순서</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-stone-300 text-xs sm:text-[13px] leading-relaxed">
                <li>
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 underline font-bold inline-flex items-center gap-1 hover:text-yellow-300"
                  >
                    Google Sheets 새로 만들기 (sheets.new)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  를 클릭하여 새 스프레드시트를 엽니다.
                </li>
                <li>
                  시트 상단 메뉴에서 <strong>[확장 프로그램] ➔ [Apps Script]</strong>를 클릭합니다.
                </li>
                <li>
                  아래의 <strong>[스크립트 코드 복사]</strong> 버튼을 누르고, 기존 내용을 지운 뒤
                  붙여넣습니다.
                </li>
                <li>
                  오른쪽 상단 <strong>[배포] ➔ [새 배포]</strong>를 클릭하고, 유형을{' '}
                  <strong className="text-yellow-300">[웹 앱]</strong>으로 선택합니다.
                  <div className="ml-4 mt-0.5 text-amber-300 font-mono text-[11.5px]">
                    ⚠️ 중요: &apos;액세스 권한을 가진 사용자&apos;를 반드시{' '}
                    <strong className="text-white underline">[모든 사용자 (Anyone)]</strong>로
                    지정하세요!
                  </div>
                </li>
                <li>
                  배포 후 나타난 <strong>웹 앱 URL</strong>을 복사하여 2단계 탭에 붙여넣으면 끝!
                </li>
              </ol>
            </div>

            {/* Script Code Block Header & Copy Button */}
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-amber-400" />
                생성된 구글 앱스 스크립트 (Code.gs)
              </span>

              <button
                onClick={handleCopyScript}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>복사 완료! (Copied)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>스크립트 코드 전체 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="relative rounded-2xl bg-black/80 border border-stone-700 p-3.5 font-mono text-xs sm:text-[12.5px] text-stone-200 overflow-x-auto max-h-72 select-text leading-relaxed">
              <pre>{GOOGLE_APPS_SCRIPT_SOURCE}</pre>
            </div>
          </div>
        )}

        {/* Tab: Settings & Test URL */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
            <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="input-sheet-url" className="block text-amber-300 font-bold flex items-center gap-2">
                  <span>구글 시트 배포 웹 앱 URL (Web App URL)</span>
                  <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    NEXT_PUBLIC_GOOGLE_SCRIPT_URL 설정됨
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSheetUrl(DEFAULT_GOOGLE_SCRIPT_URL);
                    setStoredSheetUrl(DEFAULT_GOOGLE_SCRIPT_URL);
                    if (onUrlUpdated) onUrlUpdated();
                  }}
                  className="text-[11px] text-amber-400 hover:text-yellow-300 underline cursor-pointer"
                >
                  기본 URL 복원
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  id="input-sheet-url"
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  className="flex-1 bg-stone-900 border border-amber-600/60 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono text-xs sm:text-sm focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={handleSaveUrl}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold cursor-pointer transition-colors"
                >
                  저장
                </button>
              </div>
              <p className="text-[11.5px] text-stone-400">
                * 배포한 구글 앱스 스크립트 웹 앱 URL이 연결되어 게임 종료 시 5개 열
                (timestamp, name, play_count, correct_count, wrong_count)이 자동으로 구글 시트에 기록됩니다.
              </p>
            </div>

            {/* Test Send Card */}
            <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-yellow-300 font-bold">연동 테스트 전송</h3>
                  <p className="text-xs text-stone-400">
                    현재 설정된 URL로 테스트 점수 데이터를 1회 전송하여 구글 시트가 잘 작동하는지
                    확인합니다.
                  </p>
                </div>

                <button
                  onClick={handleTestSend}
                  disabled={testStatus.loading}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{testStatus.loading ? '전송 중...' : '테스트 데이터 전송'}</span>
                </button>
              </div>

              {testStatus.message && (
                <div
                  className={`p-3 rounded-xl border flex items-start gap-2 text-xs sm:text-sm ${
                    testStatus.success
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-600 text-rose-200'
                  }`}
                >
                  {testStatus.success ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{testStatus.message}</span>
                </div>
              )}
            </div>

            {/* Column Schema Preview */}
            <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4">
              <h4 className="text-amber-300 font-bold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                구글 시트에 기록되는 5개 열 구성표
              </h4>
              <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[11px] sm:text-xs">
                <div className="bg-stone-900 border border-stone-700 p-2 rounded-lg text-amber-200">
                  <div className="font-bold">timestamp</div>
                  <div className="text-[10px] text-stone-400">YYYY-MM-DD HH:mm:ss</div>
                </div>
                <div className="bg-stone-900 border border-stone-700 p-2 rounded-lg text-amber-200">
                  <div className="font-bold">name</div>
                  <div className="text-[10px] text-stone-400">학생 이름</div>
                </div>
                <div className="bg-stone-900 border border-stone-700 p-2 rounded-lg text-amber-200">
                  <div className="font-bold">play_count</div>
                  <div className="text-[10px] text-stone-400">플레이 횟수</div>
                </div>
                <div className="bg-stone-900 border border-stone-700 p-2 rounded-lg text-amber-200">
                  <div className="font-bold">correct_count</div>
                  <div className="text-[10px] text-stone-400">정답 수</div>
                </div>
                <div className="bg-stone-900 border border-stone-700 p-2 rounded-lg text-amber-200">
                  <div className="font-bold">wrong_count</div>
                  <div className="text-[10px] text-stone-400">오답 수</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: History & CSV Export */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-yellow-300 font-bold">로컬 플레이 기록 ({history.length}회)</h3>
                <p className="text-xs text-stone-400">
                  이 기기에서 플레이한 최근 게임 기록들이며, CSV로 복사하거나 다운로드할 수 있습니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHistoryCsv}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-200 flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  {isCsvCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCsvCopied ? 'CSV 복사됨!' : 'CSV 복사'}</span>
                </button>

                <button
                  onClick={handleDownloadCsv}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.CSV 다운로드</span>
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="p-8 text-center text-stone-400 bg-stone-950/60 rounded-2xl border border-stone-800">
                아직 완료된 플레이 기록이 없습니다. 게임을 한 판 완료하면 자동으로 여기에 쌓입니다!
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/70">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-stone-900/90 text-amber-300 border-b border-stone-800">
                    <tr>
                      <th className="p-2.5">timestamp</th>
                      <th className="p-2.5">name</th>
                      <th className="p-2.5 text-center">play_count</th>
                      <th className="p-2.5 text-center text-emerald-400">correct_count</th>
                      <th className="p-2.5 text-center text-rose-400">wrong_count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    {history.map((rec, i) => (
                      <tr key={i} className="hover:bg-stone-900/40">
                        <td className="p-2.5 text-stone-400 whitespace-nowrap">{rec.timestamp}</td>
                        <td className="p-2.5 font-bold text-yellow-200">{rec.name}</td>
                        <td className="p-2.5 text-center">{rec.play_count}</td>
                        <td className="p-2.5 text-center text-emerald-400 font-bold">
                          {rec.correct_count}
                        </td>
                        <td className="p-2.5 text-center text-rose-400 font-bold">
                          {rec.wrong_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-stone-950 border-t border-stone-800 flex justify-between items-center text-xs">
          <span className="text-stone-400">
            초등학교 5학년 영어 단어/문법 성적 기록 시스템
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
