const mongoose = require('mongoose');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {

    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://brayanpalacio_db_user:hkIfm9FQKLSNU5rS@cluster0.qw3xtx7.mongodb.net/?appName=Cluster0';

    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;