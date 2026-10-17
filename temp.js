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
var previousEventEstimateEnabled = false;
var previousEstimateConfig = null;
var logScaleEnabled = true;
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
    controlsLabel: "기록 조회 설정", eventArchive: "이벤트 기록", controlsTitle: "이벤트와 기록 시점 선택",
    loadingTime: "기록 시점을 불러오는 중", eventSelect: "이벤트 선택", viewEvent: "이벤트 보기",
    earliest: "시작 기록", latest: "최신 기록", timelineLabel: "기록 시점", helpTitle: "이 페이지 이용 안내",
    helpLine1: "표는 왼쪽부터 현재 점수, 종료 시점 예상 점수, 현재 등수를 보여줍니다.",
    helpLine2: "이벤트를 고른 뒤 이벤트 보기를 누르고, 슬라이더로 기록 시점을 이동하세요.",
    helpLine3: "데이터 로딩에 몇 초 걸릴 수 있습니다. 오래 기다려도 표시되지 않으면 새로고침해 주세요.",
    chartSectionLabel: "점수 추이 차트", chartEyebrow: "SCORE TRENDS", chartTitle: "아이돌 점수 추이와 종료 예상",
    chartRank: "순위 구간", chartNote: "실선은 기록된 점수, 점선은 이벤트 종료 시점 예상 점수입니다.",
    resultsLabel: "아이돌 랭킹 결과", rankingOverview: "RANKING OVERVIEW", resultsTitle: "아이돌별 랭킹",
    scrollNote: "표를 좌우로 움직여 모든 순위를 확인할 수 있어요.", currentScores: "현재 점수",
    selectedTime: "선택한 시점의 기록", forecast: "종료 예상", forecastSubtitle: "현재 추세 기준 예상 점수",
    currentRank: "현재 등수", rankSubtitle: "아이돌별 순위 구간", rankLegend: "순위 색상 범례",
    topRank: "상위", upperRank: "중상위", lowerRank: "중하위", bottomRank: "하위",
    lastUpdated: "최신 업데이트", disclaimer: "본 사이트는 BANDAI NAMCO 및 BXD와 무관한 팬 제작 페이지입니다. 이미지와 관련 지적 재산권은 해당 권리자에게 있습니다.",
    dataSource: "랭킹 데이터 제공", author: "제작", recordedAt: "기록 시간", noData: "선택한 이벤트의 기록 데이터가 없습니다.",
    noRows: "아직 표시할 기록이 없습니다.", idol: "아이돌", chartX: "기록 시각", chartY: "팬 수", chartLoading: "차트 데이터를 불러오는 중",
    languageLabel: "언어", chartIdol: "아이돌", rankLabel: "순위",
    eventNotStarted: "아직 시작하지 않은 이벤트입니다.",
    previousEstimateButton: "이전 이벤트 기준 예상", currentEstimateButton: "현재 이벤트 추세 예상",
    loadingPreviousEvent: "이전 이벤트 불러오는 중", previousEventUnavailable: "이전 이벤트 기록 없음",
    linearScaleButton: "선형 축으로 보기", logScaleButton: "로그 축으로 보기",
  },
  en: {
    documentTitle: "Shiny Colors Producer Cup", wiki: "Wiki", source: "Source", pageTitle: "Producer Cup Archive", navigation: "Main navigation",
    introText: "Explore fan-ranking score trends and projected event-end scores for every idol.", dataBadge: "Ranking data",
    controlsLabel: "Archive controls", eventArchive: "EVENT ARCHIVE", controlsTitle: "Choose an event and timestamp",
    loadingTime: "Loading timestamp", eventSelect: "Select event", viewEvent: "View event",
    earliest: "Earliest record", latest: "Latest record", timelineLabel: "Record timestamp", helpTitle: "How to use this page",
    helpLine1: "The tables show current scores, projected end scores, and current ranks from left to right.",
    helpLine2: "Choose an event, select View event, then move the slider to browse its history.",
    helpLine3: "Loading can take a few seconds. Refresh if the data does not appear.",
    chartSectionLabel: "Score trend chart", chartEyebrow: "SCORE TRENDS", chartTitle: "Idol score trends and end estimates",
    chartRank: "Rank tier", chartNote: "Solid lines show recorded scores; dotted lines show projections to event end.",
    resultsLabel: "Idol ranking results", rankingOverview: "RANKING OVERVIEW", resultsTitle: "Rankings by idol",
    scrollNote: "Scroll horizontally inside a table to see every rank.", currentScores: "Current scores",
    selectedTime: "Scores at selected time", forecast: "End estimate", forecastSubtitle: "Projected from the current trend",
    currentRank: "Current rank", rankSubtitle: "Rank tier by idol", rankLegend: "Rank color legend",
    topRank: "Top", upperRank: "Upper", lowerRank: "Lower", bottomRank: "Bottom",
    lastUpdated: "Last updated", disclaimer: "This fan-made site is not affiliated with BANDAI NAMCO or BXD. Images and related intellectual property belong to their respective owners.",
    dataSource: "Ranking data", author: "Made by", recordedAt: "Recorded", noData: "No ranking data is available for the selected event.",
    noRows: "There are no records to show yet.", idol: "Idol", chartX: "Timestamp", chartY: "Fan count", chartLoading: "Loading chart data",
    languageLabel: "Language", chartIdol: "Idol", rankLabel: "Rank",
    eventNotStarted: "This event has not started yet.",
    previousEstimateButton: "Estimate from previous event", currentEstimateButton: "Estimate from current trend",
    loadingPreviousEvent: "Loading previous event", previousEventUnavailable: "No previous event data",
    linearScaleButton: "Use linear scale", logScaleButton: "Use log scale",
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

function initLanguageSelector() {
  try {
    var savedLanguage = localStorage.getItem("shiny-pcup-language");
    if (savedLanguage === "ko" || savedLanguage === "en") currentLanguage = savedLanguage;
  } catch (error) {
    // Keep Korean as the default when browser storage is unavailable.
  }
  var languageSelect = document.getElementById("languageSelect");
  languageSelect.value = currentLanguage;
  applyLanguage();
  languageSelect.addEventListener("change", function () {
    currentLanguage = languageSelect.value;
    try { localStorage.setItem("shiny-pcup-language", currentLanguage); } catch (error) {}
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
  updateScaleModeButton();
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

async function alertFinished() {
  alert("Finished!");
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
  update();
  await alertFinished();
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
  var slider = document.getElementById("timeRange");
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    syncTimeSliders(slider.min || 1, slider.max || 1, slider.value || 1, true);
    showNoRankingData();
    return;
  }

  var time = Math.max(0, Math.min(Number(slider.value) - 1, sampleData.length - 1));
  syncTimeSliders(1, sampleData.length, time + 1, false);
  var sample = sampleData[time];
  if (!sample) return;

  setTimeText(sample.summaryTime);
  updateHTML(time);
  updateTrendChart(time);
}

function showNoRankingData() {
  setTimeText(t("noData"));
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
      previousEventEstimateEnabled = false;
      previousEstimateConfig = null;
      updateEstimateModeButton();
      config = configs[_config_index];
      await getAllData(_config_index, waitTime);
      initializeTrendControls();
      await resetTimeSlider();
      await update();
      await alertFinished();
    });
}

async function updateTimeSliderText() {
  var slider = document.getElementById("timeRange");
  var key_ranks = config["key_ranks"];
  var eventID = config["eventID"];

  var sample_data = data_all_all[eventID][0][key_ranks[0]];
  var time = sample_data[slider.value - 1]["summaryTime"];
  setTimeText(time);
}

async function resetTimeSlider() {
  var slider = document.getElementById("timeRange");
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    syncTimeSliders(1, 1, 1, true);
    showNoRankingData();
    return;
  }

  syncTimeSliders(1, sampleData.length, sampleData.length, false);
  setTimeText(sampleData[sampleData.length - 1].summaryTime);
}

