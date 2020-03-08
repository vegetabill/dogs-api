class DogsTable {
  /**
   *
   * @param {*} db pg-promise connected db
   */
  constructor(db) {
    this.db = db;
  }

  sanityCheck() {
    return this.db.one('SELECT count(*) FROM dogs');
  }

  all() {
    return this.db.any('SELECT * FROM dogs ORDER BY created_at DESC');
  }
}

module.exports = DogsTable;
