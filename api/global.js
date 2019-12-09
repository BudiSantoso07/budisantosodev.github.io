var requestUrlStanding = "https://api.football-data.org/v2/competitions/2021/standings";
var requestUrlInfoTeam = "https://api.football-data.org/v2/teams";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}