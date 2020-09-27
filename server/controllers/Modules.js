import db from "../db";

const Modules = {
  /**
   * Get All Modules
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT name,value, vegetable , energy,resources.resource_name_pl as vegetable_name,energy_resources.resource_name_pl as energy_name
      FROM calc.modules,resources.resources,energy_resources.energy_resources where modules.energy = energy_resources.resource_id and modules.vegetable=resources.resource_id`;
    try {
      const data = await db.query(query);
      return res.status(201).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  /**
   * Create A Modules
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async insertData(req, res) {
    const createQuery = `insert into calc.modules(name, value,vegetable,energy)
        VALUES ($1, $2, $3, $4)
        returning *;`;
    const values = [
      req.body.name,
      req.body.value,
      req.body.vegetable,
      req.body.energy,
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

export default Modules;
