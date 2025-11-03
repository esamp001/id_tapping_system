/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();                     // Auto-incrementing ID
        table.string('full_name').notNullable();              // Full Name
        table.string('email_address').notNullable().unique(); // Email Address
        table.string('academic_grade');                       // Academic Grade
        table.string('phone_number');                         // Phone Number
        table.string('role');                                 // Role
        table.string('avatar');                               // Avatar filename
        table.timestamps(true, true);                         // created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
