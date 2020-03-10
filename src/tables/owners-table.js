class OwnersTable {
  /**
   *
   * @param {*} db pg-promise connected db
   */
  constructor(db) {
    this.db = db;
  }

  sanityCheck() {
    return this.count();
  }

  count() {
    return this.db.one('SELECT count(*) FROM owners').then(data => {
      return Number(data.count);
    });
  }

  all() {
    return this.db.any('SELECT * FROM owners ORDER BY login');
  }

  findByLogin(login) {
    return this.db.oneOrNone('SELECT * FROM owners WHERE login = $1', login);
  }

  insert({ login, displayName }) {
    return this.db.none(
      `INSERT INTO owners(login, display_name) 
      VALUES($1, $2)`,
      [login, displayName]
    );
  }

  delete(id) {
    return this.db
      .result('DELETE FROM owners WHERE id = $1', id)
      .then(result => result.rowCount === 1);
  }

  update({ login, displayName }) {
    return this.db.none(
      `UPDATE owners SET 
        display_name = $1
       WHERE login = $2`,
      [displayName, login]
    );
  }
}

module.exports = OwnersTable;
