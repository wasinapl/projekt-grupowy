import db from "../db";

const Units = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const createQuery = `select unit, unit_full_name_pl, unit_full_name_eng, quantity_name_pl, quantity_name_eng, base_unit, ratio  from units.units, units.quantities where units.quantity_id = quantities.quantity_id;`;
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
    const createQuery = `INSERT INTO units.units(
      unit, unit_full_name_pl, unit_full_name_eng, ratio, quantity_id)
      VALUES ($1, $2, $3, $4, $5)
      returning *;`;
    const values = [
      req.body.unit,
      req.body.unit_full_name_pl,
      req.body.unit_full_name_eng,
      req.body.ratio,
      req.body.quantity_id,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      console.log(rows);

      const query = `select unit, unit_full_name_pl, unit_full_name_eng, quantity_name_pl, quantity_name_eng, base_unit, ratio  from units.units, units.quantities 
      where units.quantity_id = quantities.quantity_id AND units.unit=$1;`;
      const val = [rows[0].unit];
      const data = await db.query(query, val);
      return res.status(201).send({rows: data.rows});
    } catch (error) { 
      console.log(error)
      return res.status(201).send(error);
    }
  },
};

export default Units;
