function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function numberRemoveCommas(x) {
  return x.toString().replace(/,*/g, "");
}

rank_kinds = 4;
var SHINY_PCUP_BASE_URL = "https://shinycolors.info/utils/shiny_pcup";

idolNames = [
  "마노",
  "히오리",
  "메구루",
  "코가네",
  "마미미",
  "사쿠야",
  "유이카",
  "키리코",
  "카호",
  "치요코",
  "쥬리",
  "린제",
  "나츠하",
  "아마나",
  "텐카",
  "치유키",
  "아사히",
  "후유코",
  "메이",
  "토오루",
  "마도카",
  "코이토",
  "히나나",
  "니치카",
  "미코토",
  "루카",
  "하나",
  "하루키",
];

waitTime = 350;
configs = [
  {
    eventID: 40005,
    idols: range(23, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2020-10-12T15:00:00+09:00",
    endTime: "2020-10-21T12:00:00+09:00",
  },
  {
    eventID: 40006,
    idols: range(25, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2021-04-12T15:00:00+09:00",
    endTime: "2021-04-20T12:00:00+09:00",
  },
  {
    eventID: 40007,
    idols: range(25, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2021-10-12T16:00:00+09:00",
    endTime: "2021-10-18T12:00:00+09:00",
  },
  {
    eventID: 40008,
    idols: range(25, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2022-04-11T15:00:00+09:00",
    endTime: "2022-04-17T12:00:00+09:00",
  },
  {
    eventID: 40009,
    idols: range(25, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2022-10-11T16:00:00+09:00",
    endTime: "2022-10-16T12:00:00+09:00",
  },
  {
    eventID: 40010,
    idols: range(26, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2023-04-12T15:00:00+09:00",
    endTime: "2023-04-16T12:00:00+09:00",
  },
  {
    eventID: 40011,
    idols: range(26, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2023-10-10T15:00:00+09:00",
    endTime: "2023-10-15T12:00:00+09:00",
  },
  {
    eventID: 40012,
    idols: range(28, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2024-04-26T15:00:00+09:00",
    endTime: "2024-04-29T12:00:00+09:00",
  },
// Remove eventID 40013 since we don't have data at source.
//  {
//    eventID: 40013,
//    idols: range(28, 1),
//    key_ranks: ["1", "10", "100", "1000", "3000"],
//    startTime: "2024-10-12T15:00:00+09:00",
//    endTime: "2024-10-14T12:00:00+09:00",
//  },
  {
    eventID: 40014,
    idols: range(28, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2025-04-11T15:00:00+09:00",
    endTime: "2025-04-15T12:00:00+09:00",
  },
  {
    eventID: 40015,
    idols: range(28, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2025-10-10T15:00:00+09:00",
    endTime: "2025-10-14T12:00:00+09:00",
  },
  {
    eventID: 40016,
    idols: range(28, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2026-04-18T15:00:00+09:00",
    endTime: "2026-04-20T12:00:00+09:00",
  },
  {
    eventID: 40017,
    idols: range(28, 1),
    key_ranks: ["1", "10", "100", "1000", "3000"],
    startTime: "2026-10-17T15:00:00+09:00",
    endTime: "2026-10-19T12:00:00+09:00",
  }
];

data_all_all = {};
config = configs[configs.length - 1];  // current config. Initially the latest event.
var currentLanguage = "ko";
var previousEventEstimateEnabled = true;
var previousEstimateConfig = null;
var logScaleEnabled = false;
var rankTrendEnabled = false;
var trendPanelVisibility = {};
var englishIdolNames = [
  "Mano", "Hiori", "Meguru", "Kogane", "Mamimi", "Sakuya", "Yuika", "Kiriko",
  "Kaho", "Chiyoko", "Juri", "Rinze", "Natsuha", "Amana", "Tenka", "Chiyuki",
  "Asahi", "Fuyuko", "Mei", "Toru", "Madoka", "Koito", "Hinana", "Nichika",
  "Mikoto", "Luka", "Hana", "Haruki",
];
var translations = {
  ko: {
    documentTitle: "샤이니컬러즈 프로듀서컵", wiki: "위키", source: "소스", pageTitle: "프로듀서컵 기록실", navigation: "주요 링크",
    introText: "아이돌별 팬 랭킹 점수의 흐름과 종료 예상치를 한눈에 확인하세요.", dataBadge: "기록 데이터",
    controlsLabel: "기록 조회 설정", eventArchive: "이벤트 기록", controlsTitle: "이벤트 선택",
    eventStart: "시작", eventEnd: "종료", eventSelect: "이벤트 선택", viewEvent: "이벤트 보기",
    earliest: "시작 기록", latest: "최신 기록", timelineLabel: "기록 시점", helpTitle: "이 페이지 이용 안내",
    helpLine1: "표는 왼쪽부터 현재 점수, 종료 시점 예상 점수, 현재 등수를 보여줍니다.",
    helpLine2: "이벤트를 고른 뒤 이벤트 보기를 누르고, 표 아래 슬라이더로 기록 시점을 이동하세요.",
    helpLine3: "데이터 로딩에 몇 초 걸릴 수 있습니다. 오래 기다려도 표시되지 않으면 새로고침해 주세요.",
    chartSectionLabel: "점수 추이 차트", chartEyebrow: "SCORE TRENDS", chartTitle: "아이돌 점수 추이와 종료 예상",
    chartRank: "순위 구간", chartNote: "각 순위 구간은 별도 축을 사용합니다. 점선은 2시간 간격 종료 예상입니다.",
    resultsLabel: "아이돌 랭킹 결과", rankingOverview: "RANKING OVERVIEW", resultsTitle: "아이돌별 랭킹",
    scrollNote: "표를 좌우로 움직여 모든 순위를 확인할 수 있어요.", currentScores: "현재 점수",
    selectedTime: "선택한 시점의 기록", forecast: "종료 예상", forecastSubtitle: "현재 추세 기준 예상 점수",
    currentRank: "현재 등수", rankSubtitle: "아이돌별 순위 구간", rankLegend: "순위 색상 범례",
    topRank: "상위", upperRank: "중상위", lowerRank: "중하위", bottomRank: "하위",
    lastUpdated: "최신 업데이트", disclaimer: "본 사이트는 BANDAI NAMCO 및 BXD와 무관한 팬 제작 페이지입니다. 이미지와 관련 지적 재산권은 해당 권리자에게 있습니다.",
    dataSource: "랭킹 데이터 제공", author: "제작", recordedAt: "기록 시간", noData: "선택한 이벤트의 기록 데이터가 없습니다.",
    noRows: "아직 표시할 기록이 없습니다.", idol: "아이돌", chartX: "기록 시각 (UTC+9)", chartY: "팬 수", chartLoading: "차트 데이터를 불러오는 중",
    finishedToast: "완료되었습니다.",
    languageLabel: "언어", chartIdol: "아이돌", rankLabel: "순위", trendVisible: "표시", trendHidden: "숨김", showTrend: "추이 표시", hideTrend: "추이 숨기기",
    eventNotStarted: "아직 시작하지 않은 이벤트입니다.",
    previousEstimateButton: "이전 이벤트 기준 예상", currentEstimateButton: "현재 이벤트 추세 예상",
    loadingPreviousEvent: "이전 이벤트 불러오는 중", previousEventUnavailable: "이전 이벤트 기록 없음",
    linearScaleButton: "선형 축으로 보기", logScaleButton: "로그 축으로 보기",
    logScaleToggleLabel: "로그 축", previousEstimateToggleLabel: "이전 이벤트 기준 예상", rankTrendToggleLabel: "등수 추이만 보기",
    idolRank: "아이돌 등수", rankTrendNote: "각 선은 선택한 아이돌의 등수 변화입니다. 숫자가 작을수록 높은 등수입니다.",
    timerEyebrow: "PRODUCER CUP TIMER", timerTitle: "휴식 타이머", timerDescription: "화면을 눌러 다음 동작까지의 시간을 확인하세요.",
    timerShortcuts: "키보드 조작을 켜면 Space / Enter: 진행 · Esc: 초기화 · R: 랩 시작 · S: 랩 정지 · C: 랩 기록 삭제", timerReady: "준비", timerTapLabel: "타이머 진행",
    timerDescriptionTitle: "타이머 설명 및 단축키", keyboardEnable: "키보드 조작 켜기", keyboardDisable: "키보드 조작 끄기",
    breakTimerGuideTitle: "휴식 타이머", breakTimerGuide1: "첫 입력 후 30초 카운트가 시작됩니다. 세 번 입력하면 5분 휴식 타이머가 시작되고, 휴식 중에는 입력할 수 없습니다.",
    breakTimerGuide2: "30초 안에 세 번 입력하지 않으면 카운트가 초기화됩니다. 연속 입력 간격을 설정하면 해당 시간 안에 세 번 입력했을 때 타이머가 초기화됩니다.",
    breakTimerGuide3: "키보드 조작을 켜면 Space 또는 Enter로 입력하고 Esc로 휴식 타이머를 초기화할 수 있습니다.",
    lapTimerGuideTitle: "랩 스톱워치", lapTimerGuide1: "랩 시작 버튼으로 측정을 시작하고 랩 정지 버튼으로 시간을 기록합니다.",
    lapTimerGuide2: "키보드 조작을 켜면 R로 랩을 시작하거나 새 랩을 열고, S로 측정을 정지하며, C로 랩 기록을 삭제합니다.",
    lapTimerGuide3: "랩 기록과 연속 입력 설정은 이 브라우저에 저장됩니다.",
    timerRunning: "다음 입력까지", timerLocked: "휴식 시간", stopwatchLabel: "랩 스톱워치", stopwatchStart: "랩 시작",
    stopwatchStop: "랩 정지", stopwatchClear: "기록 삭제", stopwatchResults: "랩 기록", noStopwatchResults: "아직 랩 기록이 없습니다.",
    lapStatistics: "랩 통계", medianLap: "중앙값 랩", meanLap: "평균 랩", minLap: "최단 랩", maxLap: "최장 랩",
    rapidClickSetting: "연속 입력 초기화 (ms, 0=끔)",
  },
  en: {
    documentTitle: "Shiny Colors Producer Cup", wiki: "Wiki", source: "Source", pageTitle: "Producer Cup Archive", navigation: "Main navigation",
    introText: "Explore fan-ranking score trends and projected event-end scores for every idol.", dataBadge: "Ranking data",
    controlsLabel: "Archive controls", eventArchive: "EVENT ARCHIVE", controlsTitle: "Choose an event",
    eventStart: "Start", eventEnd: "End", eventSelect: "Select event", viewEvent: "View event",
    earliest: "Earliest record", latest: "Latest record", timelineLabel: "Record timestamp", helpTitle: "How to use this page",
    helpLine1: "The tables show current scores, projected end scores, and current ranks from left to right.",
    helpLine2: "Choose an event, select View event, then use a table slider to browse its history.",
    helpLine3: "Loading can take a few seconds. Refresh if the data does not appear.",
    chartSectionLabel: "Score trend chart", chartEyebrow: "SCORE TRENDS", chartTitle: "Idol score trends and end estimates",
    chartRank: "Rank tier", chartNote: "Each rank tier has its own scale. Dotted lines show estimates at two-hour intervals.",
    resultsLabel: "Idol ranking results", rankingOverview: "RANKING OVERVIEW", resultsTitle: "Rankings by idol",
    scrollNote: "Scroll horizontally inside a table to see every rank.", currentScores: "Current scores",
    selectedTime: "Scores at selected time", forecast: "End estimate", forecastSubtitle: "Projected from the current trend",
    currentRank: "Current rank", rankSubtitle: "Rank tier by idol", rankLegend: "Rank color legend",
    topRank: "Top", upperRank: "Upper", lowerRank: "Lower", bottomRank: "Bottom",
    lastUpdated: "Last updated", disclaimer: "This fan-made site is not affiliated with BANDAI NAMCO or BXD. Images and related intellectual property belong to their respective owners.",
    dataSource: "Ranking data", author: "Made by", recordedAt: "Recorded", noData: "No ranking data is available for the selected event.",
    noRows: "There are no records to show yet.", idol: "Idol", chartX: "Timestamp (UTC+9)", chartY: "Fan count", chartLoading: "Loading chart data",
    finishedToast: "Finished!",
    languageLabel: "Language", chartIdol: "Idol", rankLabel: "Rank", trendVisible: "Shown", trendHidden: "Hidden", showTrend: "Show trend", hideTrend: "Hide trend",
    eventNotStarted: "This event has not started yet.",
    previousEstimateButton: "Estimate from previous event", currentEstimateButton: "Estimate from current trend",
    loadingPreviousEvent: "Loading previous event", previousEventUnavailable: "No previous event data",
    linearScaleButton: "Use linear scale", logScaleButton: "Use log scale",
    logScaleToggleLabel: "Log scale", previousEstimateToggleLabel: "Estimate from previous event", rankTrendToggleLabel: "Rank trends only",
    idolRank: "Idol rank", rankTrendNote: "Each line shows the selected idol’s rank over time. Lower numbers indicate a higher rank.",
    timerEyebrow: "PRODUCER CUP TIMER", timerTitle: "Break timer", timerDescription: "Tap the timer to track the wait between actions.",
    timerShortcuts: "Enable keyboard controls: Space / Enter: count · Esc: reset · R: start lap · S: stop lap · C: clear lap history", timerReady: "Ready", timerTapLabel: "Advance timer",
    timerDescriptionTitle: "Timer guide and shortcuts", keyboardEnable: "Enable keyboard controls", keyboardDisable: "Disable keyboard controls",
    breakTimerGuideTitle: "Break timer", breakTimerGuide1: "The first input starts a 30-second countdown. Three inputs start a 5-minute break timer; inputs are ignored during the break.",
    breakTimerGuide2: "If you do not reach three inputs within 30 seconds, the count resets. If rapid input is configured, three inputs within that interval reset the timer.",
    breakTimerGuide3: "Enable keyboard controls to count with Space or Enter, or reset the break timer with Esc.",
    lapTimerGuideTitle: "Lap stopwatch", lapTimerGuide1: "Use Start lap to begin timing and Stop lap to record the elapsed time.",
    lapTimerGuide2: "With keyboard controls enabled, R starts a lap or opens a new lap, S stops timing, and C clears lap history.",
    lapTimerGuide3: "Lap history and the rapid input setting are saved in this browser.",
    timerRunning: "Time until next action", timerLocked: "Break time", stopwatchLabel: "Lap stopwatch", stopwatchStart: "Start lap",
    stopwatchStop: "Stop lap", stopwatchClear: "Clear laps", stopwatchResults: "Lap history", noStopwatchResults: "No laps recorded yet.",
    lapStatistics: "Lap statistics", medianLap: "Median lap", meanLap: "Mean lap", minLap: "Min lap", maxLap: "Max lap",
    rapidClickSetting: "Reset on rapid taps (ms, 0=off)",
  },
};

//////////

$(document).ready(function (e) {
  initLanguageSelector();
  init();
});

function t(key) {
  return translations[currentLanguage][key] || translations.ko[key] || key;
}

function initializeBreakTimer() {
  var timer = { startedAt: null, count: 0, lockedAt: null, lastTapAt: null, rapidTaps: 0, lapStartedAt: null, laps: [] };
  var interval = 30000;
  var lockInterval = 300000;
  var storageKey = "shiny-pcup-break-timer";
  try {
    var saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    timer.laps = Array.isArray(saved.laps) ? saved.laps : [];
    timer.lapStartedAt = saved.lapStartedAt || null;
    document.getElementById("rapidClickThreshold").value = String(Math.max(0, Number(saved.rapidThreshold) || 0));
  } catch (error) {}
  var tapButton = document.getElementById("breakTimerTap");
  var display = document.getElementById("breakTimerDisplay");
  var status = document.getElementById("breakTimerStatus");
  var count = document.getElementById("breakTimerCount");
  var lapDisplay = document.getElementById("stopwatchDisplay");
  var lapButton = document.getElementById("stopwatchToggle");
  var results = document.getElementById("stopwatchResultsList");
  var keyboardToggle = document.getElementById("timerKeyboardToggle");
  var keyboardToggleLabel = document.getElementById("timerKeyboardToggleLabel");
  var keyboardEnabled = false;

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ laps: timer.laps, lapStartedAt: timer.lapStartedAt, rapidThreshold: Number(document.getElementById("rapidClickThreshold").value) || 0 }));
    } catch (error) {}
  }
  function formatClock(milliseconds, tenths) {
    var total = Math.max(0, milliseconds);
    var hours = Math.floor(total / 3600000);
    var minutes = Math.floor(total / 60000) % 60;
    var seconds = Math.floor(total / 1000) % 60;
    var remainder = tenths ? Math.floor(total % 1000 / 100) : Math.floor(total % 1000);
    return hours + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0") + (tenths ? "." + remainder : "." + String(remainder).padStart(3, "0"));
  }
  function renderLaps(now) {
    lapDisplay.textContent = timer.lapStartedAt ? formatClock(now - timer.lapStartedAt, false) : "0:00:00.000";
    lapButton.textContent = t(timer.lapStartedAt ? "stopwatchStop" : "stopwatchStart");
    results.replaceChildren();
    var durations = timer.laps.map(function (lap) { return Math.max(0, Number(lap.end) - Number(lap.start)); }).sort(function (a, b) { return a - b; });
    var stats = {
      lapMedian: durations.length ? (durations.length % 2 ? durations[Math.floor(durations.length / 2)] : Math.round((durations[durations.length / 2 - 1] + durations[durations.length / 2]) / 2)) : null,
      lapMean: durations.length ? Math.round(durations.reduce(function (sum, duration) { return sum + duration; }, 0) / durations.length) : null,
      lapMin: durations.length ? durations[0] : null,
      lapMax: durations.length ? durations[durations.length - 1] : null,
    };
    Object.keys(stats).forEach(function (id) { document.getElementById(id).textContent = stats[id] === null ? "—" : formatClock(stats[id], false); });
    if (!timer.laps.length) {
      var empty = document.createElement("p"); empty.className = "timer-empty"; empty.textContent = t("noStopwatchResults"); results.appendChild(empty); return;
    }
    timer.laps.slice().reverse().forEach(function (lap, index) {
      var row = document.createElement("div"); row.className = "stopwatch-result-row";
      var when = document.createElement("time"); when.dateTime = new Date(lap.start).toISOString(); when.textContent = formatTokyoTimestamp(lap.start);
      var duration = document.createElement("strong"); duration.textContent = formatClock(lap.end - lap.start, false);
      row.append(when, duration); row.setAttribute("aria-label", t("stopwatchResults") + " " + (timer.laps.length - index)); results.appendChild(row);
    });
  }
  function updateKeyboardToggle() {
    keyboardToggle.setAttribute("aria-pressed", String(keyboardEnabled));
    keyboardToggleLabel.textContent = t(keyboardEnabled ? "keyboardDisable" : "keyboardEnable");
  }
  function render(now) {
    if (timer.count && timer.count < 3 && timer.startedAt) {
      var left = interval - (now - timer.startedAt);
      if (left <= 0) { timer.startedAt = null; timer.count = 0; timer.lastTapAt = null; timer.rapidTaps = 0; }
      else { status.textContent = t("timerRunning"); display.textContent = (left / 1000).toFixed(1); }
    }
    if (timer.count >= 3 && timer.lockedAt) {
      var lockedLeft = lockInterval - (now - timer.lockedAt);
      if (lockedLeft <= 0) { timer.startedAt = null; timer.count = 0; timer.lockedAt = null; }
      else { status.textContent = t("timerLocked"); display.textContent = formatClock(lockedLeft, true).slice(3); }
    }
    if (!timer.count) { status.textContent = t("timerReady"); display.textContent = "GO"; }
    count.textContent = timer.count + " / 3";
    tapButton.classList.toggle("is-locked", timer.count >= 3);
    renderLaps(now);
  }
  function advance() {
    var now = Date.now();
    if (timer.count >= 3) return;
    var threshold = Math.max(0, Number(document.getElementById("rapidClickThreshold").value) || 0);
    if (threshold && timer.lastTapAt && now - timer.lastTapAt < threshold) timer.rapidTaps++;
    else timer.rapidTaps = 1;
    timer.lastTapAt = now;
    if (threshold && timer.rapidTaps > 2) {
      timer.startedAt = null; timer.count = 0; timer.lockedAt = null; timer.rapidTaps = 0; render(now); return;
    }
    if (!timer.count) timer.startedAt = now;
    timer.count++;
    if (timer.count >= 3) timer.lockedAt = now;
    render(now);
  }
  function reset() { timer.startedAt = null; timer.count = 0; timer.lockedAt = null; timer.lastTapAt = null; timer.rapidTaps = 0; render(Date.now()); }
  tapButton.addEventListener("click", advance);
  lapButton.addEventListener("click", function () {
    var now = Date.now();
    if (timer.lapStartedAt) { timer.laps.push({ start: timer.lapStartedAt, end: now }); timer.lapStartedAt = null; }
    else timer.lapStartedAt = now;
    save(); render(now);
  });
  function clearLapHistory() { timer.laps = []; timer.lapStartedAt = null; save(); render(Date.now()); }
  document.getElementById("stopwatchClear").addEventListener("click", clearLapHistory);
  keyboardToggle.addEventListener("click", function () { keyboardEnabled = !keyboardEnabled; updateKeyboardToggle(); });
  document.getElementById("rapidClickThreshold").addEventListener("change", save);
  document.addEventListener("keydown", function (event) {
    if (!keyboardEnabled || event.ctrlKey || event.metaKey || event.altKey || event.repeat || /INPUT|SELECT|TEXTAREA|BUTTON/.test(event.target.tagName)) return;
    if (event.code === "Space" || event.code === "Enter") { event.preventDefault(); advance(); }
    else if (["Escape", "Backspace", "Delete"].includes(event.key)) reset();
    else if (event.key.toLowerCase() === "r") { if (timer.lapStartedAt) { timer.laps.push({ start: timer.lapStartedAt, end: Date.now() }); } timer.lapStartedAt = Date.now(); save(); render(Date.now()); }
    else if (event.key.toLowerCase() === "s" && timer.lapStartedAt) { timer.laps.push({ start: timer.lapStartedAt, end: Date.now() }); timer.lapStartedAt = null; save(); render(Date.now()); }
    else if (event.key.toLowerCase() === "c") clearLapHistory();
  });
  updateKeyboardToggle();
  render(Date.now());
  window.setInterval(function () { render(Date.now()); }, 100);
}

function initLanguageSelector() {
  currentLanguage = "ko";
  var languageSelect = document.getElementById("languageSelect");
  languageSelect.value = currentLanguage;
  applyLanguage();
  languageSelect.addEventListener("change", function () {
    currentLanguage = languageSelect.value;
    applyLanguage();
    if (document.getElementById("eventID_select").options.length) updateEventOptionLabels();
    updateTrendIdolLabels();
    updateEstimateModeButton();
    updateScaleModeButton();
    update();
  });
  document.getElementById("estimateModeToggle").addEventListener("click", togglePreviousEventEstimate);
  document.getElementById("scaleModeToggle").addEventListener("click", function () {
    logScaleEnabled = !logScaleEnabled;
    updateScaleModeButton();
    updateTrendChart();
  });
  document.getElementById("rankTrendToggle").addEventListener("click", function () {
    rankTrendEnabled = !rankTrendEnabled;
    this.setAttribute("aria-pressed", String(rankTrendEnabled));
    if (rankTrendEnabled) logScaleEnabled = false;
    updateScaleModeButton();
    document.getElementById("scaleModeToggle").disabled = rankTrendEnabled;
    document.getElementById("estimateModeToggle").disabled = rankTrendEnabled;
    updateTrendChart();
  });
  updateScaleModeButton();
  initializeBreakTimer();
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.getElementById("languageSelect").value = currentLanguage;
  var keyboardToggle = document.getElementById("timerKeyboardToggle");
  var keyboardToggleLabel = document.getElementById("timerKeyboardToggleLabel");
  if (keyboardToggle && keyboardToggleLabel) keyboardToggleLabel.textContent = t(keyboardToggle.getAttribute("aria-pressed") === "true" ? "keyboardDisable" : "keyboardEnable");
}

function formatAnniversary(eventID) {
  var anniversary = (eventID - 40000) / 2;
  return currentLanguage === "ko" ? `${anniversary}주년` : `${anniversary}th Anniversary`;
}

function getIdolName(index) {
  return currentLanguage === "ko" ? idolNames[index] : englishIdolNames[index] || idolNames[index];
}

function updateEventOptionLabels() {
  Array.from(document.getElementById("eventID_select").options).forEach(function (option) {
    option.textContent = formatAnniversary(Number(option.value));
  });
}

var completionToastTimeout;
var completionToastHideTimeout;
function showFinishedToast() {
  var toast = document.getElementById("completionToast");
  if (!toast) return;
  window.clearTimeout(completionToastTimeout);
  window.clearTimeout(completionToastHideTimeout);
  toast.textContent = t("finishedToast");
  toast.hidden = false;
  requestAnimationFrame(function () { toast.classList.add("is-visible"); });
  completionToastTimeout = window.setTimeout(function () {
    toast.classList.remove("is-visible");
    completionToastHideTimeout = window.setTimeout(function () { toast.hidden = true; }, 250);
  }, 2400);
}

async function init() {
  buildEventIDSelector();

  // Start at the newest event with bundled history. This keeps the page usable
  // before an upcoming event has produced any ranking logs.
  for (let i = configs.length - 1; i >= 0; i--) {
    config = configs[i];
    if (Date.parse(config.startTime) > Date.now()) continue;
    await getAllData();
    if (hasRankingData(config)) break;
  }
  document.getElementById("eventID_select").value = String(config.eventID);

  await buildTimeSlider();
  initializeTrendControls();
  previousEstimateConfig = await loadPreviousEventEstimateConfig();
  if (!previousEstimateConfig) previousEventEstimateEnabled = false;
  updateEstimateModeButton();
  update();
  showFinishedToast();
}

function hasRankingData(eventConfig) {
  var eventData = data_all_all[eventConfig.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][eventConfig.key_ranks[0]];
  return Array.isArray(sampleData) && sampleData.length > 0;
}

function updateHTML(time) {
  // Render all views in one synchronous pass so rapid slider input cannot
  // leave an older table render queued behind the latest position.
  buildBasicTable(time);
  buildPredictionTable(time);
  buildRankingTable(time);
}

function update() {
  var slider = document.getElementById("scoreTimeRange");
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    syncTimeSliders(slider.min || 1, slider.max || 1, slider.value || 1, true);
    updateEventPeriod();
    showNoRankingData();
    return;
  }

  var time = Math.max(0, Math.min(Number(slider.value) - 1, sampleData.length - 1));
  syncTimeSliders(1, sampleData.length, time + 1, false);
  var sample = sampleData[time];
  if (!sample) return;

  updateEventPeriod();
  updateHTML(time);
  updateTrendChart();
}

function showNoRankingData() {
  updateEventPeriod();
  ["main_table", "predict_table", "ranking_table"].forEach(function (id) {
    document.getElementById(id).innerHTML =
      `<tbody><tr><td class=\"empty-state\" colspan=\"6\">${t("noRows")}</td></tr></tbody>`;
  });
  updateTrendChart();
}

async function getDataAPICached(eventID) {
  var returnData = {};
  var url = `${SHINY_PCUP_BASE_URL}/results/${eventID}/rank.json`;

  try {
    var response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);

    var rankingsByCharacter = await response.json();
    for (const [characterID, rankings] of Object.entries(rankingsByCharacter)) {
      var characterData = {};
      for (const ranking of rankings) {
        for (const point of ranking.data) {
          var roundedTime = new Date(point.summaryTime);
          var interval = 1000 * 60 * 30;
          point.summaryTime = new Date(Math.round(roundedTime.getTime() / interval) * interval);
        }
        characterData[ranking.rank] = ranking.data;
      }
      returnData[Number(characterID) - 1] = characterData;
    }
  } catch (error) {
    console.info(`No bundled rankings for event ${eventID}.`, error);
  }

  data_all_all[eventID] = returnData;
  return returnData;
}

async function getAllData() {
  var eventID = config.eventID;
  if (!(eventID in data_all_all)) {
    await getDataAPICached(eventID);
  }
}

async function getDataAPI(eventID, characterID, ranks, key) {
  var xhttp = new XMLHttpRequest();
  var returnData = {};
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var values = JSON.parse(this.responseText);
      for (let i = 0; i < values.length; i++) {
        var value = values[i];
        for (let j=0; j<value["data"].length; j++) {
            let ms = 1000 * 60 * 30;  // round to nearest 30 min
            let originalDate = Date.parse(value["data"][j]["summaryTime"]);
            let roundedDate = new Date(Math.round(originalDate / ms) * ms);
            value["data"][j]["summaryTime"] = roundedDate;
        }
        returnData[value["rank"]] = value["data"];
      }
    }
  };

  if (eventID === configs[configs.length-1]["eventID"]) {
    var url = `https://api.matsurihi.me/sc/v1/events/fanRanking/${eventID}/rankings/logs/${characterID}/${ranks}`;
  }
  else {
    var url = `${SHINY_PCUP_BASE_URL}/results/${eventID}/${characterID}/${ranks}.json`;
  }
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send();

  data_all_all[eventID][characterID - 1] = returnData;
  return returnData;
}

///////////////////////

function buildEventIDSelector() {
  var select = document.getElementById("eventID_select");
  for (let i = 0; i < configs.length; i++) {
    var _config = configs[i];
    var _eventID = _config["eventID"];

    var opt = document.createElement("option");
    opt.value = _eventID;
    opt.textContent = formatAnniversary(_eventID);
    opt.disabled = Date.parse(_config.startTime) > Date.now();
    if (opt.disabled) opt.title = t("eventNotStarted");
    select.appendChild(opt);
  }
  var latestStartedIndex = configs.length - 1;
  while (latestStartedIndex >= 0 && Date.parse(configs[latestStartedIndex].startTime) > Date.now()) latestStartedIndex--;
  select.selectedIndex = Math.max(latestStartedIndex, 0);
  var eventButton = document.getElementById("eventID_select_button");
  eventButton.disabled = latestStartedIndex < 0;
  select.addEventListener("change", function () {
    var selectedConfig = configs[select.selectedIndex];
    eventButton.disabled = !selectedConfig || Date.parse(selectedConfig.startTime) > Date.now();
  });

  document
    .getElementById("eventID_select_button")
    .addEventListener("click", async function (e) {
      var _config_index =
        document.getElementById("eventID_select").selectedIndex;
      if (!configs[_config_index] || Date.parse(configs[_config_index].startTime) > Date.now()) return;
      var keepPreviousEventEstimate = previousEventEstimateEnabled;
      config = configs[_config_index];
      await getAllData(_config_index, waitTime);
      previousEstimateConfig = keepPreviousEventEstimate ? await loadPreviousEventEstimateConfig() : null;
      previousEventEstimateEnabled = keepPreviousEventEstimate && Boolean(previousEstimateConfig);
      updateEstimateModeButton();
      initializeTrendControls();
      await resetTimeSlider();
      await update();
      showFinishedToast();
    });
}

async function resetTimeSlider() {
  var slider = document.getElementById("scoreTimeRange");
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    syncTimeSliders(1, 1, 1, true);
    showNoRankingData();
    return;
  }

  syncTimeSliders(1, sampleData.length, sampleData.length, false);
  updateEventPeriod();
}

async function buildTimeSlider() {
  var slider = document.getElementById("scoreTimeRange");
  document.querySelectorAll(".table-time-range").forEach(function (tableSlider) {
    tableSlider.addEventListener("input", function () {
      slider.value = tableSlider.value;
      update();
    });
    tableSlider.addEventListener("change", function () {
      slider.value = tableSlider.value;
      update();
    });
  });
  await resetTimeSlider();
}

function syncTimeSliders(minimum, maximum, value, disabled) {
  document.querySelectorAll(".table-time-range").forEach(function (slider) {
    slider.min = minimum;
    slider.max = maximum;
    slider.value = value;
    slider.disabled = disabled;
  });
}

function initializeTrendControls() {
  var select = document.getElementById("trendIdolSelect");
  select.replaceChildren();
  config.idols.forEach(function (idol, index) {
    var option = document.createElement("option");
    option.value = String(index);
    option.textContent = getIdolName(index);
    select.appendChild(option);
  });
  select.value = "0";
  select.onchange = function () { updateTrendChart(); };
}

function updateTrendIdolLabels() {
  var select = document.getElementById("trendIdolSelect");
  if (!select) return;
  Array.from(select.options).forEach(function (option, index) {
    option.textContent = getIdolName(index);
  });
}

function getRankLogAtTime(rankData, timeIndex, referenceLength) {
  if (!Array.isArray(rankData) || rankData.length === 0) return null;
  var rankIndex = rankData.length < referenceLength
    ? timeIndex - (referenceLength - rankData.length)
    : timeIndex;
  if (rankIndex < 0) return rankData[0];
  return rankData[rankIndex] || null;
}

function estimateEndScore(score, timestamp, idolIndex, rank) {
  var totalHours = timeDiff(config.startTime, config.endTime);
  var elapsedHours = timeDiff(config.startTime, timestamp);
  if (!Number.isFinite(totalHours) || totalHours <= 0 || elapsedHours <= 0 || elapsedHours >= totalHours) {
    return Number(score);
  }
  if (previousEventEstimateEnabled && previousEstimateConfig && idolIndex !== undefined && rank !== undefined) {
    var progress = Math.max(0, Math.min(1, elapsedHours / totalHours));
    var previousProgressScore = getPreviousScoreAtProgress(progress, idolIndex, rank);
    var previousFinalScore = getPreviousScoreAtProgress(1, idolIndex, rank);
    if (previousProgressScore > 0 && previousFinalScore >= previousProgressScore) {
      return Number(score) * previousFinalScore / previousProgressScore;
    }
  }
  return Number(score) * totalHours / elapsedHours;
}

function getPreviousScoreAtProgress(progress, idolIndex, rank) {
  if (!previousEventEstimateEnabled || !previousEstimateConfig) return null;
  var previousData = data_all_all[previousEstimateConfig.eventID];
  var previousRankData = previousData && previousData[idolIndex] && previousData[idolIndex][rank];
  var previousTotalHours = timeDiff(previousEstimateConfig.startTime, previousEstimateConfig.endTime);
  if (!Array.isArray(previousRankData) || !previousRankData.length || !Number.isFinite(previousTotalHours) || previousTotalHours <= 0) return null;
  var previousStart = Date.parse(previousEstimateConfig.startTime);
  var previousEnd = Date.parse(previousEstimateConfig.endTime);
  var targetTime = previousStart + previousTotalHours * Math.max(0, Math.min(1, progress)) * 3600000;
  var validLogs = previousRankData.filter(function (log) {
    var logTime = Date.parse(log.summaryTime);
    return Number(log.score) > 0 && Number.isFinite(logTime) && logTime >= previousStart && logTime <= previousEnd;
  });
  if (!validLogs.length) return null;
  var nearest = validLogs.reduce(function (closest, log) {
    return Math.abs(Date.parse(log.summaryTime) - targetTime) < Math.abs(Date.parse(closest.summaryTime) - targetTime) ? log : closest;
  }, validLogs[0]);
  return Number(nearest.score);
}

function estimateTrendScoreAt(score, currentTimestamp, targetTimestamp, idolIndex, rank) {
  var currentElapsed = timeDiff(config.startTime, currentTimestamp);
  var targetElapsed = timeDiff(config.startTime, targetTimestamp);
  if (!Number.isFinite(currentElapsed) || currentElapsed <= 0 || !Number.isFinite(targetElapsed) || targetElapsed <= currentElapsed) return Number(score);
  var totalHours = timeDiff(config.startTime, config.endTime);
  if (previousEventEstimateEnabled && totalHours > 0) {
    var currentPreviousScore = getPreviousScoreAtProgress(currentElapsed / totalHours, idolIndex, rank);
    var targetPreviousScore = getPreviousScoreAtProgress(targetElapsed / totalHours, idolIndex, rank);
    if (currentPreviousScore > 0 && targetPreviousScore >= currentPreviousScore) {
      return Number(score) * targetPreviousScore / currentPreviousScore;
    }
  }
  return Number(score) * targetElapsed / currentElapsed;
}

function formatKoreanScoreTick(value) {
  var absoluteValue = Math.abs(value);
  var numberFormat = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
  if (absoluteValue >= 100000000) return `${numberFormat.format(value / 100000000)}억`;
  if (absoluteValue >= 10000) return `${numberFormat.format(value / 10000)}만`;
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(value);
}

function getKoreanScoreAxisTicks(values, isLogScale) {
  if (currentLanguage !== "ko") return {};
  var finiteValues = values.filter(function (value) { return Number.isFinite(value) && value > 0; });
  if (!finiteValues.length) return {};
  var minValue = Math.min.apply(null, finiteValues);
  var maxValue = Math.max.apply(null, finiteValues);
  var tickvals = [];
  if (isLogScale) {
    var minExponent = Math.floor(Math.log10(minValue));
    var maxExponent = Math.ceil(Math.log10(maxValue));
    var exponentStep = Math.max(1, Math.ceil((maxExponent - minExponent + 1) / 7));
    for (var exponent = minExponent; exponent <= maxExponent; exponent += exponentStep) tickvals.push(Math.pow(10, exponent));
  } else {
    var span = maxValue - minValue;
    var roughStep = span > 0 ? span / 5 : maxValue / 5;
    if (!Number.isFinite(roughStep) || roughStep <= 0) return {};
    var magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    var normalizedStep = roughStep / magnitude;
    var niceFactor = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
    var step = niceFactor * magnitude;
    for (var tick = Math.ceil(minValue / step) * step; tick <= maxValue && tickvals.length < 8; tick += step) tickvals.push(tick);
    if (tickvals.length < 2 && minValue !== maxValue) tickvals.push(maxValue);
  }
  if (!tickvals.length) tickvals.push(minValue);
  return { tickmode: "array", tickvals: tickvals, ticktext: tickvals.map(formatKoreanScoreTick) };
}

async function togglePreviousEventEstimate() {
  var button = document.getElementById("estimateModeToggle");
  if (previousEventEstimateEnabled) {
    previousEventEstimateEnabled = false;
    updateEstimateModeButton();
    update();
    return;
  }
  button.disabled = true;
  document.getElementById("estimateModeToggleLabel").textContent = t("loadingPreviousEvent");
  previousEstimateConfig = await loadPreviousEventEstimateConfig();
  button.disabled = false;
  if (previousEstimateConfig) {
    previousEventEstimateEnabled = true;
  } else {
    button.title = t("previousEventUnavailable");
  }
  updateEstimateModeButton();
  update();
}

async function loadPreviousEventEstimateConfig(currentIndex = configs.indexOf(config)) {
  for (var i = currentIndex - 1; i >= 0; i--) {
    var candidate = configs[i];
    if (!data_all_all[candidate.eventID]) {
      var activeConfig = config;
      config = candidate;
      await getAllData();
      config = activeConfig;
    }
    if (hasRankingData(candidate)) return candidate;
  }
  return null;
}

function updateEstimateModeButton() {
  var button = document.getElementById("estimateModeToggle");
  if (!button) return;
  button.setAttribute("aria-pressed", String(previousEventEstimateEnabled));
  document.getElementById("estimateModeToggleLabel").textContent = t("previousEstimateToggleLabel");
}

function updateScaleModeButton() {
  var button = document.getElementById("scaleModeToggle");
  if (!button) return;
  button.setAttribute("aria-pressed", String(logScaleEnabled));
}

function updateTrendChart() {
  if (!window.Plotly) return;
  var note = document.querySelector(".chart-note");
  if (note) note.textContent = t(rankTrendEnabled ? "rankTrendNote" : "chartNote");
  var chartContainer = document.getElementById("trendChart");
  var eventWindow = [toPlotlyDate(config.startTime), toPlotlyDate(config.endTime)];
  var eventStartTimestamp = Date.parse(eventWindow[0]);
  var eventEndTimestamp = Date.parse(eventWindow[1]);
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  Array.from(chartContainer.children).forEach(function (panel) { Plotly.purge(panel.querySelector(".trend-plot")); });
  chartContainer.replaceChildren();
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    chartContainer.textContent = t("noData");
    return;
  }

  var idolSelect = document.getElementById("trendIdolSelect");
  var idolIndex = Number(idolSelect.value || 0);
  var idolData = eventData[idolIndex];
  var referenceLength = sampleData.length;
  // Trends always show the complete history; table sliders only select the
  // snapshot used by the score and ranking tables.
  var timeIndex = referenceLength - 1;
  var selectedPoint = sampleData[timeIndex];
  var cutoff = Math.min(Date.parse(selectedPoint.summaryTime), eventEndTimestamp);
  var palette = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759", "#b07aa1"];

  var idolName = getIdolName(idolIndex);
  config.key_ranks.forEach(function (tier, tierIndex) {
    var tierTraces = [];
    var finalEstimateScore = null;
    var color = palette[tierIndex % palette.length];
    var seriesName = `${t("rankLabel")} ${tier}`;
    if (rankTrendEnabled) {
      var rankX = [];
      var rankY = [];
      for (var rankTime = 0; rankTime <= timeIndex; rankTime++) {
        var selectedRankLog = getRankLogAtTime(idolData && idolData[tier], rankTime, referenceLength);
        var selectedRankTime = selectedRankLog && Date.parse(selectedRankLog.summaryTime);
        if (!selectedRankLog || !Number.isFinite(selectedRankTime) || selectedRankTime < eventStartTimestamp || selectedRankTime > eventEndTimestamp || selectedRankTime > cutoff) continue;
        var scoresAtTime = [];
        for (var otherIdolIndex = 0; otherIdolIndex < config.idols.length; otherIdolIndex++) {
          var otherIdolData = eventData[otherIdolIndex];
          var otherLog = getRankLogAtTime(otherIdolData && otherIdolData[tier], rankTime, referenceLength);
          var otherScore = otherLog && Number(otherLog.score);
          if (otherLog && Number.isFinite(otherScore)) scoresAtTime.push(otherScore);
        }
        var targetScore = Number(selectedRankLog.score);
        if (!Number.isFinite(targetScore) || !scoresAtTime.includes(targetScore)) continue;
        scoresAtTime.sort(function (a, b) { return a - b; });
        var previousRankPoint = rankX.length - 1;
        var targetRank = scoresAtTime.length - scoresAtTime.indexOf(targetScore);
        if (previousRankPoint >= 0 && Date.parse(rankX[previousRankPoint]) === selectedRankTime) rankY[previousRankPoint] = targetRank;
        else { rankX.push(selectedRankLog.summaryTime); rankY.push(targetRank); }
      }
      if (rankX.length) {
        tierTraces.push({
          type: "scatter", mode: "lines", name: seriesName, x: rankX.map(toPlotlyDate), y: rankY,
          customdata: rankX.map(function (value) { return formatTokyoTimestamp(value); }),
          line: { color: color, width: 2 },
          hovertemplate: `${idolName} · ${seriesName}<br>%{customdata}<br>#%{y}<extra></extra>`,
        });
      }
    } else {
      var rankData = idolData && idolData[tier];
      var trendX = [];
      var trendY = [];
      for (var time = 0; time <= timeIndex; time++) {
        var log = getRankLogAtTime(rankData, time, referenceLength);
        var logTime = log && Date.parse(log.summaryTime);
        if (!log || !Number.isFinite(logTime) || logTime < eventStartTimestamp || logTime > eventEndTimestamp || logTime > cutoff) continue;
        var previous = trendX.length - 1;
        if (previous >= 0 && Date.parse(trendX[previous]) === logTime) trendY[previous] = Number(log.score);
        else { trendX.push(log.summaryTime); trendY.push(Number(log.score)); }
      }
      if (trendX.length) {
        var currentLog = { summaryTime: trendX[trendX.length - 1], score: trendY[trendY.length - 1] };
        tierTraces.push({
          type: "scatter", mode: "lines", name: seriesName,
          x: trendX.map(toPlotlyDate), y: trendY,
          customdata: trendX.map(function (value) { return formatTokyoTimestamp(value); }),
          line: { color: color, width: 2 },
          hovertemplate: `${idolName} · ${seriesName}<br>%{customdata}<br>%{y:,.0f}<extra></extra>`,
        });
        var forecastTimes = [Date.parse(currentLog.summaryTime)];
        var forecastInterval = 2 * 60 * 60 * 1000;
        for (var forecastTime = forecastTimes[0] + forecastInterval; forecastTime < eventEndTimestamp; forecastTime += forecastInterval) forecastTimes.push(forecastTime);
        if (eventEndTimestamp > forecastTimes[forecastTimes.length - 1]) forecastTimes.push(eventEndTimestamp);
        var forecastScores = forecastTimes.map(function (forecastTimestamp) {
          return estimateTrendScoreAt(currentLog.score, currentLog.summaryTime, new Date(forecastTimestamp).toISOString(), idolIndex, tier);
        });
        finalEstimateScore = forecastScores[forecastScores.length - 1];
        tierTraces.push({
          type: "scatter", mode: "lines+markers", name: `${seriesName} · ${t("forecast")}`,
          x: forecastTimes.map(function (value) { return new Date(value).toISOString(); }), y: forecastScores,
          customdata: forecastTimes.map(function (value) { return formatTokyoTimestamp(value); }),
          line: { color: color, width: 1.5, dash: "dot" },
          marker: { color: color, size: 5, symbol: "diamond" },
          hovertemplate: `${idolName} · ${seriesName} · ${t("forecast")}<br>%{customdata}<br>%{y:,.0f}<extra></extra>`,
        });
      }
    }

    var panel = document.createElement("article");
    panel.className = "trend-panel";
    var heading = document.createElement("div");
    heading.className = "trend-panel-heading";
    var isVisible = trendPanelVisibility[tier] !== false;
    var collapseToggle = document.createElement("button");
    collapseToggle.className = "trend-collapse-toggle";
    collapseToggle.type = "button";
    collapseToggle.setAttribute("aria-expanded", String(isVisible));
    var title = document.createElement("h3");
    title.id = `trend-title-${tier}`;
    title.textContent = seriesName;
    collapseToggle.setAttribute("aria-controls", `trend-plot-${tier}`);
    collapseToggle.setAttribute("aria-label", `${seriesName}: ${t(isVisible ? "hideTrend" : "showTrend")}`);
    var triangle = document.createElement("span");
    triangle.className = "trend-collapse-mark";
    triangle.setAttribute("aria-hidden", "true");
    triangle.textContent = "▸";
    collapseToggle.appendChild(triangle);
    var subtitle = document.createElement("span");
    subtitle.textContent = t(rankTrendEnabled ? "idolRank" : "chartY");
    var titleGroup = document.createElement("div");
    titleGroup.className = "trend-panel-title-group";
    titleGroup.append(collapseToggle, title, subtitle);
    heading.appendChild(titleGroup);
    if (!rankTrendEnabled && Number.isFinite(finalEstimateScore)) {
      var estimateBadge = document.createElement("span");
      estimateBadge.className = "trend-final-estimate";
      estimateBadge.textContent = `${t("forecast")}: ${numberWithCommas(Math.round(finalEstimateScore))}`;
      estimateBadge.setAttribute("aria-label", `${seriesName} ${t("forecast")}: ${numberWithCommas(Math.round(finalEstimateScore))}`);
      heading.appendChild(estimateBadge);
    }
    var plot = document.createElement("div");
    plot.className = "trend-plot";
    plot.id = `trend-plot-${tier}`;
    plot.setAttribute("role", "img");
    plot.setAttribute("aria-label", `${idolName} · ${seriesName}`);
    plot.hidden = !isVisible;
    panel.append(heading, plot);
    chartContainer.appendChild(panel);
    collapseToggle.addEventListener("click", function () {
      var show = collapseToggle.getAttribute("aria-expanded") !== "true";
      trendPanelVisibility[tier] = show;
      collapseToggle.setAttribute("aria-expanded", String(show));
      collapseToggle.setAttribute("aria-label", `${seriesName}: ${t(show ? "hideTrend" : "showTrend")}`);
      plot.hidden = !show;
      if (show) Plotly.Plots.resize(plot);
    });

    var axisTicks = getTokyoAxisTicks([], eventWindow[0], eventWindow[1]);
    var layout = {
      autosize: true, height: 230,
      margin: { t: 4, r: 16, b: 58, l: 64 },
      paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      font: { family: "DM Sans, Noto Sans KR, sans-serif", size: 10, color: "#5b5963" },
      hovermode: "closest", showlegend: false,
      uirevision: `${config.eventID}-${config.startTime}-${config.endTime}-${idolIndex}-${tier}-${rankTrendEnabled}`,
      xaxis: {
        type: "date", range: eventWindow, autorange: false, fixedrange: true,
        gridcolor: "#eceaf0", zeroline: false, ...axisTicks,
        showticklabels: true,
        title: { text: t("chartX") },
      },
      yaxis: {
        type: rankTrendEnabled ? "linear" : (logScaleEnabled ? "log" : "linear"),
        title: { text: "" }, autorange: rankTrendEnabled ? "reversed" : true,
        dtick: rankTrendEnabled ? 5 : undefined,
        ...(rankTrendEnabled ? {} : getKoreanScoreAxisTicks(tierTraces.flatMap(function (trace) { return trace.y; }), logScaleEnabled)),
        gridcolor: "#eceaf0", zeroline: false,
      },
    };
    if (!tierTraces.length) layout.annotations = [{ text: t("noData"), showarrow: false, x: 0.5, y: 0.5, xref: "paper", yref: "paper" }];
    Plotly.react(plot, tierTraces, layout, { responsive: true, displaylogo: false, displayModeBar: false }).then(function () {
      return Plotly.relayout(plot, { "xaxis.range": eventWindow, "xaxis.autorange": false, "xaxis.fixedrange": true });
    });
  });
}

