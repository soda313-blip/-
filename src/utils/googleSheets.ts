export interface SheetRecord {
  timestamp: string;
  name: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
}

export const STORAGE_KEYS = {
  STUDENT_NAME: 'english_game_student_name',
  SHEET_URL: 'english_game_sheet_web_app_url',
  PLAY_COUNT_PREFIX: 'english_game_play_count_',
  GLOBAL_PLAY_COUNT: 'english_game_global_play_count',
  RECORDS_HISTORY: 'english_game_records_history',
};

// Formats date into "YYYY-MM-DD HH:mm:ss" format
export function formatCurrentTimestamp(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getStoredStudentName(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '익명 학생';
  } catch {
    return '익명 학생';
  }
}

export function setStoredStudentName(name: string): void {
  try {
    const trimmed = name.trim() || '익명 학생';
    localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, trimmed);
  } catch (err) {
    console.error('Failed to save student name:', err);
  }
}

export const DEFAULT_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzSyoUNL4zKy_0-TGQ_8XCC944ZvG5MulWi4JMntmTGYBbbcbaOjfSH5SuMFVvfrnC-/exec';

export function getConfiguredSheetUrl(): string {
  // 1. Check NEXT_PUBLIC_GOOGLE_SCRIPT_URL from import.meta.env
  try {
    const metaNext = (import.meta as unknown as { env?: Record<string, string> }).env
      ?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (metaNext && typeof metaNext === 'string' && metaNext.trim()) {
      return metaNext.trim();
    }
  } catch {}

  // 2. Check process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  try {
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL &&
      typeof process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL === 'string' &&
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL.trim()
    ) {
      return process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL.trim();
    }
  } catch {}

  // 3. Check VITE_GOOGLE_SCRIPT_URL
  try {
    const metaVite = (import.meta as unknown as { env?: Record<string, string> }).env
      ?.VITE_GOOGLE_SCRIPT_URL;
    if (metaVite && typeof metaVite === 'string' && metaVite.trim()) {
      return metaVite.trim();
    }
  } catch {}

  // 4. Check user custom input saved in localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SHEET_URL);
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch {}

  // 5. Default fallback to the provided Web App URL
  return DEFAULT_GOOGLE_SCRIPT_URL;
}

export function getStoredSheetUrl(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.SHEET_URL) || getConfiguredSheetUrl();
  } catch {
    return getConfiguredSheetUrl();
  }
}

export function setStoredSheetUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHEET_URL, url.trim());
  } catch (err) {
    console.error('Failed to save sheet url:', err);
  }
}

