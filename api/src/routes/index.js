const { Router } = require('express');
const axios = require("axios");
const Dog = require('../models/Dog');
const { dog , Temperament} = require ('../db')
const {
    API_KEY,
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInf = async()=>{
 const apiUrl= await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
 const apiInfo = await apiUrl.data.map(el => {
    return {
        id:el.id,
        name: el.name,
        height:el.height.map(el => el),
        weight:el.weight.map(el => el),
        life_span:el.life_span,
        temperament: el.temperament
    }
 })
 return apiInfo
}

const getDBinfo = async() => {
    return await dog.findAll({
        include:{
            model: Temperament,
            atributes: ['name'],
            through: {
                atributes: [],
            },
        }
    })
}

const getAllDogs = async() => {
    const apiInfo = await getApiInf();
    const dbInfo = await getDBinfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo
};

router.get('/dogs', async (req, res)=>{
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if(name){
        let dogName = await allDogs.filter(data => data.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length? 
        res.status(200).send(dogName):
        res.status(400).send('the dog does not exist')
    } else {
        res.status(200).send(getAllDogs)
    }


})

module.exports = router;
