exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "jbond@mi6.uk.gov", password: "martini" },
        { email: "jasonBourne@cia.us.gov", password: "bourneIdentity" },
        { email: "eHunt@imf.us.secret.gov", password: "iWuvJulia" }
      ]);
    });
};
