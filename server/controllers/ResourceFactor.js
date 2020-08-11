import db from "../db";

const ResourceFactor = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT * FROM factors.factor_names`;

    try {
      const { rows } = await db.query(query);

      return res.status(201).send(rows);
    } catch (error) {
        console.log(error)
      return res.status(201).send(error);
    }
  },

    /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async insertData(req, res) {
    const createQuery = `insert into factors.factor_names(factor_id, factor_name_pl, factor_name_eng, factor_description_pl, factor_description_eng)    
    VALUES ($1, $2, $3,$4, $5)
    returning *;`;
  const values = [
    req.body.factor_id,
    req.body.factor_name_pl,
    req.body.factor_name_eng,
    req.body.factor_description_pl,
    req.body.factor_description_eng,
  ];
   
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },
};

export default ResourceFactor;
