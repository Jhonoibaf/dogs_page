const { Router } = require('express');
const axios = require("axios");
const { Dog , Temperament} = require ('../db')
const {
    API_KEY,
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInf = async()=>{
 const { data } = await axios.get( `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
 const apiInfo = await data.map(el => {
    return {
        id:el.id,
        name: el.name,
        height: el.height,
        weight: el.weight,
        life_span:el.life_span,
        temperament: el.temperament
    }
 })
 return apiInfo
}

const getDBinfo = async() => {
    return await Dog.findAll({
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
        res.status(200).send(allDogs)
    }
});

router.get('/dogs/:id', async(req,res)=>{
    const {id} = req.params;
    const dogs = await getAllDogs()
    const dog = dogs.find(el => el.id.toString() === id.toString())
    if (dog){
        res.status(200).send(dog)
    }else {
        res.status(400).send('The dog dont exist')
    }
});

router.get('/temperaments', async (req, res)=> {
    const dogs = await getApiInf();
    const temperaments = dogs.map(el => el.temperament);
    const arrTemp = [];
    for(i of temperaments){
        const newArr = i?.split(', ');
        arrTemp.push(newArr);
    };
    let finalTemps = arrTemp.flat()
    const tempDB = finalTemps.map(el => {
        Temperament.findOrcreate({
            where : { name : el}
        })
    }) 
    console.log(finalTemps);

})

module.exports = router;
