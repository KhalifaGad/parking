const { ParkingManagement } = require("domain/aggregates");
import { customAlphabet } from "nanoid/async";

const nanoid = customAlphabet("0123456789", 6);

class RegisterCarService {
  constructor(carData) {
    this.carData = carData;
  }

  async exec() {
    const car = await ParkingManagement.createCar(this.carData);
    if (car.err) return car;

    const cardId = await nanoid();
    const cardData = { cardId, credit: 10, car: car.data._id };
    const card = await ParkingManagement.createCard(cardData);
    if (card.err) {
      await ParkingManagement.deleteCar(car.data._id);
      return card;
    }
    return { data: { card: card.data, car: car.data } };
  }
}

export default RegisterCarService;
