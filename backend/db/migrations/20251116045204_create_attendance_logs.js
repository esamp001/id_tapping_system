/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("attendance_logs", (table) => {
    table.increments("id").primary(); // primary key
    table
      .integer("user_id")
      .unsigned()
      .notNullable() // foreign key to users
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("log_date").notNullable(); // the date of attendance
    table.time("time_in_morning"); // morning time in
    table.time("time_out_lunch"); // lunch time out
    table.time("time_in_afternoon"); // afternoon time in
    table.time("time_out_evening"); // end of day time out
    table.timestamps(true, true); // created_at & updated_at
    table.unique(["user_id", "log_date"]); // only one log per user per day
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("attendance_logs");
};
