import Validator, { ValidationSchema } from "fastest-validator";
import { doc, GeoPoint, Timestamp } from "firebase/firestore";
import "react-native-get-random-values";
import Model from "./model";
import { categoryArray } from "../../../src/common/categories";
const v = new Validator();
const opt = { optional: true };
const updateV = new Validator({ defaults: { string: opt, boolean: opt, number: opt, enum: opt, object: opt, array: opt, url: opt } });

/** @type {ValidationSchema} */
const EventSchema = {
  title: "string|empty:false|trim|min:1|max:100",
  description: "string|empty:false|trim|min:1|max:1000",
  fee: "number|min:0|max:10000000",
  isPublic: "boolean",
  category: {
    type: "enum",
    values: categoryArray.slice(1),
  },
  start: {
    type: "object",
    strict: "remove",
    minProps: 2,
    props: { date: "date", time: "date" },
  },
  end: {
    type: "object",
    strict: "remove",
    minProps: 2,
    props: { date: "date", time: "date" },
  },
  publishDate: {
    type: "object",
    strict: "remove",
    minProps: 2,
    props: { date: "date", time: "date" },
  },
  location: {
    type: "object",
    strict: "remove",
    minProps: 2,
    props: { lat: "number", long: "number" },
  },
  attachments: {
    type: "array",
    empty: false,
    unique: true,
    min: 1,
    items: "string|empty:false|trim|min:1",
  },
  payment_id: "string|empty:false|trim|min:1|max:100",
  payment_status: "string|empty:false|trim|min:1|max:100",
  payment_price: "number|min:0|max:10000000",
  $$strict: "remove",
};

/** @type {ValidationSchema} */
const RelationSchema = {
  userUUID: "string|empty:false|trim|min:10|max:100",
  eventUUID: "string|empty:false|trim|min:10|max:100",
  $$strict: "remove",
};

const check = v.compile(EventSchema);
const updateCheck = updateV.compile(EventSchema);
const relationCheck = v.compile(RelationSchema);

class Event extends Model {
  constructor() {
    super("event");
  }

  /** @private */
  __mergeDateAndTime = super.__mergeDateAndTime;

  /** @private */
  async __eventToFirebase(event, eventUUID) {
    if (event.location) event.location = new GeoPoint(event.location.lat, event.location.long);
    if (event.start) event.start = this.__mergeDateAndTime(event.start.date, event.start.time);
    if (event.end) event.end = this.__mergeDateAndTime(event.end.date, event.end.time);
    if (event.publishDate) event.publishDate = this.__mergeDateAndTime(event.publishDate.date, event.publishDate.time);
    if (event.attachments) event.attachments = await this.__upload(event.attachments, eventUUID);
    return event;
  }

  /** @private */
  __parseFetchedEvent(event) {
    if (event.start) event.start = new Timestamp(event.start.seconds, event.start.nanoseconds).toDate();
    if (event.end) event.end = new Timestamp(event.end.seconds, event.end.nanoseconds).toDate();
    if (event.publishDate) event.publishDate = new Timestamp(event.publishDate.seconds, event.publishDate.nanoseconds).toDate();
    return event;
  }

  /**
   * Upload images/videos.
   *
   * @param {string[]} uriFiles
   * @returns {Promise<*>}
   * @private
   */
  async __upload(uriFiles, userUUID) {
    const uploadFileAndGetURL = uriFiles.map((uri) => super.__upload(uri, userUUID));

    return await Promise.all(uploadFileAndGetURL);
  }

  /**
   * Create a new `event` on database.
   *
   * @param {*} event
   * @returns {Promise<*>}
   */
  create(event = {}) {
    return new Promise(async (resolve, reject) => {
      const result = check(event);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (errors) throw new Error(result);

        const eventRef = doc(super.__collection);

        await super.create(await this.__eventToFirebase(event, eventRef.id), eventRef);
        resolve();
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }

  /**
   * Update an `event` on database.
   * Specify the `id` of the `event` to update.
   *
   * @param {string} id
   * @param {*} event
   */
  update(id, event = {}) {
    return new Promise(async (resolve, reject) => {
      const result = updateCheck(event);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (typeof id !== "string") throw new Error("Invalid id!");
        if (errors) throw new Error(result);

        await super.update(id, await this.__eventToFirebase(event, id));
        resolve();
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }

  /**
   * Find an `event` on database.
   * Specify the `id` of the `event` to find it.
   *
   * @param {string} id
   * @returns {Promise<*>}
   */
  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof id !== "string") throw new Error("Invalid id!");

        const event = await super.findById(id, this.__parseFetchedEvent);
        resolve(event);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Find an `event` on database.
   *
   * @param {QueryConstraint[]} where
   * @returns {Promise<*>}
   */
  find(...where) {
    return new Promise(async (resolve, reject) => {
      try {
        const event = await super.find(where, this.__parseFetchedEvent);
        resolve(event);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Fetch all `events` from database.
   *
   * @returns {Promise<*>}
   */
  findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const event = await super.findAll(this.__parseFetchedEvent);
        resolve(event);
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

        relationData.id = relationData.eventUUID;

        await super.addRelation(modelName, relationName, relationData);
        resolve();
      } catch (e) {
        if (errors) console.log("Invalid data!\nErrors:", result);
        reject(e);
      }
    });
  }
}

export default new Event();
