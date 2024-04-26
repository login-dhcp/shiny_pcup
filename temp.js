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
];

data_all = {};
config = configs[configs.length - 1];

$(document).ready(function (e) {
  init();
});

async function init() {
  buildEventIDSelector();

  await getAllData(waitTime);
  // await sleep(waitTime * (num_idols) + 5000);
  await sleep(1000);

  buildTimeSlider();

  await update();
  alert("finished!");
}

function updateHTML(time) {
  buildBasicTable(time);
  buildPredictionTable(time);
  buildRankingTable(time);
}

async function update() {
  var slider = document.getElementById("timeRange");
  var key_ranks = config["key_ranks"];

  var sample_data = data_all[0][key_ranks[0]];
  var time = sample_data[slider.value - 1]["summaryTime"];
  setTimeText(time);

  updateHTML(slider.value - 1);
}

async function getAllData(waitTime) {
  var idols = config["idols"];
  for (let i = 0; i < idols.length; i++) {
    await sleep(waitTime);
    var key_ranks_str = config["key_ranks"].join(",");
    getDataAPI(config["eventID"], i + 1, key_ranks_str);
  }
}

function getDataAPI(eventId, characterId, ranks) {
  var xhttp = new XMLHttpRequest();
  var returnData = {};
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var values = JSON.parse(this.responseText);
      for (let i = 0; i < values.length; i++) {
        var value = values[i];
        returnData[value["rank"]] = value["data"];
      }
    }
  };

  var url = `https://api.matsurihi.me/sc/v1/events/fanRanking/${eventId}/rankings/logs/${characterId}/${ranks}`;
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send();

  data_all[characterId - 1] = returnData;
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
    opt.innerHTML = `${(_eventID - 40000) / 2}주년`;
    select.appendChild(opt);
  }
  select.selectedIndex = configs.length - 1;

  document
    .getElementById("eventID_select_button")
    .addEventListener("click", async function (e) {
      var _config_index =
        document.getElementById("eventID_select").selectedIndex;
      config = configs[_config_index];
      await getAllData(waitTime);
      update();
      alert("finished!");
    });
}

function buildBasicTable(time) {
  var code = "";
  code += "<tr>\n";
  code += "<th>Idol</th>\n";

  var key_ranks = config["key_ranks"];
  var idols = config["idols"];

  // 1. 각 열 추가
  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  // 2. 각 데이터 추가
  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${idolNames[i]}</td>\n`;

    // 2. 아이돌별 데이터 추가
    var data_idol = data_all[i];
    for (let j = 0; j < key_ranks.length; j++) {
      var rank = key_ranks[j];
      var data_rank = data_idol[rank];
      var data_final_log;

      var sample_data = data_all[0][key_ranks[0]];
      var numTimes = sample_data.length;

      // 2.1. 시간대별 데이터 추가
      // time이 -1일 경우 최종데이터
      // time이 index로 주어질 경우 실제 시간 계산해서 사용 TODO
      if (time === -1) {
        data_final_log = data_rank[data_rank.length - 1];
      } else {
        if (data_rank.length < numTimes) {
          var realTime = time - (numTimes - data_rank.length);
          if (realTime < 0) {
            data_final_log = data_rank[0];
          } else {
            data_final_log = data_rank[realTime];
          }
        } else {
          data_final_log = data_rank[time];
        }
      }

      // 최종 데이터에 내용이 없을 경우 처리
      if (undefined !== data_final_log && "score" in data_final_log) {
        code += `<td>${numberWithCommas(data_final_log["score"])}</td>\n`;
      }
      else {
        code += `<td>${numberWithCommas(1)}</td>\n`;
      }
    }
    code += "</tr>\n";
  }
  code += "</table>\n";

  document.getElementById("main_table").innerHTML = code;
}

function buildTimeSlider() {
  var slider = document.getElementById("timeRange");

  var key_ranks = config["key_ranks"];
  var sample_data = data_all[0][key_ranks[0]];

  slider.max = sample_data.length;
  slider.value = sample_data.length;

  var time = sample_data[slider.value - 1]["summaryTime"];
//  var init_time = config[startTime];
//  var init_time_vals = parseTime(init_time);
//  if (slider.value-1%2==1) {
//     if (init_time_vals["mm"]=="0") init_time_vals["mm"] = "30";
//     else init_time_vals["mm"] = "0";
//  }
//  init_time_vals["hh"] = (Number(init_time_vals["hh"]) + (slider.value-1) / 2) % 24
//  init_time_vals["hh"] = ("0"+init_time_vals["hh"]).slice(-2) //%02d
//  init_time_vals["DD"] =
//  var time = init_time + 30min * slider.value-1
  setTimeText(time);

  slider.addEventListener("input", function () {
    update();
  });
}

function buildPredictionTable(time) {
  var code = "";
  code += "<tr>\n";
  code += "<th>Idol</th>\n";

  var key_ranks = config["key_ranks"];
  var idols = config["idols"];
  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${idolNames[i]}</td>\n`;

    var data_idol = data_all[i];
    for (let j = 0; j < key_ranks.length; j++) {
      var rank = key_ranks[j];
      var data_rank = data_idol[rank];
      var data_final_log;

      var sample_data = data_all[0][key_ranks[0]];
      var numTimes = sample_data.length;
      if (time === -1) {
        data_final_log = data_rank[data_rank.length - 1];
      } else {
        if (data_rank.length < numTimes) {
          var realTime = time - (numTimes - data_rank.length);
          if (realTime < 0) {
            data_final_log = data_rank[0];
          } else {
            data_final_log = data_rank[realTime];
          }
        } else {
          data_final_log = data_rank[time];
        }
      }
      var score = data_final_log["score"];
      var timeString = data_final_log["summaryTime"];
      var startTime = config["startTime"];
      var endTime = config["endTime"];
      var totalTime = timeDiff(startTime, endTime);
      var currentTime = timeDiff(startTime, timeString);
      if (currentTime < totalTime) {
        score = (score * totalTime) / currentTime;
      }
      code += `<td>${numberWithCommas(parseInt(score))}</td>\n`;
    }
    code += "</tr>\n";
  }
  code += "</table>\n";

  document.getElementById("predict_table").innerHTML = code;
}

