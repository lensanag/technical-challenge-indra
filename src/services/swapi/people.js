var http = require("../../utils/http");
var entryPoint = "people";

var service = async function (id) {
  var path = `${entryPoint}/${id}/`;
  var result = await http.get(path);
  var { data } = result;
  var remaped = Object.getOwnPropertyNames(data).reduce((prev, curr) => {
    prev[map[curr]] = data[curr];
    return prev;
  }, {});
  return Promise.resolve({ data: remaped });
};

module.exports = service;

var map = {
  birth_year: "año_de_nacimiento",
  eye_color: "color_de_ojos",
  films: "peliculas",
  gender: "genero",
  hair_color: "color_de_cabello",
  height: "altura",
  homeworld: "mundo_de_origen",
  mass: "masa",
  name: "nombre",
  skin_color: "color_de_piel",
  created: "creado",
  edited: "editado",
  species: "especies",
  starships: "naves",
  url: "url",
  vehicles: "vehículos",
};
