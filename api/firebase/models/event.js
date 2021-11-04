import Validator, { ValidationSchema } from "fastest-validator";
<<<<<<< HEAD
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
=======
import { GeoPoint, Timestamp } from "firebase/firestore";
>>>>>>> 3a32f44643ad5d5890d3b92be88ee7c85335a754
import Model from "./model";
const v = new Validator();
const opt = { optional: true };
const updateV = new Validator({ defaults: { string: opt, boolean: opt, number: opt, enum: opt, object: opt, url: opt } });

/** @type {ValidationSchema} */
const EventSchema = {
  title: "string|empty:false|trim|min:1|max:100",
  description: "string|empty:false|trim|min:1|max:1000",
  fee: "number|min:0|max:10000000",
  isPublic: "boolean",
  category: {
    type: "enum",
    values: ["Bar", "Deportes", "Fiesta", "Musica", "Teatro"],
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
  location: {
    type: "object",
    strict: "remove",
    minProps: 2,
    props: { lat: "number", long: "number" },
  },
  /** TEMPORAL PHOTO */
  photo: "url|empty:false",
  $$strict: "remove",
};

const check = v.compile(EventSchema);
const updateCheck = updateV.compile(EventSchema);

class Event extends Model {
  constructor() {
    super(Event.name);
  }

  /** @private */
  __mergeDateAndTime = super.__mergeDateAndTime;

  /** @private */
  __eventToFirebase(event) {
    if (event.location) event.location = new GeoPoint(event.location.lat, event.location.long);
    if (event.start) event.start = this.__mergeDateAndTime(event.start.date, event.start.time);
    if (event.end) event.end = this.__mergeDateAndTime(event.end.date, event.end.time);
    return event;
  }

  /** @private */
  __parseFetchedEvent(event) {
    event.start = new Timestamp(event.start.seconds, event.start.nanoseconds).toDate();
    event.end = new Timestamp(event.end.seconds, event.end.nanoseconds).toDate();
    return event;
  }

  /**
   * Create a new `event` on database.
   *
   * @param {*} event
   * @returns {Promise<*>}
   */
  create(event) {
    return new Promise(async (resolve, reject) => {
      const result = check(event);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (errors) throw new Error(result);

        await super.create(this.__eventToFirebase(event));
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
  update(id, event) {
    return new Promise(async (resolve, reject) => {
      const result = updateCheck(event);
      const errors = Array.isArray(result) ? result : null;

      try {
        if (typeof id !== "string") throw new Error("Invalid id!");
        if (errors) throw new Error(result);

        await super.update(id, this.__eventToFirebase(event));
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
}

export default new Event();
