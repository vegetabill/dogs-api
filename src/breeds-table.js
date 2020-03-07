class BreedsTable {
  /**
   *
   * @param {*} db pg-promise connected db
   */
  constructor(db) {
    this.db = db;
  }

  sanityCheck() {
    return this.db.one('SELECT count(*) FROM breeds');
  }

  all() {
    return this.db.any('SELECT name FROM breeds ORDER BY name');
  }
}

module.exports = BreedsTable;
