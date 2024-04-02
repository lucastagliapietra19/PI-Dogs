require("dotenv").config();
const URL = `https://api.thedogapi.com/v1/breeds/`;
const axios = require("axios");
const { Dog } = require("../db");

const getDogsById = async (req, res) => {
  const ID = req.params.idRaza;
  try {
    const response = await axios.get(`${URL}${ID}`);
    if (response.data) {
      res.status(200).json({ ...response.data, origen: "API" });
    }
  } catch (error) {
    console.log(error);
  }
  const dbDog = await Dog.findByPk(ID);
  if (dbDog) {
    res.status(200).json({ ...dbDog.dataValues, origen: "DB" });
  }
  res.status(404).json({ message: `no se encontraron datos` });
};

module.exports = getDogsById;