async function buildTimeSlider() {
  var slider = document.getElementById("timeRange");
  slider.addEventListener("input", update);
  slider.addEventListener("change", update);
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
  document.querySelectorAll("#timeRange, .table-time-range").forEach(function (slider) {
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
    var previousEventData = data_all_all[previousEstimateConfig.eventID];
    var previousSample = previousEventData && previousEventData[0] && previousEventData[0][previousEstimateConfig.key_ranks[0]];
    var previousRankData = previousEventData && previousEventData[idolIndex] && previousEventData[idolIndex][rank];
    if (Array.isArray(previousSample) && previousSample.length && Array.isArray(previousRankData) && previousRankData.length) {
      var progress = Math.max(0, Math.min(1, elapsedHours / totalHours));
      var previousTotalHours = timeDiff(previousEstimateConfig.startTime, previousEstimateConfig.endTime);
      var targetTime = Date.parse(previousEstimateConfig.startTime) + previousTotalHours * progress * 3600000;
      var matchingLogs = previousRankData.filter(function (log) { return Number(log.score) > 0 && Number.isFinite(Date.parse(log.summaryTime)); });
      if (matchingLogs.length) {
        var previousStartScore = Number(matchingLogs[0].score);
        var previousAtProgress = matchingLogs.reduce(function (closest, log) {
          return Math.abs(Date.parse(log.summaryTime) - targetTime) < Math.abs(Date.parse(closest.summaryTime) - targetTime) ? log : closest;
        }, matchingLogs[0]);
        var previousFinalScore = Number(matchingLogs[matchingLogs.length - 1].score);
        var previousProgressScore = Number(previousAtProgress.score);
        if (previousProgressScore > 0 && previousFinalScore >= previousProgressScore && previousFinalScore >= previousStartScore) {
          return Number(score) * previousFinalScore / previousProgressScore;
        }
      }
    }
  }
  return Number(score) * totalHours / elapsedHours;
}

async function togglePreviousEventEstimate() {
  var button = document.getElementById("estimateModeToggle");
  if (previousEventEstimateEnabled) {
    previousEventEstimateEnabled = false;
    updateEstimateModeButton();
    update();
    return;
  }
  var currentIndex = configs.indexOf(config);
  button.disabled = true;
  button.textContent = t("loadingPreviousEvent");
  for (var i = currentIndex - 1; i >= 0; i--) {
    var candidate = configs[i];
    if (!data_all_all[candidate.eventID]) {
      var activeConfig = config;
      config = candidate;
      await getAllData();
      config = activeConfig;
    }
    if (hasRankingData(candidate)) {
      previousEstimateConfig = candidate;
      break;
    }
  }
  button.disabled = false;
  if (previousEstimateConfig) {
    previousEventEstimateEnabled = true;
  } else {
    button.title = t("previousEventUnavailable");
  }
  updateEstimateModeButton();
  update();
}

function updateEstimateModeButton() {
  var button = document.getElementById("estimateModeToggle");
  if (!button) return;
  button.textContent = previousEventEstimateEnabled ? t("currentEstimateButton") : t("previousEstimateButton");
  button.setAttribute("aria-pressed", String(previousEventEstimateEnabled));
}

function updateScaleModeButton() {
  var button = document.getElementById("scaleModeToggle");
  if (!button) return;
  button.textContent = logScaleEnabled ? t("linearScaleButton") : t("logScaleButton");
  button.setAttribute("aria-pressed", String(logScaleEnabled));
}

function updateTrendChart(selectedTime) {
  if (!window.Plotly) return;
  var chartElement = document.getElementById("trendChart");
  var eventData = data_all_all[config.eventID];
  var sampleData = eventData && eventData[0] && eventData[0][config.key_ranks[0]];
  if (!Array.isArray(sampleData) || sampleData.length === 0) {
    Plotly.react(chartElement, [], {
      autosize: true,
      margin: { t: 15, r: 20, b: 50, l: 65 },
      annotations: [{ text: t("noData"), showarrow: false, x: 0.5, y: 0.5, xref: "paper", yref: "paper" }],
      xaxis: { visible: false }, yaxis: { visible: false },
    }, { responsive: true, displaylogo: false });
    return;
  }

  var idolSelect = document.getElementById("trendIdolSelect");
  var idolIndex = Number(idolSelect.value || 0);
  var idolData = eventData[idolIndex];
  var referenceLength = sampleData.length;
  var timeIndex = selectedTime === undefined
    ? Math.max(0, Math.min(Number(document.getElementById("timeRange").value) - 1, referenceLength - 1))
    : Math.max(0, Math.min(selectedTime, referenceLength - 1));
  var selectedPoint = sampleData[timeIndex];
  var cutoff = Date.parse(selectedPoint.summaryTime);
  var palette = ["#4e79a7", "#f28e2b", "#59a14f", "#e15759", "#b07aa1", "#76b7b2", "#edc948", "#ff9da7", "#9c755f", "#bab0ab", "#6f4e7c", "#2f7f9d", "#cc6677", "#447744", "#aa4499", "#ddaa33", "#6699cc", "#884400", "#117755", "#882255", "#888844", "#44aa99", "#9955bb", "#cc6677", "#669944", "#ee7733", "#4477aa", "#aa3377"];
  var traces = [];

  var idolName = getIdolName(idolIndex);
  for (var rankIndex = 0; rankIndex < config.key_ranks.length; rankIndex++) {
    var rank = config.key_ranks[rankIndex];
    var rankData = idolData && idolData[rank];
    if (!Array.isArray(rankData) || rankData.length === 0) continue;

    var trendX = [];
    var trendY = [];
    for (var time = 0; time <= timeIndex; time++) {
      var log = getRankLogAtTime(rankData, time, referenceLength);
      var logTime = log && Date.parse(log.summaryTime);
      if (!log || !Number.isFinite(logTime) || logTime > cutoff) continue;
      var previous = trendX.length - 1;
      if (previous >= 0 && Date.parse(trendX[previous]) === logTime) {
        trendY[previous] = Number(log.score);
      } else {
        trendX.push(log.summaryTime);
        trendY.push(Number(log.score));
      }
    }

    var currentLog = getRankLogAtTime(rankData, timeIndex, referenceLength);
    if (!currentLog || trendX.length === 0) continue;
    var color = palette[rankIndex % palette.length];
    var seriesName = `${t("rankLabel")} ${rank}`;
    traces.push({
      type: "scatter", mode: "lines", name: seriesName, legendgroup: seriesName,
      x: trendX, y: trendY, line: { color: color, width: 2 },
      hovertemplate: `${idolName} · ${seriesName}<br>%{x|%Y-%m-%d %H:%M}<br>%{y:,.0f}<extra></extra>`,
    });

    var projectedScore = estimateEndScore(currentLog.score, currentLog.summaryTime, idolIndex, rank);
    traces.push({
      type: "scatter", mode: "lines+markers", name: `${seriesName} · ${t("forecast")}`,
      legendgroup: seriesName, showlegend: false,
      x: [currentLog.summaryTime, config.endTime], y: [Number(currentLog.score), projectedScore],
      line: { color: color, width: 1.5, dash: "dot" },
      marker: { color: color, size: 7, symbol: "diamond" },
      hovertemplate: `${idolName} · ${seriesName} · ${t("forecast")}<br>%{x|%Y-%m-%d %H:%M}<br>%{y:,.0f}<extra></extra>`,
    });
  }

  Plotly.react(chartElement, traces, {
    autosize: true, height: 590,
    margin: { t: 18, r: 24, b: 65, l: 78 },
    paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "DM Sans, Noto Sans KR, sans-serif", size: 11, color: "#5b5963" },
    hovermode: "closest", uirevision: `${config.eventID}-${idolIndex}`,
    xaxis: { title: { text: t("chartX") }, type: "date", gridcolor: "#eceaf0", zeroline: false },
    yaxis: { title: { text: t("chartY") }, type: logScaleEnabled ? "log" : "linear", gridcolor: "#eceaf0", zeroline: false },
    legend: { orientation: "h", y: -0.22, groupclick: "togglegroup", font: { size: 10 } },
  }, { responsive: true, displaylogo: false });
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
      code += `<td>${numberWithCommas(data_final_log["score"])}</td>\n`;
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
      var score = data_final_log["score"];
      var timeString = data_final_log["summaryTime"];
      score = estimateEndScore(score, timeString, i, rank);
      code += `<td>${numberWithCommas(parseInt(score))}</td>\n`;
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
      code += `<td>${numberWithCommas(
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

function setTimeText(time) {
  var parsedTime = time instanceof Date ? time : new Date(time);
  var localeTime = Number.isFinite(parsedTime.getTime())
    ? parsedTime.toLocaleString(currentLanguage === "ko" ? "ko-KR" : "en-US")
    : String(time);
  var container = document.getElementById("timeText");
  var icon = document.createElement("span");
  icon.className = "time-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "◷";
  var label = document.createElement("span");
  label.textContent = `${t("recordedAt")}: ${localeTime}`;
  container.replaceChildren(icon, label);
}