export function getStudentPlayCount(studentName: string): number {
  try {
    const key = STORAGE_KEYS.PLAY_COUNT_PREFIX + (studentName.trim() || 'default');
    const val = localStorage.getItem(key);
    if (val !== null) {
      return parseInt(val, 10) || 0;
    }
    // Fallback to global play count
    const globalVal = localStorage.getItem(STORAGE_KEYS.GLOBAL_PLAY_COUNT);
    return globalVal ? parseInt(globalVal, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementStudentPlayCount(studentName: string): number {
  try {
    const current = getStudentPlayCount(studentName);
    const nextCount = current + 1;
    const key = STORAGE_KEYS.PLAY_COUNT_PREFIX + (studentName.trim() || 'default');
    localStorage.setItem(key, nextCount.toString());

    // Also update global count
    const globalVal = parseInt(localStorage.getItem(STORAGE_KEYS.GLOBAL_PLAY_COUNT) || '0', 10);
    localStorage.setItem(STORAGE_KEYS.GLOBAL_PLAY_COUNT, (globalVal + 1).toString());

    return nextCount;
  } catch {
    return 1;
  }
}

export function saveRecordToHistory(record: SheetRecord): void {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEYS.RECORDS_HISTORY);
    const history: SheetRecord[] = historyJson ? JSON.parse(historyJson) : [];
    history.unshift(record);
    // Keep max 50 recent records
    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.RECORDS_HISTORY, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save record to history:', err);
  }
}

export function getRecordsHistory(): SheetRecord[] {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEYS.RECORDS_HISTORY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch {
    return [];
  }
}

/**
 * Send the quiz results to the Google Apps Script Web App
 */
export async function sendRecordToGoogleSheet(
  record: SheetRecord,
  sheetUrl?: string
): Promise<{ success: boolean; message: string }> {
  const targetUrl = sheetUrl || getConfiguredSheetUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: '구글 시트 웹 앱 URL이 설정되지 않았습니다.',
    };
  }

  try {
    console.log('[GoogleSheet] Sending POST request to Google Apps Script:', {
      url: targetUrl,
      record,
    });

    // Build URL with query parameters in case the Apps Script reads e.parameter
    let requestUrl = targetUrl;
    try {
      const parsedUrl = new URL(targetUrl);
      parsedUrl.searchParams.set('timestamp', record.timestamp);
      parsedUrl.searchParams.set('name', record.name);
      parsedUrl.searchParams.set('play_count', String(record.play_count));
      parsedUrl.searchParams.set('correct_count', String(record.correct_count));
      parsedUrl.searchParams.set('wrong_count', String(record.wrong_count));
      requestUrl = parsedUrl.toString();
    } catch {}

    const payload = JSON.stringify(record);

    // Send POST request with mode 'no-cors' so browser executes cross-origin redirect cleanly
    await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payload,
      mode: 'no-cors',
    });

    console.log('[GoogleSheet] POST request successfully dispatched to Google Apps Script.');

    return {
      success: true,
      message: `구글 시트로 성적이 성공적으로 전송되었습니다. (${record.name} / 정답: ${record.correct_count}, 오답: ${record.wrong_count})`,
    };
  } catch (err: unknown) {
    console.error('[GoogleSheet] Error sending to Google Sheet:', err);
    return {
      success: false,
      message: `구글 시트 전송 중 오류 발생: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

/**
 * The Google Apps Script template code that users copy into their Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * =====================================================================
 * 초등학교 5학년 영문법 퀴즈 배틀 - 구글 시트 연동 Google Apps Script
 * =====================================================================
 * 
 * [간단 설정 방법]
 * 1. Google Sheets(구글 스프레드시트)를 생성하거나 엽니다.
 * 2. 상단 메뉴에서 [확장 프로그램] > [Apps Script]를 클릭합니다.
 * 3. 기존의 Code.gs 내용을 모두 지우고 이 코드를 그대로 붙여넣습니다.
 * 4. 오른쪽 상단의 파란색 [배포] 버튼 > [새 배포] 클릭!
 * 5. 톱니바퀴 아이콘을 눌러 [웹 앱] 선택:
 *    - 설명: 영문법 퀴즈 성적 자동 기록
 *    - 다음 사용자 권한으로 앱 실행: [나 (Me)]
 *    - 액세스 권한을 가진 사용자: [모든 사용자 (Anyone)]  <-- 필수!
 * 6. [배포]를 누르고 '웹 앱 URL' (https://script.google.com/macros/s/.../exec)을 복사합니다.
 * 7. 게임 화면의 [구글 시트 연동] 메뉴에 해당 URL을 붙여넣으면 완료!
 */

function doPost(e) {
  return handleQuizData(e);
}

function doGet(e) {
  return handleQuizData(e);
}

function handleQuizData(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. 전달받은 데이터 파싱 (JSON 포맷 또는 URL 파라미터 지원)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. 값 추출 및 기본값 처리
    var now = new Date();
    var formattedNow = Utilities.formatDate(now, Session.getScriptTimeZone() || "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    
    var timestamp = data.timestamp || formattedNow;
    var name = (data.name && String(data.name).trim()) || "익명 학생";
    var playCount = data.play_count !== undefined ? Number(data.play_count) : 1;
    var correctCount = data.correct_count !== undefined ? Number(data.correct_count) : 0;
    var wrongCount = data.wrong_count !== undefined ? Number(data.wrong_count) : 0;

    // 3. 시트가 비어있으면 헤더(제목 행) 자동 생성
    if (sheet.getLastRow() === 0) {
      var headers = ["timestamp", "name", "play_count", "correct_count", "wrong_count"];
      sheet.appendRow(headers);

      // 헤더 스타일링 (짙은 네이비 배경, 흰색 굵은 글씨, 가운데 정렬)
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#1e293b");
      headerRange.setFontColor("#f8fafc");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 35);
    }

    // 4. 새 데이터 행 추가 (timestamp, name, play_count, correct_count, wrong_count)
    var newRow = [timestamp, name, playCount, correctCount, wrongCount];
    sheet.appendRow(newRow);

    // 데이터 행 서식 설정 (가운데 정렬)
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 5).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 1, 1, 5).setVerticalAlignment("middle");

    // 5. 성공 응답 반환
    var response = {
      status: "success",
      message: "성적이 구글 시트에 성공적으로 기록되었습니다.",
      record: {
        timestamp: timestamp,
        name: name,
        play_count: playCount,
        correct_count: correctCount,
        wrong_count: wrongCount
      }
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`;
