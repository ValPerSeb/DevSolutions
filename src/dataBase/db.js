const { Sequelize } = require('sequelize'); //Acá se importa swequelice
requiere('dotenv').config(); //Acá se importa dotenv para leer las variables de entorno

const sequelize = new Sequelize( 
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASS,

    {
        host: process.env.BD_HOST,
        dialect: process.env.BD_DIALECT,
    }
);


sequelize.authenticate()
    .then(() => {
        console.log('Se logro la conexión bro :3');
    })
    .catch(error => console.error('No se pudo conectar bro :c', error));

module.exports = sequelize; //se exporta la variable sequelize para usarla en otros archivos


