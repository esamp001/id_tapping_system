require("dotenv").config();

console.log("🧩 Loaded environment variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  // development: {
  //   client: "pg",
  //   connection: {
  //     connectionString: process.env.DATABASE_URL,
  //     ssl: { rejectUnauthorized: false }, // needed for Render
  //   },
  //   migrations: { directory: "./db/migrations" },
  //   seeds: { directory: "./db/seeds" },
  // },

  // production: {
  //   client: "pg",
  //   connection: process.env.DATABASE_URL,
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     directory: "./db/migrations",
  //   },
  //   ssl: {
  //     rejectUnauthorized: false, // Required for Render's SSL
  //   },
  // },

  // production: {
  //   client: "pg",
  //   connection: {
  //     connectionString: process.env.DATABASE_URL,
  //     ssl: { rejectUnauthorized: false },
  //   },
  //   pool: { min: 2, max: 10 },
  //   migrations: { directory: "./db/migrations" },
  // },
};
