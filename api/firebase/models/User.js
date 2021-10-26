import Model from "./model";

class User extends Model {
  name;
  username;
  password;
  role;
  location = { lat: 0, lng: 0 };
  birthDate;

  static async create({ name, username, password, role, location, birthDate }) {
    /**
     * Validation example.
     * Can change in a future.
     */
    if (!name || !username || !password || !role || !location || !birthDate) throw new Error("Missing required fields");
    super.create({ name, username, password, role, location, birthDate });
  }
}

User.create();
