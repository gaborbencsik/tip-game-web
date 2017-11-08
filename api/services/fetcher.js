const wee_db = require('wee-db');
const catalog_db = wee_db('catalog.json');
const catalog_api_db = wee_db('catalog_api.json');
const fetch = require('node-fetch');

const dummy = require('./../dummy.json');
const url = 'http://api.football-data.org/v1/competitions/452/fixtures';

let obj = dummy.match_list;

class MatchFetcher {

  parseDummy(obj, db) {
    obj.forEach((item) => {

      let halfTimeHomeGoals = null;
      let halfTimeAwayGoals = null;

      if (!item.result.halfTime == undefined) {
        halfTimeHomeGoals = item.result.halfTime.goalsHomeTeam;
        halfTimeAwayGoals = item.result.halfTime.goalsAwayTeam;
      }

      db.insert('catalog', {
        eventId: "",
        homeTeamName: item.homeTeamName,
        awayTeamName: item.awayTeamName,
        date: new Date(item.date).getTime(),
        matchday: item.matchday,
        homeGoals: item.result.goalsHomeTeam,
        awayGoals: item.result.goalsAwayTeam,
        halfTimeHomeGoals: halfTimeHomeGoals,
        halfTimeAwayGoals: halfTimeAwayGoals,
        status: item.status
      })
    });
  }

  parseApi(obj, db) {
    let object = obj.fixtures;

    object.forEach((item) => {

      let id = item._links.self.href.slice(-6);

      let halfTimeHomeGoals1 = null;
      let halfTimeAwayGoals1 = null;

      if (item.result.halfTime != undefined) {
        halfTimeHomeGoals1 = item.result.halfTime.goalsHomeTeam;
        halfTimeAwayGoals1 = item.result.halfTime.goalsAwayTeam;
      }

      db.upsert('catalog', { id: id }, {
        homeTeamName: item.homeTeamName,
        awayTeamName: item.awayTeamName,
        date: new Date(item.date).getTime(),
        matchday: item.matchday,
        homeGoals: item.result.goalsHomeTeam,
        awayGoals: item.result.goalsAwayTeam,
        halfTimeHomeGoals: halfTimeHomeGoals1,
        halfTimeAwayGoals: halfTimeAwayGoals1,
        status: item.status
      })
    });
  }
}

let ApiClient = {
  fetchData: function(url) {
    return fetch(url, {
      method: 'GET',
      headers: { 'X-Auth-Token': 'e61a9ca95d4540aeb951e2c2ba44359d' }
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log(error);
      return Promise.reject();
    })
  }
}

const manager = new MatchFetcher;
ApiClient.fetchData(url)
  .then((data) => { manager.parseApi(data, catalog_api_db) })
  .catch(error => { console.log(error); });
