import mongoose from "mongoose";
import { CardRepo } from "../repositories";

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

carSchema.pre("remove", async function (next) {
  const card = await CardRepo.findOneBy({ car: this._id });
  if (card) {
    return CardRepo.delete(card._id);
  }
  next();
});

carSchema.pre("deleteOne", { document: true, query: false }, async function (
  next
) {
  const card = await CardRepo.findOneBy({ car: this._id });
  if (card) {
    return CardRepo.delete(card._id);
  }
  next();
});

const CarModel = mongoose.model("Car", adminSchema);

export { CarModel };
