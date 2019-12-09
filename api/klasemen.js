function getStandings() {
    fetch(requestUrlStanding, {
        headers: {
            'X-Auth-Token' : 'c4abb9dd5b1b4cb3b8a12a36293a4697'
        }
    })
        .then(status)
        .then(json)
        .then(function(data) {
            let standingComponent = "";
            standingComponent += `<table class="table-responsive"><thead><tr><th>No</th><th>Nama Team</th><th>Jumlah Pertandingan</th><th>W</th><th>D</th><th>L</th><th>Pts</th><th>GD</th></tr></thead>`;
            let groupingData;
            data.standings.forEach(function(team) {
                if(team.type === "TOTAL"){
                    groupingData = team;
                }
            });

            standingComponent += `<tbody>`;
            groupingData.table.forEach(function (team) {
                standingComponent += `<tr><td>`+team.position+`</td><td><a href="#" onclick="getInfoTeam('`+team.team.id+`')"><img src="`+team.team.crestUrl+`" style="width: 20px; height: 20px;"> &nbsp; `+team.team.name+`</a></td><td>`+team.playedGames+`</td><td>`+team.won+`</td><td>`+team.draw+`</td><td>`+team.lost+`</td><td>`+team.points+`</td><td>`+team.goalDifference+`</td></tr>`;
            });

            standingComponent += `</tbody></table>`;
            document.getElementById("kontainer").innerHTML = standingComponent;
        })
        .catch(error);
}