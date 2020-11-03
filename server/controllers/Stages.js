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
      for (let i = 0; i < data.rows.length; i++) {
        const query2 = `SELECT modules.id as value,name as text,value as energy_value ,vegetable,energy,waste,energy_resources.resource_name_pl as energy_name
        FROM energy_resources.energy_resources,calc.stages_modules, calc.modules WHERE stages_modules.stages_id=$1 AND stages_modules.modules_id=modules.id AND modules.energy = energy_resources.resource_id`;
        const values = [data.rows[i].id];
        const { rows } = await db.query(query2, values);
        data.rows[i].modules = rows
      }
      return res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  async getByVegetable(req, res) {
    const query = `SELECT id as value, name as text
      FROM calc.stages WHERE vegetable = $1`;
      const val =[
        req.query.id
      ]
    try {
      const data = await db.query(query, val);
      return res.status(200).send(data.rows);
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
    const values = [req.body.name, req.body.vegetable];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  async insertModule(req, res) {
    try {
      const deleteQuery = `delete from calc.stages_modules where stages_id=$1`;
      const val = [
        req.body.data.id
      ]
      let { rows } = await db.query(deleteQuery, val);
      for (let i = 0; i < req.body.data.modules.length; i++) {
        const createQuery = `insert into calc.stages_modules(modules_id, stages_id)
              VALUES ($1, $2)
              returning *;`;
        const values = [req.body.data.modules[i], req.body.data.id];
        let { rows } = await db.query(createQuery, values);

      }
      return res.status(201).send({elo: 'git'});
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
    // const createQuery = `insert into calc.stages(name, vegetable)
    //     VALUES ($1, $2)
    //     returning *;`;
    // const values = [req.body.name, req.body.vegetable];
  },

  async deleteData(req, res) {
    const deleteQuery = `delete from calc.stages_modules where stages_id=$1`;
    const deleteQuery2 = `delete from calc.stages where id=$1`;
    const values = [req.body.id];
    try {
      const data = await db.query(deleteQuery, values);
      const data2 = await db.query(deleteQuery2, values);
      return res.status(201).send({ result: "git" });
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },
};

export default Stages;
