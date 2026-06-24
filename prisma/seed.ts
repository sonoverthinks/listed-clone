import { seedAll } from "../lib/seeder";

seedAll()
  .then((results) => {
    console.log("Seeding complete:", results);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
