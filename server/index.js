import User from './controllers/User';
import EnergyResources from './controllers/EnergyResources';
import Units from './controllers/Units';
import Quantities from './controllers/Quantities';
import Categories from './controllers/Categories';
import Resources from './controllers/Resources';
import ResourceFactor from './controllers/ResourceFactor';
import ResourceSource from './controllers/ResourceSource';
import ResourceUnit from './controllers/ResourceUnit';
import Modules from './controllers/Modules';
import Lines from './controllers/Lines';
import Stages from './controllers/Stages';
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var cors = require("cors");
require('dotenv').config();



app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', User.create);
app.post('/api/login', User.login);

app.get('/api/energyresources/getall', EnergyResources.getAll); //nosniki energii
app.post('/api/energyresources/add', EnergyResources.insertData);
app.delete('/api/energyresources/delete/:id', EnergyResources.deleteData);
app.post('/api/energyresources/update/:id', EnergyResources.editData);
app.get('/api/energyresources/getbygusall', EnergyResources.getEnergyResourcesByGUS);
app.get('/api/energyresources/getallunits', EnergyResources.getUnits);
app.post('/api/energyresources/addreswithgus', EnergyResources.addResourceWithGUS);

app.get('/api/units/getall', Units.getAll); //jednostki
app.post('/api/units/add', Units.insertData);

app.get('/api/quantities/getall', Quantities.getAll);    //jednostki jakies tam
app.post('/api/quantities/add', Quantities.insertData);

app.get('/api/cat/getallp', Categories.getAllParentCategories);  //kategorie z parentem
app.get('/api/cat/getall', Categories.getAll);  //kategorie wszystkie
app.post('/api/cat/add', Categories.insertData);
app.post('/api/cat/addtores', Categories.boundToRes);// dodawanie kategorii do resource po id

app.get('/api/resources/getall',Resources.getAll);
app.post('/api/resources/add',Resources.insertData) ///surowce
app.get('/api/resources/getallfactor',ResourceFactor.getAll);  //surowce wspolczynnik
app.post('/api/resources/addfactor', ResourceFactor.insertData);// ----//--------

app.get('/api/resources/getallsource',ResourceSource.getAll);  //surowce źródło
app.post('/api/resources/addsource', ResourceSource.insertData);
app.post('/api/resources/sourceUploadFile', ResourceSource.upload);

app.get('/api/resources/getallunit',ResourceUnit.getAll);  //surowce źródło

app.get('/api/modules/getall',Modules.getAll);  //moduły get all
app.get('/api/modules/formSelect',Modules.getVegResFormSelect); // fetch data (vegetables and resources for form)
app.delete('/api/modules',Modules.deleteById); // delete
app.post('/api/modules',Modules.insertData); // insert
app.put('/api/modules',Modules.editById); // edit



app.get('/api/stages/getall',Stages.getAll);  //stages get all
app.delete('/api/stages',Stages.deleteData);  //stages delete
app.post('/api/stages',Stages.insertData); //stages insert
app.post('/api/stages/modules',Stages.insertModule); // insert
app.get('/api/stages/byVegetable', Stages.getByVegetable);
app.get('/api/modules/byVegetable', Modules.getModuleByVegetableId);



app.get('/api/lines/getall',Lines.getAll);  //linie get all
app.post('/api/lines',Lines.insertData);  //linie insert
app.delete('/api/lines',Lines.deleteData);  //linie delete
app.put('/api/lines',Lines.insertStage);  //linie delete





app.listen(3000);
