function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function numberRemoveCommas(x) {
    return x.toString().replace(/,*/g, "");
}

//idols = [1, 2];
//idolNames = ["마노", "히오리"];
idols = range(25, 1);
idolNames = ["마노", "히오리", "메구루",
    "코가네", "마미미", "사쿠야", "유이카", "키리코",
    "아마나", "치유키", "텐카",
    "린제", "치요코", "카호", "쥬리", "나츠하",
    "아사히", "후유코", "메이",
    "토오루", "마도카", "코이토", "히나나",
    "니치카", "미코토"
];
num_idols = 4;
idols = idols.slice(0, num_idols);
idolNames = idolNames.slice(0, num_idols);

key_ranks_str = "1,10,100,1000,3000";
key_ranks = ["1", "10", "100", "1000", "3000"];
eventId = 40006;
data_all = {};
startTime = "2021-04-12T15:00:00+09:00";
endTime = "2021-04-20T12:00:00+09:00";

function getDataAPI(eventId, characterId, ranks) {
    var xhttp = new XMLHttpRequest();
    var returnData = {};
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var values = JSON.parse(this.responseText);
            for (let i = 0; i < values.length; i++) {
                var value = values[i];
                returnData[value['rank']] = value['data'];
            }
        };
    };

    var url = `https://api.matsurihi.me/sc/v1/events/fanRanking/${eventId}/rankings/logs/${characterId}/${ranks}`;
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();

    data_all[characterId - 1] = returnData;
    return returnData;
};

function getAllData() {
    for (let i = 0; i < idols.length; i++) {
        getDataAPI(eventId, i + 1, key_ranks_str);
        // data_all[i] = data_idol;
    }
}

///////////////////////

function buildBasicTable(time) {
    var code = '';
    code += '<tr>\n';
    code += '<th>Idol</th>\n';
    for (let j = 0; j < key_ranks.length; j++) {
        code += `<th>${key_ranks[j]}</th>\n`;
    }
    code += '</tr>\n';

    for (let i = 0; i < idols.length; i++) {
        code += '<tr>\n';
        code += `<td>${idolNames[i]}</td>\n`

        var data_idol = data_all[i];
        for (let j = 0; j < key_ranks.length; j++) {
            var rank = key_ranks[j];
            var data_rank = data_idol[rank];
            var data_final_log;
            if (time === -1) {
                data_final_log = data_rank[data_rank.length - 1];
            } else {
                data_final_log = data_rank[time];
            }
            code += `<td>${numberWithCommas(data_final_log["score"])}</td>\n`;
        }
        code += '</tr>\n';
    }
    code += '</table>\n';

    document.getElementById("main_table").innerHTML = code;
};

function buildTimeSlider() {
    var sample_data = data_all[0][key_ranks[0]];
    var timeRange = document.getElementById("timeRange");
    timeRange.max = sample_data.length;
    timeRange.value = sample_data.length;

    var time = sample_data[timeRange.value - 1]['summaryTime'];
    document.getElementById("timeText").innerHTML = `${time}`;
}

function parseTime(time) {
    // example data: "2021-04-20T15:00:00+09:00"
    var values = {};
    values['YYYY'] = time.slice(0, 4);
    values['MM'] = time.slice(5, 7);
    values['DD'] = time.slice(8, 10);

    values['hh'] = time.slice(11, 13);
    values['mm'] = time.slice(14, 16);
    values['ss'] = time.slice(17, 19);

    values['utc'] = time.slice(19, 20);
    values['utc_hh'] = time.slice(20, 22);
    values['utc_mm'] = time.slice(24, 26);

    return values;
}

function timeDiff(start, end) {
    // time2 > time1
    // startTime="2021-04-20T15:00:00+09:00";
    // endTime="2021-04-20T12:00:00+09:00";

    // TODO need to change this code in case of event longer than a month
    // TODO if different utc is given...
    var parsedStart = parseTime(start);
    var parsedCurrnet = parseTime(end);

    var diffHour = Number(parsedCurrnet['DD'] - parsedStart['DD']) * 24 +
        Number(parsedCurrnet['hh'] - parsedStart['hh']) +
        Number(parsedCurrnet['mm'] - parsedStart['mm']) / 60;
    return diffHour;

}


function buildPredictionTable(time) {
    var code = '';
    code += '<tr>\n';
    code += '<th>Idol</th>\n';
    for (let j = 0; j < key_ranks.length; j++) {
        code += `<th>${key_ranks[j]}</th>\n`;
    }
    code += '</tr>\n';

    for (let i = 0; i < idols.length; i++) {
        code += '<tr>\n';
        code += `<td>${idolNames[i]}</td>\n`

        var data_idol = data_all[i];
        for (let j = 0; j < key_ranks.length; j++) {
            var rank = key_ranks[j];
            var data_rank = data_idol[rank];
            var data_final_log;
            if (time === -1) {
                data_final_log = data_rank[data_rank.length - 1];
            } else {
                data_final_log = data_rank[time];
            }
            var score = data_final_log["score"];
            var timeString = data_final_log["summaryTime"];
            var totalTime = timeDiff(startTime, endTime);
            var currentTime = timeDiff(startTime, timeString);
            if (currentTime < totalTime) {
                score = score * totalTime / currentTime;
            }
            code += `<td>${numberWithCommas(parseInt(score))}</td>\n`;
        }
        code += '</tr>\n';
    }
    code += '</table>\n';

    document.getElementById("predict_table").innerHTML = code;
};

function buildRankingTable(time) {
    var code = '';
    code += '<tr>\n';
    code += '<th>Idol</th>\n';
    for (let j = 0; j < key_ranks.length; j++) {
        code += `<th>${key_ranks[j]}</th>\n`;
    }
    code += '</tr>\n';

    var table_target = document.getElementById('main_table');
    for (let i = 0; i < idols.length; i++) {
        code += '<tr>\n';
        code += `<td>${idolNames[i]}</td>\n`

        var data_idol = data_all[i];
        for (let j = 0; j < key_ranks.length; j++) {
            var column_values = [];
            for (let k = 0; k < idols.length; k++) {
                var score = table_target.rows[k + 1].cells[j+1].innerHTML;
                score = numberRemoveCommas(score);
                score = Number(score);
                column_values.push(score);
            }
            var sorted_values = column_values.slice();
            sorted_values.sort(function(a, b){return a-b;});
            code += `<td>${numberWithCommas(sorted_values.length - sorted_values.indexOf(column_values[i]))}</td>\n`;
        }
        code += '</tr>\n';
    }
    code += '</table>\n';

    document.getElementById("ranking_table").innerHTML = code;
};

function update() {
    var slider = document.getElementById("timeRange");
    var sample_data = data_all[0][key_ranks[0]];
    slider.addEventListener("input", function() {
        var time = sample_data[slider.value - 1]['summaryTime'];
        document.getElementById("timeText").innerHTML = `${time}`;
        buildBasicTable(slider.value - 1);
        buildPredictionTable(slider.value - 1);
        buildRankingTable(slider.value - 1);
    })
}

$(document).ready(function(e) {
    getAllData();
    buildTimeSlider();

    buildBasicTable(-1);
    buildPredictionTable(-1);
    buildRankingTable(-1);

    update();
})