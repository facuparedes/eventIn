import Validator, { ValidationSchema } from "fastest-validator";
import { doc } from "firebase/firestore";
import "react-native-get-random-values";
import Model from "./model";
const v = new Validator();
const opt = { optional: true };
const updateV = new Validator({ defaults: { uuid: opt, string: opt, boolean: opt, number: opt, enum: opt, object: opt, array: opt, url: opt } });

/** @type {ValidationSchema} */
const UserSchema = {
  uuid: "string|empty:false|trim|min:10|max:100",
  name: "string|empty:false|trim|min:1|max:100|optional",
  lastname: "string|empty:false|trim|min:1|max:100|optional",
  years: "number|min:0|max:100|optional",
  phone: "string|min:6|max:20|optional",
  photo: "string|empty:false|trim|min:1|max:1000|optional",
  $$strict: "remove",
};

/** @type {ValidationSchema} */
const RelationSchema = {
  userUUID: "string|empty:false|trim|min:10|max:100",
  eventUUID: "string|empty:false|trim|min:10|max:100",
  $$strict: "remove",
};

const check = v.compile(UserSchema);
const updateCheck = updateV.compile(UserSchema);
const relationCheck = v.compile(RelationSchema);

class User extends Model {
  constructor() {
    super("user");
  }

  /** @private */
  __mergeDateAndTime = super.__mergeDateAndTime;

  /**
   * Upload photo.
   *
   * @param {string} uriFile
   * @param {string} userUUID
   * @returns {Promise<*>}
   * @private
   */
  async __upload(uriFile, userUUID) {
    return super.__upload(uriFile, userUUID);
  }

  /**
   * Create a new `user` on database.
   *
   * @param {*} user
   * @returns {Promise<*>}
   */
  create(user = {}) {
    return new Promise(async (resolve, reject) => {
      const result = check(user);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (errors) throw new Error(result);

        let userRef;
        if (user.photo) user.photo = await this.__upload(user.photo, user.UUID);
        if (user.uuid) userRef = doc(super.__getDB(), super.__getCollectionName(), user.uuid);

        await super.create(user, userRef);
        resolve(userRef?.id);
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }

  /**
   * Update an `user` on database.
   * Specify the `id` of the `user` to update.
   *
   * @param {string} id
   * @param {*} user
   */
  update(id, user = {}) {
    return new Promise(async (resolve, reject) => {
      const result = updateCheck(user);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (typeof id !== "string") throw new Error("Invalid id!");
        if (errors) throw new Error(result);

        await super.update(id, user);
        resolve();
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }

  /**
   * Find an `user` on database.
   * Specify the `id` of the `user` to find it.
   *
   * @param {string} id
   * @returns {Promise<*>}
   */
  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof id !== "string") throw new Error("Invalid id!");

        const user = await super.findById(id);
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Find an `user` on database.
   *
   * @param {QueryConstraint[]} where
   * @returns {Promise<*>}
   */
  find(...where) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await super.find(where);
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Fetch all `users` from database.
   *
   * @returns {Promise<*>}
   */
  findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await super.findAll();
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }

  addRelation(modelName, relationName, relationData = {}) {
    return new Promise(async (resolve, reject) => {
      const result = relationCheck(relationData);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (errors) throw new Error(result);

        relationData.id = relationData.userUUID;

        await super.addRelation(modelName, relationName, relationData);
        resolve();
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }
}

export default new User();