////////////////////////////
// build main tables

async function buildBasicTable(time) {
  var code = "";
  code += "<tr>\n";
  code += `<th>${t("idol")}</th>\n`;

  var key_ranks = config["key_ranks"];
  var idols = config["idols"];
  var eventID = config["eventID"];

  // 1. 각 열 추가
  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  // 2. 각 데이터 추가
  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${getIdolName(i)}</td>\n`;

    // 2. 아이돌별 데이터 추가
    var data_idol = data_all_all[eventID][i];
    for (let j = 0; j < key_ranks.length; j++) {
      var rank = key_ranks[j];
      var data_rank = data_idol[rank];
      var data_final_log;

      var sample_data = data_all_all[eventID][0][key_ranks[0]];
      var reference_length = sample_data.length;

      // 2.1. 시간별 데이터 추가
      // 3천위 데이터는 sample_data보다 짧을 수 있음
      if (data_rank.length < reference_length) {
        // 그 경우 -n번째 data끼리 timestamp가 동일하다 가정.
        var realTime = time - (reference_length - data_rank.length);
        if (realTime < 0) {
          data_final_log = data_rank[0];
        } else {
          data_final_log = data_rank[realTime];
        }
      } else {
        data_final_log = data_rank[time];
      }

      // 데이터에 내용이 없을 경우
      if (data_final_log === undefined) {
        data_final_log = {"score": 1, "summaryTime": time};
      }
      code += `<td class="numeric-cell">${numberWithCommas(data_final_log["score"])}</td>\n`;
    }
    code += "</tr>\n";
  }
  code += "</table>\n";

  document.getElementById("main_table").innerHTML = code;
}

async function buildPredictionTable(time) {
  var code = "";
  code += "<tr>\n";
  code += `<th>${t("idol")}</th>\n`;

  var key_ranks = config["key_ranks"];
  var idols = config["idols"];
  var eventID = config["eventID"];
  var endTime = config["endTime"];

  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${getIdolName(i)}</td>\n`;

    var data_idol = data_all_all[eventID][i];
    for (let j = 0; j < key_ranks.length; j++) {
      var rank = key_ranks[j];
      var data_rank = data_idol[rank];
      var data_final_log;

      var sample_data = data_all_all[eventID][0][key_ranks[0]];
      var reference_length = sample_data.length;
      // 2.1. 시간별 데이터 추가
      // 3천위 데이터는 sample_data보다 짧을 수 있음
      if (data_rank.length < reference_length) {
        // 그 경우 -n번째 data끼리 timestamp가 동일하다 가정.
        var realTime = time - (reference_length - data_rank.length);
        if (realTime < 0) {
          data_final_log = data_rank[0];
        } else {
          data_final_log = data_rank[realTime];
        }
      } else {
        data_final_log = data_rank[time];
      }

      // 데이터에 내용이 없을 경우
      if (data_final_log === undefined) {
        data_final_log = {"score": 1, "summaryTime": endTime};
      }
      // Some archived rankings include snapshots after the scheduled event end.
      // Estimate from the latest in-event score when such a snapshot is selected.
      if (previousEventEstimateEnabled && Date.parse(data_final_log.summaryTime) > Date.parse(endTime)) {
        var eventEndTimestamp = Date.parse(endTime);
        for (var estimateLogIndex = data_rank.length - 1; estimateLogIndex >= 0; estimateLogIndex--) {
          var estimateLog = data_rank[estimateLogIndex];
          var estimateLogTimestamp = estimateLog && Date.parse(estimateLog.summaryTime);
          if (Number.isFinite(estimateLogTimestamp) && estimateLogTimestamp <= eventEndTimestamp) {
            data_final_log = estimateLog;
            break;
          }
        }
      }
      var score = data_final_log["score"];
      var timeString = data_final_log["summaryTime"];
      score = estimateEndScore(score, timeString, i, rank);
      code += `<td class="numeric-cell">${numberWithCommas(parseInt(score))}</td>\n`;
    }
    code += "</tr>\n";
  }
  code += "</table>\n";

  document.getElementById("predict_table").innerHTML = code;
}

