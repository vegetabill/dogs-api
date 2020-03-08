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
    return this.db.one('SELECT * FROM owners WHERE login = $1', login);
  }

  insert({ login, displayName }) {
    return this.db.one(
      `INSERT INTO owners(login, display_name) 
      VALUES($1, $2) RETURNING id`,
      [login, displayName]
    );
  }

  update({ login, displayName }) {
    return this.db.none(
      `UPDATE owners SET 
        display_name = $1
       WHERE login = $2`,
      [displayName, login]
    );
  }

  /**
   *
   * @returns true if create
   */
  async createOrUpdateByLogin(login, attrs) {
    const existing = await this.findByLogin(login);
    if (existing) {
      this.update({ login, ...attrs });
      return false;
    }
    await this.insert({ login, ...attrs });
    return true;
  }
}

module.exports = OwnersTable;
