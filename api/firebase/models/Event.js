import Model from "./model";

export default class Event extends Model {
  title;
  description;
  fee;
  date;
  isPublic;
  location = { lat: 0, long: 0 };
  attachments = [];
  attendeesCount;
  createdBy;
  createdAt;
}
