import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  car: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Car",
  },
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  exitAttempts: {
    type: Number,
    default: 0,
  },
  lastExit: Date,
});

cardSchema.path("cardId").validate(async (value) => {
  const cardsCount = await mongoose.models.Card.countDocuments({
    cardId: value,
  });
  return !cardsCount;
}, "Card already exist!");

let CardModel = mongoose.model("Card", cardSchema);

export { CardModel };
