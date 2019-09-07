exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments(); //creates 'id SERIAL PRIMARY KEY'
    table.string("email").notNullable(); //creates 'username VARCHAR(255) NOT NULL'
    table.string("password").notNullable();
    table.timestamps(true, true);
    //creates 'created_at timestampz NOT NULL DEFAULT now()'
    //creates 'updated_at timestampz NULL DEFAULT now()'
    //first true means timestampz (timestamps with tz)
    //second true sets DEFAULT to now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