async function buildRankingTable(time) {
  var code = "";
  code += "<tr>\n";
  code += `<th>${t("idol")}</th>\n`;
  var key_ranks = config["key_ranks"];
  var idols = config["idols"];
  var eventID = config["eventID"];

  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  var table_target = document.getElementById("main_table");
  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${getIdolName(i)}</td>\n`;

    var data_idol = data_all_all[eventID][i];
    for (let j = 0; j < key_ranks.length; j++) {
      var column_values = [];
      for (let k = 0; k < idols.length; k++) {
        var score = table_target.rows[k + 1].cells[j + 1].innerHTML;
        score = numberRemoveCommas(score);
        score = Number(score);
        column_values.push(score);
      }
      var sorted_values = column_values.slice();
      sorted_values.sort(function (a, b) {
        return a - b;
      });
      code += `<td class="numeric-cell">${numberWithCommas(
        sorted_values.length - sorted_values.indexOf(column_values[i])
      )}</td>\n`;
    }
    code += "</tr>\n";
  }
  code += "</table>\n";

  document.getElementById("ranking_table").innerHTML = code;

  applyColor();
}

///////////////////////
// util functions
function applyColor() {
    $('#ranking_table tr > td').each(function(index) {
        var cell_rank = $(this).text();
        if (!isNaN(cell_rank)) {
            var cell_color = Math.floor(cell_rank / Math.ceil((idolNames.length+0.0001) / rank_kinds));
            $(this).addClass("rank_"+cell_color);
        }
    });
    $('#ranking_table tr > th').each(function(index) {
        $(this).addClass("table_header");
    });
};

function timeDiff(start, end) {
  return (Date.parse(end) - Date.parse(start)) / 1000 / 60 / 60;
}

function formatTokyoTimestamp(value, short = false) {
  var parsedDate = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(parsedDate.getTime())) return String(value);
  var formatted = new Intl.DateTimeFormat(currentLanguage === "ko" ? "ko-KR" : "en-US", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", ...(short ? {} : { second: "2-digit" }), hourCycle: "h23",
  }).format(parsedDate);
  return short ? formatted : `${formatted} UTC+9`;
}

function toPlotlyDate(value) {
  var timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : value;
}

function getTokyoAxisTicks(times, rangeStart, rangeEnd) {
  var validTimes = (times || []).map(function (value) { return Date.parse(value); }).filter(Number.isFinite);
  var minTime = rangeStart === undefined ? Math.min.apply(null, validTimes) : Date.parse(rangeStart);
  var maxTime = rangeEnd === undefined ? Math.max.apply(null, validTimes) : Date.parse(rangeEnd);
  if (!Number.isFinite(minTime) || !Number.isFinite(maxTime)) return { tickmode: "auto" };
  var count = minTime === maxTime ? 1 : 6;
  var tickvals = [];
  var ticktext = [];
  for (var i = 0; i < count; i++) {
    var timestamp = count === 1 ? minTime : minTime + (maxTime - minTime) * i / (count - 1);
    tickvals.push(new Date(timestamp).toISOString());
    ticktext.push(`${formatTokyoTimestamp(timestamp, true)} UTC+9`);
  }
  return { tickmode: "array", tickvals: tickvals, ticktext: ticktext };
}

function updateEventPeriod(eventConfig = config) {
  var start = document.getElementById("eventStartTime");
  var end = document.getElementById("eventEndTime");
  if (!start || !end || !eventConfig) return;
  start.dateTime = new Date(eventConfig.startTime).toISOString();
  end.dateTime = new Date(eventConfig.endTime).toISOString();
  start.textContent = formatTokyoTimestamp(eventConfig.startTime);
  end.textContent = formatTokyoTimestamp(eventConfig.endTime);
}
