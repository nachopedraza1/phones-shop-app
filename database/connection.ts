
import mysql, { Connection } from 'mysql'

const dbConfig = {
    host: 'protocolmuonline.com',
    user: 'protocolmuonline_tested2000',
    password: 'L8y!#!F}%cuI',
    database: 'protocolmuonline_phones-db'
}

let connection: Connection | null;

export const connect = async () => {
    if (connection) {
        console.log('Ya existe una connecion activa');
        return connection;
    }

    connection = mysql.createConnection(dbConfig);

    console.log('Conexión a MySQL establecida.');
    return connection;
}

export const disconnect = async () => {
    if (connection) {
        await connection.end();
        connection = null
        console.log('Conexión a MySQL cerrada.');
    }
}
