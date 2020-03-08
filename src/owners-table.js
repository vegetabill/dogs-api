class OwnersTable {
  /**
   *
   * @param {*} db pg-promise connected db
   */
  constructor(db) {
    this.db = db;
  }

  sanityCheck() {
    return this.db.one('SELECT count(*) FROM owners');
  }

  all() {
    return this.db.any('SELECT * FROM owners ORDER BY name');
  }
}

module.exports = OwnersTable;
