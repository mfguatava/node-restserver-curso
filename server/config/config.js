


//
//      Puerto
//
process.env.PORT = process.env.PORT || 3000;


//
//      Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//
//      Base de Datos
//
let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://10.211.55.11:27017/cafe';
}else{
    urlDB = 'mongodb+srv://admin123:c8pH9AUeJmw5QCid@cluster0-tvt62.mongodb.net/cafe';
}
//urlDB = 'mongodb+srv://admin123:c8pH9AUeJmw5QCid@cluster0-tvt62.mongodb.net/cafe';


process.env.URLDB = urlDB;