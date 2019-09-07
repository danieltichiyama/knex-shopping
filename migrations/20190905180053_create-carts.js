exports.up = function(knex) {
  return knex.schema.createTable("carts", table => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
    table
      .integer("products_id")
      .unsigned()
      .references("id")
      .inTable("products");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
