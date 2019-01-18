import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import moment from "moment";

export const entries = new Mongo.Collection("Entries");

if (Meteor.isServer) {
  Meteor.publish("entries", function() {
    return entries.find({ userId: this.userId });
  });
}
Meteor.methods({
  "entries.insert"(data) {
    let expense = data[0];
    let cost = data[1];
    let category = data[2];
    let userId = data[3];
    let date = moment().format("MMMM Do YYYY");
    let time = new Date();
    let initialMonth = moment()
      .month(time.getMonth())
      .format("MMMM");
    console.log(data);
    if (Meteor.userId()) {
      entries.insert({
        userId: userId,
        expense: expense,
        cost: cost,
        category: category,
        date: date,
        month: initialMonth
      });
    }
  }
});
