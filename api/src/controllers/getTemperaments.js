require("dotenv").config();
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`;
const axios = require("axios");
const { Temperaments } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    const response = await axios.get(`${URL}`);
    if (response.data) {
      response.data.forEach(async (perro) => {
        if (perro.temperament != null) {
          perro.temperament.split(",").forEach(async (tmp) => {
            await Temperaments.findOrCreate({
              where: { nombre: tmp.trim() },
            });
          });
        }
      });
    }
    const dbTemperaments = await Temperaments.findAll();
    res.status(200).json(dbTemperaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getTemperaments;
