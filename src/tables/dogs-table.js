class DogsTable {
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
    return this.db.one('SELECT count(*) FROM dogs').then(result => Number(result.count));
  }

  all() {
    return this.db.any('SELECT * FROM dogs ORDER BY created_at DESC');
  }

  insert(attrs) {
    return this.db
      .one(
        `INSERT INTO dogs(owner_id, name, birthdate, breed, photo_url, primary_color) 
      VALUES($/ownerId/, $/name/, $/birthdate/, $/breed/,$/photoUrl/, $/primaryColor/)
      RETURNING id`,
        {
          photoUrl: () => (attrs.photoUrl ? attrs.photoUrl : null),
          ...attrs
        }
      )
      .then(({ id }) => id);
  }

  update(id, attrs) {
    return this.db.none(
      `UPDATE dogs SET name = $/name/, 
        birthdate=$/birthdate/, 
        breed=$/breed/, 
        photo_url=$/photoUrl/,
        primary_color=$/primaryColor/
      WHERE id = $/id/
        `,
      {
        id,
        photoUrl: () => (attrs.photoUrl ? attrs.photoUrl : null),
        ...attrs
      }
    );
  }

  delete(id) {
    return this.db
      .result('DELETE FROM dogs WHERE id = $1', id)
      .then(result => result.rowCount === 0);
  }

  findByOwnerId(ownerId) {
    return this.db.any('SELECT * from dogs WHERE owner_id = $1 ORDER BY name', ownerId);
  }

  findBy({ ownerId, id }) {
    if (!ownerId) {
      return this.findById(id);
    }
    return this.db.oneOrNone('SELECT * from dogs WHERE id = $1 AND owner_id = $2', [id, ownerId]);
  }

  findById(id) {
    return this.db.oneOrNone('SELECT * from dogs WHERE id = $1', id);
  }
}

module.exports = DogsTable;
