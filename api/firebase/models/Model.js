import { addDoc, collection, updateDoc, doc, getDoc, getDocs, serverTimestamp, Timestamp, QueryDocumentSnapshot, query, deleteDoc } from "firebase/firestore";
import moment from "moment";
import db from "../config";

class Model {
  /** @private */
  __collection;

  /**
   * @type {string}
   * @private
   */
  collectionName;

  constructor(collectionName) {
    this.collectionName = collectionName.toLowerCase().concat("s");
    this.__collection = collection(db, this.collectionName);
  }

  /**
   * @param {Date} date
   * @param {Date} time
   * @returns {Date}
   */
  __mergeDateAndTime(date, time) {
    return moment(date).set({ hour: time.getHours(), minute: time.getMinutes(), second: 0, millisecond: 0 }).toDate();
  }

  /**
   * @param {QueryDocumentSnapshot<any>} data
   * @returns {*}
   * @private
   */
  __parseFetchedData(data) {
    const parsedData = data.data({ serverTimestamps: "estimate" });
    parsedData.id = data.id;
    parsedData.createdAt = new Timestamp(parsedData.createdAt.seconds, parsedData.createdAt.nanoseconds).toDate();
    parsedData.updatedAt = new Timestamp(parsedData.updatedAt.seconds, parsedData.updatedAt.nanoseconds).toDate();
    return parsedData;
  }

  /**
   * @param {*} data
   * @returns {Promise<*>}
   */
  async create(data) {
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    return addDoc(this.__collection, data);
  }

  /**
   * @param {string} id
   * @param {*} data
   * @returns {Promise<*>}
   */
  async update(id, data) {
    data.updatedAt = serverTimestamp();
    return updateDoc(doc(db, this.collectionName, id), data);
  }

  /**
   * @param {string} id
   * @param {(data) => any} additionalMap
   * @returns {Promise<*>}
   */
  async findById(id, additionalMap) {
    return getDoc(doc(db, this.collectionName, id)).then((data) => {
      const parsedData = this.__parseFetchedData(data);
      return typeof additionalMap === "function" ? additionalMap(parsedData) : parsedData;
    });
  }

  /**
   * @param {QueryConstraint[]} where
   * @param {(data) => any} additionalMap
   * @returns {Promise<*>}
   */
  async find(where, additionalMap) {
    if (!Array.isArray(where)) return null;

    const q = query(this.__collection, ...where);
    return getDocs(q).then(({ docs }) =>
      docs.map((data) => {
        const parsedData = this.__parseFetchedData(data);
        return typeof additionalMap === "function" ? additionalMap(parsedData) : parsedData;
      })
    );
  }

  /**
   * @param {(data) => any} additionalMap
   * @returns {Promise<*>}
   */
  async findAll(additionalMap) {
    return getDocs(this.__collection).then(({ docs }) =>
      docs.map((data) => {
        const parsedData = this.__parseFetchedData(data);
        return typeof additionalMap === "function" ? additionalMap(parsedData) : parsedData;
      })
    );
  }

  /**
   * @param {string} id
   * @returns {Promise<*>}
   */
  async delete(id) {
    return deleteDoc(doc(db, this.collectionName, id));
  }
}

export default Model;
