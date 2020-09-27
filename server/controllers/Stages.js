import db from "../db";

const Stages = {
  /**
   * Get All Stages
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT *
      FROM calc.stages, resources.resources WHERE stages.vegetable=resources.resource_id`;
    try {
      const data = await db.query(query);
      return res.status(201).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  /**
   * Create A Stages
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async insertData(req, res) {
    const createQuery = `insert into calc.stages(name, vegetable)
        VALUES ($1, $2)
        returning *;`;
    const values = [
      req.body.name,
      req.body.vegetable,
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

export default Stages;
