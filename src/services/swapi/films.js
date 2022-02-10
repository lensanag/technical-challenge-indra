var http = require("../../utils/http");
var entryPoint = "films";

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
  title: "título",
  episode_id: "id_de_episodio",
  opening_crawl: "texto_de_apertura",
  director: "director",
  producer: "productor",
  release_date: "fecha_de_estreno",
  species: "especies",
  starships: "naves",
  vehicles: "vehículos",
  characters: "personajes",
  planets: "planetas",
  url: "url",
  created: "creado",
  edited: "editado",
};
