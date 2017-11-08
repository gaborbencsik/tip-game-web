const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const catalog_adapter = new FileSync('catalog_api.json');
const catalog_db_getter = low(catalog_adapter);

class MatchList {

  get(req, res) {
    let payload = { catalog: catalog_db_getter.get('catalog').value() };
    res.json(payload)
  }
}

module.exports = MatchList
