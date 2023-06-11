const { Pool } = require('pg');
const format = require('pg-format');
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});


const obtenerJoyas = async ({ limits = 2, page = 1, order_by = "id_ASC" }) => {
    try {
        const offset = (page - 1) * limits;
        const [campo, direccion] = order_by.split("_");
        const query = format(
            'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
            campo,
            direccion,
            limits,
            offset
        );
        console.log(query);
        const { rows } = await pool.query(query);
        return rows;
    } catch {
        console.log("Error en obtenerJoyas");
    }
};

const filtrarJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
        const filtros = []
        if (metal) {
            filtros.push(`metal = '${metal}'`);
        };
        if (categoria) {
            filtros.push(`categoria = '${categoria}'`);
        };
        if (precio_min) {
            filtros.push(`precio >= ${precio_min}`);
        };
        if (precio_max) {
            filtros.push(`precio <= ${precio_max}`);
        };
        let query = 'SELECT * FROM inventario';
        if (filtros.length > 0) {
            query = query + ' WHERE ' + filtros.join(' AND ');
        }
        const { rows } = await pool.query(query);
        return rows;

    } catch {
        console.log("Error en obtenerJoyas");
    }
};

module.exports = { obtenerJoyas, filtrarJoyas }