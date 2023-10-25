
import { createPool } from 'mysql2/promise.js'

const db = createPool({
    host: 'protocolmuonline.com',
    user: 'protocolmuonline_tested2000',
    password: 'L8y!#!F}%cuI',
    database: 'protocolmuonline_phones-db'
});

export default db;

