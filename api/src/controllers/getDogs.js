require("dotenv").config();
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`;
const axios = require("axios");
const { Dog } = require("../db");

const getDogs = async (req, res) => {
  const respuesta = [];
  try {
    const response = await axios.get(`${URL}`);
    if (response.data) {
      response.data.forEach((perro) => {
        respuesta.push({ ...perro, origen: "API" });
      });
    }
    const dbDogs = await Dog.findAll();
    if (dbDogs.length > 0) {
      dbDogs.forEach((perro) => {
        respuesta.push({ ...perro.dataValues, origen: "DB" });
      });
    }
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDogs;
