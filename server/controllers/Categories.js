import db from "../db";

const Categories = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAllParentCategories(req, res) {
    const createQuery = `select DISTINCT cat_name_pl,parent_id from categories.categories,categories.hierarchy_of_categories where categories.categories.cat_id = categories.hierarchy_of_categories.parent_id ;`;
    const { rows } = await db.query(createQuery);

    return res.status(201).send({ rows });
  },
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const createQuery = `select  cat_id,cat_name_pl from categories.categories`;
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
    const createQuery = `insert into categories.categories(cat_name_pl,cat_name_eng,cat_description_pl,cat_description_eng)
      VALUES ($1, $2, $3, $4)
      returning *;`;
    const values = [
      req.body.cat_name_pl,
      req.body.cat_name_eng,
      req.body.cat_des_pl,
      req.body.cat_des_eng,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      console.log(rows);
      const query =
        "insert into categories.hierarchy_of_categories(cat_id, parent_id)  VALUES ($1, $2)";
      const val = [rows[0].cat_id, req.body.parent];
      const data = await db.query(query, val);
      return res.status(201).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(201).send(error);
    }
  },

  /*
  resource: {
      name_pl: null,
      name_eng: null,
      description_pl: null,
      description_eng: null,
      cat_id: null,
      factors: [],
    },
  */
  async boundToRes(req, res) {

    const createQuery = `insert into resources.resources_categories(resource_id,cat_id)
      VALUES ($1, $2)
      returning *;`;
    const values = [ 
      req.body.resource_id,
      req.body.cat_id,
    ];
 
      const { rows } = await db.query(createQuery, values);
    
  },
};

export default Categories;
