//representa el servidor y la coneccion

const app = require('./app');
const dovenv = require ('dotenv');
dovenv.config();
const PORT = process.env.PORT || 1433;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});