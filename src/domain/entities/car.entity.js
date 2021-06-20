import mongoose from "mongoose";

const carSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    require: true,
  },
});

carSchema.path("plateNumber").validate(async (value) => {
  const carsCount = await mongoose.models.Car.countDocuments({
    plateNumber: value,
  });
  return !carsCount;
}, "Car already exist!");

let CarModel = mongoose.model("Car", adminSchema);

export { CarModel };
