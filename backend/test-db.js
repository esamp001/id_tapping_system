// test-db.js
require('dotenv').config();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
});

(async () => {
    try {
        const result = await db.raw('SELECT NOW()');
        console.log('✅ Database connected successfully!');
        console.log('🕒 Current time from DB:', result.rows[0].now);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    } finally {
        await db.destroy(); // close connection pool
    }
})();
