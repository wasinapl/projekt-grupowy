import db from "../db";

const EnergyResources = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const createQuery = `
    SELECT energy_resources.energy_resources.resource_id,energy_resources.energy_resources.resource_name_pl,energy_resources.energy_resources.gus_id,energy_resources.energy_resources.resource_name_eng, factors.factor_names.factor_name_pl,energy_resources.factors.resource_unit , energy_resources.factors.factor,energy_resources.factors.factor_unit,factors.sources.source_description,energy_resources.factors.uncertainty
        FROM energy_resources.energy_resources    
        INNER JOIN energy_resources.factors ON energy_resources.energy_resources.resource_id=energy_resources.factors.resource_id
        INNER JOIN factors.factor_names ON energy_resources.factors.factor_id=factors.factor_names.factor_id
        INNER JOIN factors.sources ON energy_resources.factors.source_id=factors.sources.source_id;`;
    const { rows } = await db.query(createQuery);

    const idList = [];

    rows.forEach(async row => {
      row.carbonFootPrint = `${row.factor} ${row.factor_unit}/${row.resource_unit}`;
      idList.push(row.resource_id);
    });

    const cateregoryList = [];
    for (let i = 0; i < idList.length; i++) {
      const query = `select categories.categories.cat_name_pl from energy_resources.resources_categories 
      INNER JOIN categories.categories ON energy_resources.resources_categories.cat_id=categories.categories.cat_id
      where energy_resources.resources_categories.resource_id=$1`;
      const values = [idList[i]];
      let { rows } = await db.query(query, values);
      let list = [];
      rows.forEach( cat => {
        list.push(cat.cat_name_pl);
      });
      cateregoryList.push(list);
    }
    
    for (let i = 0; i < rows.length; i++) {
      rows[i].categories = cateregoryList[i];
    }

    return res.status(201).send({ rows });
  },

  /*  
        {
            "resource_id": 1,
            "resource_name_pl": "Węgiel kamienny energetyczny z wyłączeniem brykietów",
            "resource_name_eng": "Black coal except briquette",
            "factor_name_pl": "ślad węglowy",
            "resource_unit": "kWh",
            "factor": 0.32,
            "factor_unit": "kg",
            "source_description": "Appendix 7",
            "uncertainty": 0.1,
            "carbonFootPrint": "0.32 kg/kWh",
            "categories": [
                {
                    "cat_name_pl": "nośniki energii"
                },
                {
                    "cat_name_pl": "nośniki palne"
                },
                {
                    "cat_name_pl": "węgiel"
                }
            ]
        },
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async insertData(req, res) {
    const createQuery = `INSERT INTO
    energy_resources.energy_resources(resource_id,resource_name_pl,resource_name_eng,gus_id, resource_description_pl,resource_description_eng)
      VALUES(DEFAULT, $1, $2, $3,$4, $5)
      returning *`;
      console.log(req.body);
    const values = [
      req.body.resource_name_pl,
      req.body.resource_name_eng,
      req.body.gus_id,
      req.body.resource_description_pl,
      req.body.resource_description_eng,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
    }catch(error) {
      return res.status(400).send(error);
    }
  },
  async deleteData(req, res) {
    const deleteQuery = 'DELETE FROM energy_resources.energy_resources WHERE resource_id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async editData(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    const updateQuery = 'UPDATE energy_resources.energy_resources SET resource_name_pl=$2,resource_name_eng=$3,gus_id=$4, resource_description_pl=$5,resource_description_eng=$6 WHERE resource_id=$1 returning *';
    const values = [
      req.params.id,
      req.body.resource_name_pl,
      req.body.resource_name_eng,
      req.body.gus_id,
      req.body.resource_description_pl,
      req.body.resource_description_eng,
    ];
    try {
      const { rows } = await db.query(updateQuery, values);
      return res.status(201).send({ rows });
    }catch(error) {
      return res.status(400).send(error);
    }
  },

  async getEnergyResourcesByGUS(req, res) {
    const updateQuery = 'SELECT resource_name_pl,gus_id FROM energy_resources.energy_resources';
    try {
      const { rows } = await db.query(updateQuery);
      return res.status(201).send({ rows });
    }catch(error) {
      return res.status(400).send(error);
    }
  },
  async getUnits(req, res) {
    const updateQuery = 'SELECT unit FROM units.units';
    try {
      const { rows } = await db.query(updateQuery);
      return res.status(201).send({ rows });
    }catch(error) {
      return res.status(400).send(error);
    }
  },
  async addResourceWithGUS(req, res) {
    const updateQuery = `INSERT INTO
    energy_resources.energy_resources(resource_id,resource_name_pl,gus_id)
      VALUES(DEFAULT, $1, $2)
      returning *`;
      const values = [
        req.body.resource_name_pl,
        req.body.gus_id,
     
      ];
    try {
      const { rows } = await db.query(updateQuery,values);
      return res.status(201).send({ rows });
    }catch(error) {
      return res.status(400).send(error);
    }
  }
};

export default EnergyResources;
