exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "Desert Eagle",
          description:
            "As expensive as it is powerful, the Desert Eagle is an iconic pistol that is difficult to master but surprisingly accurate at long range.",
          inventory: 6,
          price: 650.0
        },
        {
          title: "Glock-18",
          description:
            "The Glock 18 is a serviceable first-round pistol that works best against unarmored opponents and is capable of firing three-round bursts.",
          inventory: 6,
          price: 400.0
        },
        {
          title: "P250",
          description:
            "A low-recoil firearm with a high rate of fire, the P250 is a relatively inexpensive choice against armored opponents.",
          inventory: 6,
          price: 300.0
        }
      ]);
    });
};
