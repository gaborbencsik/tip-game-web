const wee_db = require('wee-db');
const tips_db = wee_db('tips.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const catalog_adapter = new FileSync('catalog_api.json');
const catalog_db_getter = low(catalog_adapter);
const tip_adapter = new FileSync('tips.json');
const tip_db_getter = low(tip_adapter);

class TipsController {

  get(req, res) {
    const catalog = catalog_db_getter.get('catalog').value();
    const tips = tips_db.find('tips', {userId: req.params.user_id}).documents;

    let data = [];

    catalog.forEach(item => {
      let homeGoals, awayGoals, lastModified;

      tips.forEach((tip) => {
        if(item.id == tip.id) {
          homeGoals = tip.homeGoals;
          awayGoals = tip.awayGoals;
          lastModified = tip.tipTimestamp;
        }
      });

      data.push({
        id: item.id,
        homeTeamName: item.homeTeamName,
        awayTeamName: item.awayTeamName,
        date: item.date,
        matchday: item.matchday,
        homeGoals: homeGoals || '',
        awayGoals: awayGoals || '',
        lastModified: lastModified || ''
      });
    });

    res.json({data: req.params, tips: data})
  }

  save(req, res) {

    console.log(req.params);
    console.log(req.body);

    tips_db.upsert('tips',
      { userId: req.params.user_id, id: req.params.tip_id },
      { homeGoals: req.body.home_goals, awayGoals: req.body.away_goals, tipTimestamp: new Date().getTime() });

    res.json({params: req.params, body: req.body})
  }

}

module.exports = TipsController
