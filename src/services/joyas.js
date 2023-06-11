const fs = require('fs');

const { obtenerJoyas, filtrarJoyas } = require('../utilities/consultas')


const reportarConsulta = async (req, res, next) => {
  const parametros = req.params
  const url = req.url
  console.log(`
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}
  con los parámetros:
  `, parametros)
  next()
}

async function getJoyas(req, res) {
  params = req.query;
  const joyas = await obtenerJoyas(params)
  return res.json(joyas);
};

async function getJoyasFiltros(req, res) {
  params = req.query;
  const joyas = await filtrarJoyas(params)
  return res.json(joyas);
};

module.exports = {
  getJoyas,
  getJoyasFiltros,
  reportarConsulta
};