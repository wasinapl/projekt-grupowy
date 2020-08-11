import db from "../db";
var uniqid = require('uniqid');

const ResourceSource = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async getAll(req, res) {
    const query = `SELECT source_id,source_description FROM factors.sources`;

    try {
      const { rows } = await db.query(query);

      const table = [];

      rows.forEach((el) => {
        let row = {};
        row.source_id = el.source_id;
        row.source_description =
          el.source_description.length > 20
            ? el.source_description.substr(0, 20) + "..."
            : el.source_description;
        table.push(row);
      });

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
    const createQuery = `insert into factors.sources(source_date, source_description,doi,bibtex,file_id)    
    VALUES ($1, $2, $3,$4, $5)
    returning *;`;
  const values = [
    req.body.factor_id,
    req.body.source_description,
    req.body.doi,
    req.body.bibtex,
    req.body.file_id,
  ];
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send({ rows });
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
  async upload(req, res) {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" });
    }
    // accessing the file
    const myFile = req.files.file;
    //${myFile.name}
    const name = uniqid('', myFile.name);
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/../public/${name}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      /*
      uniqid() -> "4n5pxq24kpiob12og9"
        uniqid('hello-') -> "hello-4n5pxq24kpiob12og9"
        uniqid('hello-', '-goodbye') -> "hello-4n5pxq24kpiob12og9-goodbye"
      */
      // returing the response with file path and name
      return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
  },
};

export default ResourceSource;
