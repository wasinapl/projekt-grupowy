import db from "../db";

const Resources = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT resource_name_pl, resource_name_eng, factor_id, source_description, resource_unit_1, factor_unit, factor,cat_name_pl
      FROM resources.resources_categories, categories.categories, resources.factors, resources.resources,
       factors.sources where factors.resource_id = resources.resource_id and sources.source_id=factors.source_id 
       and categories.cat_id=resources_categories.cat_id and resources_categories.resource_id=resources.resource_id and factor_id = `;
    const cfQuery = query + "'CF'";
    const wfQuery = query + "'WF'";
    const evQuery = query + "'EV'";
    try {
      const cfData = await db.query(cfQuery);
      const wfData = await db.query(wfQuery);
      const evData = await db.query(evQuery);

      const count = cfData.rows.length;

      const table = [];

      for (let i = 0; i < count; i++) {
        const row = {};
        row.name_pl = cfData.rows[i].resource_name_pl;
        row.name_eng = cfData.rows[i].resource_name_eng;
        row.cf =
          cfData.rows[i] == undefined
            ? "-"
            : cfData.rows[i].factor +
              " " +
              cfData.rows[i].factor_unit +
              "/" +
              cfData.rows[i].resource_unit_1;
        row.wf =
          wfData.rows[i] == undefined
            ? "-"
            : wfData.rows[i].factor +
              " " +
              wfData.rows[i].factor_unit +
              "/" +
              wfData.rows[i].resource_unit_1;
        row.ev =
          evData.rows[i] == undefined
            ? "-"
            : evData.rows[i].factor +
              " " +
              evData.rows[i].factor_unit +
              "/" +
              evData.rows[i].resource_unit_1;
        row.source = cfData.rows[i].source_description;
        row.category = cfData.rows[i].cat_name_pl;
        table.push(row);
      }

      return res.status(201).send(table);
    } catch (error) {
      console.log(error);
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
      const createQuery = `insert into resources.resources(resource_name_pl, resource_name_eng,resource_description_pl,resource_description_eng)
        VALUES ($1, $2, $3, $4)
        returning *;`;
      const values = [
        req.body.name_pl,
        req.body.name_eng,
        req.body.description_pl,
        req.body.description_eng,
      ];
      try {
        const { rows } = await db.query(createQuery, values);
        const resource_id = rows[0].resource_id;

        const queryCat = `insert into resources.resources_categories(resource_id,cat_id)
        VALUES ($1, $2)
        returning *;`;
        const values2 = [resource_id, req.body.cat_id];
        const data = await db.query(queryCat, values2);

        //    {
        //   factor_id: null,
        //   source_id: null,
        //   factor: null,
        //   factor_unit: null,
        //   resource_unit_1: null,
        //   uncertainty: null,
        //   factor_name_pl: null,
        // },
        for (let i = 0; i < req.body.factors.length; i++) {
          let factor = req.body.factors[i];
          let queryFactor = `INSERT INTO resources.factors(
            resource_id, factor_id, source_id, resource_unit_1, factor_unit, factor, uncertainty)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;

            let values = [
              resource_id,
              factor.factor_id,
              factor.source_id,
              factor.resource_unit_1,
              factor.factor_unit,
              factor.factor,
              factor.uncertainty,
            ]
            let { rows } = await db.query(queryFactor, values);
        }

        return res.status(201).send({ rows });
      } catch (error) {
        console.log(error);
        return res.status(201).send(error);
      }
  },
};

export default Resources;
