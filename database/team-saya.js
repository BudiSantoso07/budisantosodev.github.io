const NAMA_DATABASE = "my_team";
const NAMA_TABEL = "player";

var databaseInstance = idb.open(NAMA_DATABASE, 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains(NAMA_TABEL)) {
        var peopleOS = upgradeDb.createObjectStore(NAMA_TABEL);
    }
});

function findOnePlayer(playerId) {
    databaseInstance.then(function(db) {
        var tx = db.transaction(NAMA_TABEL, 'readonly');
        var store = tx.objectStore(NAMA_TABEL);
        return store.get(playerId);
    }).then(function(val) {
        console.dir(val);
    });
}

function getAllPlayer() {
    let infoTeamComponent = "";
    infoTeamComponent += `<div class="row">`;
    let flagSudahDiIterasi = false;

    databaseInstance.then(function(db) {
        var tx = db.transaction(NAMA_TABEL, 'readonly');
        var store = tx.objectStore(NAMA_TABEL);
        return store.openCursor();

    }).then(function getPlayer(cursor) {
        if (!cursor) {
            if(flagSudahDiIterasi === false){
                infoTeamComponent += `<div class="col sm12 m12">`;
                infoTeamComponent += `<br>`;
                infoTeamComponent += `<div style="padding: 2%; color: white;" class="yellow">Data tidak tersedia</div>`;
                infoTeamComponent += `</div>`;
                infoTeamComponent += `</div>`;
                document.getElementById("kontainer").innerHTML = infoTeamComponent;
            }
            return;
        }else{
            flagSudahDiIterasi = true;
        }

        let autoIncrement = 0;
        for (var field in cursor.value) {
            //console.log(cursor.value[field]);
            if(autoIncrement == 0){
                infoTeamComponent += `<div class="col sm12 m3">`;
                infoTeamComponent += `<div class="card">`;

                infoTeamComponent += `<div class="card-image">`;
                infoTeamComponent += `<img src="./img/profil.png" class="responsive-img">`;
                infoTeamComponent += `<span class="card-title" style="background: rgba(0, 0, 0, 0.5); width: 100%; font-size: 14px;">`+cursor.value[field]+`</span>`;
                infoTeamComponent += `</div>`;

                autoIncrement++;
                continue;
            }else if(autoIncrement == 1){
                infoTeamComponent += `<div class="card-content">`;
                infoTeamComponent += cursor.value[field]+`<br>`;

                autoIncrement++;
                continue;
            }else if(autoIncrement == 2){
                infoTeamComponent += cursor.value[field]+`<br>`;
                autoIncrement++;
                continue;

            }else if (autoIncrement == 3){
                if(cursor.value[field] != null){
                    infoTeamComponent += cursor.value[field]+`<br>`;
                }else{
                    infoTeamComponent += `-<br>`;
                }

                infoTeamComponent += `<br><a href="#" title="Rekrut Individu" onclick="deletePlayer('`+cursor.key+`')" class="btn waves-effect red">Hapus</a>`;


                infoTeamComponent += `</div>`;
                infoTeamComponent += `</div>`;
                infoTeamComponent += `</div>`;

                autoIncrement++;
                continue;
            }
        }
        return cursor.continue().then(getPlayer);
    }).then(function() {
        infoTeamComponent += `</div>`;
        document.getElementById("kontainer").innerHTML = infoTeamComponent;
    });
}

function savePlayer(name, nationality, role, position, apiFootballPlayerId) {
    databaseInstance.then(function(db) {
        var tx = db.transaction(NAMA_TABEL, 'readwrite');
        var store = tx.objectStore(NAMA_TABEL);
        var item = {
            name: name,
            nationality: nationality,
            role: role,
            position : position,
            created: new Date().getTime()
        };
        store.add(item, apiFootballPlayerId);
        return tx.complete;
    }).then(function() {
        alert("Pemain berhasil direkrut");
    }).catch(function() {
        alert("Pemain gagal direkrut");
    })
}

function deletePlayer(playerId) {
    databaseInstance.then(function(db) {
        var tx = db.transaction(NAMA_TABEL, 'readwrite');
        var store = tx.objectStore(NAMA_TABEL);
        store.delete(playerId);
        return tx.complete;
    }).then(function() {
        alert("Pemain berhasil dihapus dari daftar list");
    }).then(function () {
        getAllPlayer();
    });
}