function applyColor() {
    $('#ranking_table tr > td').each(function(index) {
        var cell_rank = $(this).text();
        if (!isNaN(cell_rank)) {
            var cell_color = Math.floor(cell_rank / Math.ceil(idolNames.length / rank_kinds));
            $(this).addClass("rank_"+cell_color);
        }
    });
    $('#ranking_table tr > th').each(function(index) {
        $(this).addClass("table_header");
    });
};

function buildRankingTable(time) {
  var code = "";
  code += "<tr>\n";
  code += "<th>Idol</th>\n";
  var key_ranks = config["key_ranks"];
  var idols = config["idols"];
  for (let j = 0; j < key_ranks.length; j++) {
    code += `<th>${key_ranks[j]}</th>\n`;
  }
  code += "</tr>\n";

  var table_target = document.getElementById("main_table");
  for (let i = 0; i < idols.length; i++) {
    code += "<tr>\n";
    code += `<td>${idolNames[i]}</td>\n`;

    var data_idol = data_all[i];
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

function parseTime(time) {
  // example data: "2021-04-20T15:00:00+09:00"
  var values = {};
  values["YYYY"] = time.slice(0, 4);
  values["MM"] = time.slice(5, 7);
  values["DD"] = time.slice(8, 10);

  values["hh"] = time.slice(11, 13);
  values["mm"] = time.slice(14, 16);
  values["ss"] = time.slice(17, 19);

  values["utc"] = time.slice(19, 20);
  values["utc_hh"] = time.slice(20, 22);
  values["utc_mm"] = time.slice(24, 26);

  return values;
}

function parsedToTime(values) {
  var timeString = `${values["YYYY"]}-${values["MM"]}-${values["DD"]}
  T${values["hh"]}:${values["mm"]}:${values["ss"]}
  ${values["utc"]}${values["utc_hh"]}${values["utc_mm"]}`;

  return timeString;
}

function timeDiff(start, end) {
  // time2 > time1
  // startTime="2021-04-20T15:00:00+09:00";
  // endTime="2021-04-20T12:00:00+09:00";

  // TODO need to change this code in case of event longer than a month
  // TODO if different utc is given...
  var parsedStart = parseTime(start);
  var parsedCurrnet = parseTime(end);

  var diffHour =
    Number(parsedCurrnet["DD"] - parsedStart["DD"]) * 24 +
    Number(parsedCurrnet["hh"] - parsedStart["hh"]) +
    Number(parsedCurrnet["mm"] - parsedStart["mm"]) / 60;
  return diffHour;
}

function setTimeText(time) {
  document.getElementById("timeText").innerHTML = `기록 시간: ${time}`;
}
