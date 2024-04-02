require("dotenv").config();
const { Op } = require('sequelize')
const URL = `https://api.thedogapi.com/v1/breeds/search?q=`;
const axios = require("axios");
const { Dog } = require("../db");

const getDogsByName = async (req, res) => {
  const Name = req.query.name;
  const respuesta = [];
  try {
    const response = await axios.get(`${URL}${Name}`);
    if (response.data) {
      response.data.forEach((perro) => {
        respuesta.push({ ...perro, origen: "API" });
      });
    }
  } catch (error) {
    console.log(error);
  }
  const dbDogs = await Dog.findAll({
    where: {
      nombre:{
        [Op.iLike]:`%${Name}%`
      }
    }
  });
  if (dbDogs.length > 0) {
    dbDogs.forEach((perro) => {
      respuesta.push({ ...perro.dataValues, origen: "DB" });
    });
  }
  if (respuesta.length === 0){
    res.status(404).json({message:"Raza no encontrada"})
  }
  res.status(200).json(respuesta);
};

module.exports = getDogsByName;
