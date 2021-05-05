const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {//linea copiada, sustituimos el string
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true  //esta la añadimos nosotros
        });//retorna promesa
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
}

module.exports={dbConnection};