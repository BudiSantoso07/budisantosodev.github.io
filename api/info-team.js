function getInfoTeam(teamId) {
    fetch(requestUrlInfoTeam+"/"+teamId, {
        headers: {
            'X-Auth-Token' : 'c4abb9dd5b1b4cb3b8a12a36293a4697'
        }
    })
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);

            let infoTeamComponent = "";
            infoTeamComponent += `<h4>Profil Team</h4><hr><br>`;
            infoTeamComponent += `<div class="row">`;
            infoTeamComponent += `<div class="col sm12 m5"><img class="responsive-img" src="`+data.crestUrl+`"><br>`;
            infoTeamComponent += `<table>`;
            infoTeamComponent += `<tr><td width="35%">Asal Negara</td><td width="5%">:</td><td>`+data.area.name+`</td> </tr>`;
            infoTeamComponent += `<tr><td>Singkatan</td><td>:</td><td>`+data.tla+`</td></tr>`;
            infoTeamComponent += `</table>`;
            infoTeamComponent += `</div>`;
            infoTeamComponent += `<div class="col sm12 m1">&nbsp;</div>`;
            infoTeamComponent += `<div class="col sm12 m6">`;
            infoTeamComponent += `<table>`;
            infoTeamComponent += `<tr><td width="25%">Nama</td><td width="5%">:</td><td>`+data.name+`</td> </tr>`;
            infoTeamComponent += `<tr><td>Nama Pendek</td><td>:</td><td>`+data.shortName+`</td></tr>`;
            infoTeamComponent += `<tr><td>Tahun Berdiri</td><td>:</td><td>`+data.founded+`</td></tr>`;
            infoTeamComponent += `<tr><td>Alamat</td><td>:</td><td>`+data.address+`</td></tr>`;
            infoTeamComponent += `<tr><td>Email</td><td>:</td><td>`+data.email+`</td></tr>`;
            infoTeamComponent += `<tr><td>Nomor Telepon</td><td>:</td><td>`+data.phone+`</td></tr>`;
            infoTeamComponent += `<tr><td>Stadion</td><td>:</td><td>`+data.venue+`</td></tr>`;
            infoTeamComponent += `<tr><td>Website</td><td>:</td><td>`+data.website+`</td></tr>`;
            infoTeamComponent += `<tr><td>Warna Team</td><td>:</td><td>`+data.clubColors+`</td></tr>`;
            infoTeamComponent += `</table>`;
            infoTeamComponent += `</div>`;
            infoTeamComponent += `</div>`;

            infoTeamComponent += `<br><h4>Kompetisi Diikuti</h4><hr>`;
            infoTeamComponent += `<table>`;
            infoTeamComponent += `<thead><tr><th>No</th><th>Nama Kompetisi</th><th>Kode Kompetisi</th></tr></thead>`;
            infoTeamComponent += `<tbody>`;
            let autoIncrementNumber = 1;
            data.activeCompetitions.forEach(function (competition) {
               infoTeamComponent += `<tr><td>`+autoIncrementNumber+`</td><td>`+competition.name+`</td><td>`+competition.code+`</td></tr>`;
               autoIncrementNumber+=1;
            });
            infoTeamComponent += `</tbody>`;
            infoTeamComponent += `</table>`;

            infoTeamComponent += `<br><h4>Daftar Pemain</h4><hr>`;
            infoTeamComponent += `<div class="row">`;
            data.squad.forEach(function (player) {
                console.log(player);
                infoTeamComponent += `<div class="col sm12 m3">`;
                infoTeamComponent += `<div class="card">`;
                infoTeamComponent += `<div class="card-image">`;
                infoTeamComponent += `<img src="./img/profil.png" class="responsive-img">`;
                infoTeamComponent += `<span class="card-title" style="background: rgba(0, 0, 0, 0.5); width: 100%; font-size: 14px;">`+player.name+`</span>`;
                infoTeamComponent += `</div>`;
                infoTeamComponent += `<div class="card-content">`;
                infoTeamComponent += player.nationality+`<br>`;
                infoTeamComponent += player.role+`<br>`;
                if(player.position != null){
                    infoTeamComponent += player.position+`<br>`;
                }else{
                    infoTeamComponent += `-<br>`;
                }

                infoTeamComponent += `<br><a href="#" title="Rekrut Individu" onclick="savePlayer('`+player.name+`', '`+player.nationality+`', '`+player.role+`', '`+player.position+`', '`+player.id+`')" class="btn waves-effect blue">Rekrut</a>`;


                infoTeamComponent += `</div>`;
                infoTeamComponent += `</div>`;
                infoTeamComponent += `</div>`;
            });


            infoTeamComponent += `</div>`;

            document.getElementById("kontainer").innerHTML = infoTeamComponent;
        })
        .catch(error);
}