import db from "../db";

const Lines = {
  /**
   * Get All Stages
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT *
    FROM calc.lines, resources.resources WHERE lines.vegetable=resources.resource_id`;
    try {
      const data = await db.query(query);
      for (let i = 0; i < data.rows.length; i++) {
        const query2 = `SELECT stages.id as value,stages.name as text,stages.vegetable from calc.stages,calc.lines_stages where lines_stages.lines_id=$1 and stages.id = lines_stages.stages_id `;
        const values = [data.rows[i].id];
        const { rows } = await db.query(query2, values);
        for (let j = 0; j < rows.length; j++) {
          const query3 = `SELECT modules.id, name, value as energy_value ,vegetable,energy,waste,energy_resources.resource_name_pl as energy_name
          FROM energy_resources.energy_resources,calc.stages_modules, calc.modules WHERE stages_modules.stages_id=$1 AND stages_modules.modules_id=modules.id AND modules.energy = energy_resources.resource_id`;
          const values3 = [rows[j].value];
          let data2 = await db.query(query3, values3);
          rows[j].modules = data2.rows;
        }
        data.rows[i].stages = rows;
      }
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
    const createQuery = `insert into calc.lines(name, vegetable)
    VALUES ($1, $2)
    returning *;`;
    const values = [req.body.name, req.body.vegetable];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  async insertStage(req, res) {
    try {
      const deleteQuery = `delete from calc.lines_stages where lines_id=$1`;
      const val = [
        req.body.data.id
      ]
      let { rows } = await db.query(deleteQuery, val);
      for (let i = 0; i < req.body.data.stages.length; i++) {
        const createQuery = `insert into calc.lines_stages(stages_id, lines_id)
              VALUES ($1, $2)
              returning *;`;
        const values = [req.body.data.stages[i], req.body.data.id];
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
    const deleteQuery = `delete from calc.lines_stages where lines_id = $1`
    const createQuery = `delete from calc.lines where id=$1`;
    const values = [req.body.id];
    try {
      await db.query(deleteQuery, values);
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },
};

export default Lines;
