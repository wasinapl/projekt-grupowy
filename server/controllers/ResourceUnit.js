import db from "../db";

const ResourceUnit = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT unit FROM units.units`;

    try {
      const { rows } = await db.query(query);

  
   
      return res.status(201).send(rows);
    } catch (error) {
        console.log(error)
      return res.status(201).send(error);
    }
  },

  
};

export default ResourceUnit;
