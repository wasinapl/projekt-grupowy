import db from "../db";

const Quantities = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const createQuery = `SELECT quantity_id, quantity_name_pl, base_unit FROM units.quantities;`;
    const { rows } = await db.query(createQuery);

    return res.status(201).send({ rows });
  },

   /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async insertData(req, res) {
    const createQuery = `insert into units.quantities(quantity_name_pl, quantity_name_eng, base_unit)    
      VALUES ($1, $2, $3)
      returning *;`;
    const values = [
      req.body.unit_full_name_pl,
      req.body.unit_full_name_eng,    
      req.body.unit,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    } catch (error) { 
      console.log(error)
      return res.status(201).send(error);
    }
  },


};

export default Quantities;
