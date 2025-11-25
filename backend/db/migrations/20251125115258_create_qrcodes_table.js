/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("qr_codes", function (table) {
    table.increments("id").primary(); // Auto-increment primary key
    table.string("qr_value").notNullable(); // The generated QR code string
    table
      .timestamp("generated_at") // When the QR code was generated
      .defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("qr_codes");
};
