const { Sequelize } = require('sequelize'); //Acá se importa sequelize.
requiere('dotenv').config(); //Acá se importa dotenv para leer las variables de entorno.

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_SERVER,
        dialect: process.env.DB_DIALECT,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a base de datos exitosa');
    })
    .catch(e => console.error('Error al conectar con la base de datos', e));

module.exports = sequelize; //Se exporta la variable sequelize para usarla en otros archivos.