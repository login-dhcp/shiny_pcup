function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

// idols = [1, 2];
// idolNames = ["마노", "히오리"];
idols = range(25, 1);
idolNames = ["마노", "히오리", "메구루",
"코가네", "마미미", "사쿠야", "유이카", "키리코",
"아마나", "치유키", "텐카",
"린제", "치요코", "카호", "쥬리", "나츠하",
"아사히", "후유코", "메이",
"토오루", "마도카", "코이토", "히나나",
"니치카", "미코토"];
key_ranks_str = "1,10,100,1000,3000";
key_ranks = ["1", "10", "100", "1000", "3000"];
eventId = 40006;
data_all = {};



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
    // xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();

    return returnData;
};

function getAllData() {
    for (let i = 0; i < idols.length; i++) {
        var data_idol = getDataAPI(eventId, i + 1, key_ranks_str);
        data_all[i] = data_idol;
    }
}

///////////////////////

function buildBasicTable() {
    var code = '';
    code += `<table id="main_table">`;
    code += '<tr>';
    code += '<th>Idol</th>';
    for (let j = 0; j < key_ranks.length; j++) {
        code += `<th>${key_ranks[j]}</th>`;
    }
    code += '</tr>';

    for (let i = 0; i < idols.length; i++) {
        code += '<tr>';
        code += `<td>${idolNames[i]}</td>`

        var data_idol = data_all[i];
        for (let j=0; j<key_ranks.length; j++) {
        	var rank = key_ranks[j];
        	var data_rank = data_idol[rank];
        	var data_final_log = data_rank[data_rank.length -1];
        	code += `<td>${data_final_log["score"]}</td>`;
        }
        code += '</tr>';
    }
    code += '</table>';
    code += `Time: ${data_final_log['summaryTime']}`;
    document.getElementById("container").insertAdjacentHTML('beforeend', code);
};

// const run = async () => {
//   const result = await getAllData()
//   // do something else here after firstFunction completes
//   buildBasicTable();
// }

function run() {
    getAllData();
    buildBasicTable();
};
run();