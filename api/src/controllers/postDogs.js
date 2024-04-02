const { Dog } = require("../db");

const postDogs = async (req, res) => {
  const { imagen, nombre, peso, altura, anios, temperaments } = req.body;
  console.log(req.body);
  if (
    !imagen ||
    !nombre ||
    !peso ||
    !altura ||
    !anios ||
    !temperaments ||
    nombre.length === 0 ||
    imagen.length === 0 ||
    altura.length === 0 ||
    anios.length === 0 ||
    temperaments.length === 0 ||
    peso.length === 0
  ) {
    res.status(400).send("Faltan datos");
  } else {
    try {
      const newDog = await Dog.findOrCreate({
        where: { nombre, altura, peso, imagen, anios },
      });
      return res.status(200).json(newDog);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = postDogs;
