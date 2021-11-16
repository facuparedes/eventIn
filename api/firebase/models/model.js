import { addDoc, collection, updateDoc, doc, getDoc, getDocs, serverTimestamp, Timestamp, QueryDocumentSnapshot, query, deleteDoc, setDoc, DocumentReference } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../config";

class Model {
  /** @private */
  __collection;

  /**
   * @type {string}
   * @private
   */
  collectionName;

  /** @private */
  pendingRelations = [];

  constructor(collectionName) {
    this.collectionName = collectionName.toLowerCase().concat("s");
    this.__collection = collection(db, this.collectionName);
  }

  /** @private */
  __getCollectionName() {
    return this.collectionName;
  }

  /** @private */
  __getCollection() {
    return this.__collection;
  }

  /** @private */
  __getDB() {
    return db;
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
    if (parsedData) {
      parsedData.id = data.id;
      parsedData.createdAt = new Timestamp(parsedData.createdAt.seconds, parsedData.createdAt.nanoseconds).toDate();
      parsedData.updatedAt = new Timestamp(parsedData.updatedAt.seconds, parsedData.updatedAt.nanoseconds).toDate();
    }
    return parsedData;
  }

  /**
   * Upload files.
   *
   * @param {string} uriFile
   * @param {string} folderUUID
   * @param {string?} additionalPath
   * @returns {Promise<*>}
   */
  async __upload(uriFile, folderUUID, additionalPath = "") {
    const fileRef = ref(getStorage(), `${this.collectionName}/${folderUUID}/${additionalPath ? `${additionalPath}/${uuidv4()}` : uuidv4()}`);

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = (e) => reject(e);
      xhr.responseType = "blob";
      xhr.open("GET", uriFile, true);
      xhr.send(null);
    })
      .then((blob) => uploadBytes(fileRef, blob).then(() => blob.close()))
      .then(() => getDownloadURL(fileRef));
  }

  /**
   * @param {*} data
   * @param {DocumentReference?} customDoc
   * @returns {Promise<*>}
   */
  async create(data, customDoc) {
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    return !customDoc ? addDoc(this.__collection, data) : setDoc(customDoc, data);
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
    const getPromise = getDoc(doc(db, this.collectionName, id)).then((data) => {
      const parsedData = this.__parseFetchedData(data);
      return typeof additionalMap === "function" && parsedData ? additionalMap(parsedData) : parsedData;
    });

    const relations = this.pendingRelations.map(({ get }) => get);

    return Promise.all(relations.concat(getPromise)).then((allData) => {
      const mainData = allData.pop();

      allData = allData.map(({ docs }) => docs.map(this.__parseFetchedData));
      allData.forEach((relation, i) => (mainData[this.pendingRelations[i].relationName] = relation));

      this.pendingRelations = [];

      return mainData;
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
        return typeof additionalMap === "function" && parsedData ? additionalMap(parsedData) : parsedData;
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
        return typeof additionalMap === "function" && parsedData ? additionalMap(parsedData) : parsedData;
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

  addRelation(modelName, relationName, data) {
    const collectionName = `relation-${this.collectionName}-${modelName}`;
    const id = data.id;

    delete data.id;
    data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();

    return addDoc(collection(db, collectionName, id, relationName), data);
  }

  deleteRelation(modelName, relationName, mainID, relationID) {
    const collectionName = `relation-${this.collectionName}-${modelName}`;
    return deleteDoc(doc(db, collectionName, mainID, relationName, relationID));
  }

  include(modelName, relationName, mainID) {
    const collectionName = `relation-${this.collectionName}-${modelName}`;
    this.pendingRelations.push({ get: getDocs(collection(db, collectionName, mainID, relationName)), relationName: `${modelName}-${relationName}` });
    return { include: this.include, find: () => this.findById(mainID) };
  }
}

export default Model;
