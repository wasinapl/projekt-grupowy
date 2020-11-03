import db from "../db";

const Modules = {
  /**
   * Get All Modules
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT id,name,value, vegetable ,waste, energy,resources.resource_name_pl as vegetable_name,energy_resources.resource_name_pl as energy_name
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
    const createQuery = `insert into calc.modules(name, value,vegetable,energy,waste)
        VALUES ($1, $2, $3, $4,$5)
        returning *;`;
    const values = [
      req.body.name,
      req.body.value,
      req.body.vegetable,
      req.body.energy,
      req.body.waste,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  async editById(req, res) {
    const createQuery = `UPDATE calc.modules SET
    name=$2, value=$3, vegetable=$4, energy=$5,waste=$6 WHERE id=$1`;
    const values = [
      req.body.id,
      req.body.name,
      req.body.value,
      req.body.vegetable,
      req.body.energy,
      req.body.waste,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },


  async deleteById(req, res) {
    const createQuery = `delete from calc.modules where id=$1`;
    const values = [
      req.body.id,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(202).send({ rows });
    } catch (error) {
      if(error.code === "23503") return res.status(400).send({message: "Nie można skasować, ponieważ ten moduł jest używany w którymś etapie!"});
      return res.status(400).send(error);
    }
  },

  async getVegResFormSelect(req, res) {
    const vegetableQuery = `SELECT resource_id as value, resource_name_pl as text FROM resources.resources`;
    const resourcesQuery = `SELECT resource_id as value, resource_name_pl as text FROM energy_resources.energy_resources`;
    try {
      const vegetables = await db.query(vegetableQuery);
      const resources = await db.query(resourcesQuery);
      return res.status(200).send({ vegetables: vegetables.rows, resources: resources.rows});
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async getModuleByVegetableId(req, res) {
    const query = `SELECT modules.id as value , modules.name as text
    FROM calc.modules WHERE modules.vegetable=$1`;
    const values = [req.query.id];
    try {
      const data = await db.query(query, values);
      return res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

};

export default Modules;
