exports.up = function(knex) {
  return knex.schema.createTable("purchases", table => {});
};

exports.down = function(knex) {};
