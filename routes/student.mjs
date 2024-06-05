import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrolled: {
    type: Boolean,
    required: true,
  },
  // Other validation options like min, max, enum, etc.
  // are available for their appropriate data types.
  // You can also set a message to display when validation
  // fails due to these criteria.
  year: {
    type: Number,
    min: 1995,
    message: "The year must be greater than 1995.",
    required: true,
  },
  avg: {
    type: Number,
    required: false,
  },
  // Mongoose supports templating through the use of
  // {VALUE}, which will output the value that is
  // currently being validated (and failing).
  campus: {
    type: String,
    enum: [
      "Remote",
      "Boston",
      "New York",
      "Denver",
      "Los Angeles",
      "Seattle",
      "Dallas",
    ],
    message: "{VALUE} is not a valid campus location.",
    default: "Remote",
    required: true,
  },
});

studentSchema.index({ name: 1 });
studentSchema.index({ year: 1 });
studentSchema.index({ avg: 1 });
studentSchema.index({ campus: 1 });

studentSchema.methods.getPeers = function (cb) {
  return mongoose
    .model("Learner")
    .find({ campus: this.campus, year: this.year }, cb);
};

studentSchema.statics.findPassing = function () {
  return this.find({ avg: { $gte: 70 } });
};
studentSchema.statics.findByCampus = function (campus) {
  return this.find({ campus });
};


studentSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};


studentSchema.virtual("passing").get(function () {
  return this.avg >= 70;
});


export default mongoose.model("Student", studentSchema);