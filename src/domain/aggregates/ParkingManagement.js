import { CarRepo, CardRepo } from "../repositories";
import EmployeeManagement from "./EmployeeManagement";

class ParkingManagement {
  constructor() {
    this.carRepo = CarRepo;
    this.cardRepo = CardRepo;
    this.createCar = this.createCar.bind(this);
  }

  async createCar(data) {
    if (!data.employee) return { err: "Employee is required!." };

    const checkEmployee = await EmployeeManagement.isEmployeeExist(
      data.employee
    );
    if (checkEmployee.err || !checkEmployee.data)
      return { err: checkEmployee.err || "Wrong employee id" };

    try {
      const car = await this.carRepo.create(data, { leaned: true });
      return { data: car };
    } catch (err) {
      return { err };
    }
  }

  async getCar(plateNumber) {
    try {
      const car = await this.carRepo.findOneBy(
        { plateNumber },
        { leaned: true, populateFields: ["employee"] }
      );
      return { data: car };
    } catch (err) {
      return { err };
    }
  }

  async listCars({ brand, model }) {
    let args = {};
    if (brand) args.brand = brand;
    if (model) args.model = model;
    try {
      const cars = await this.carRepo.list(args);
      return { data: cars };
    } catch (err) {
      return { err };
    }
  }

  async createCard(data) {
    try {
      const card = await this.cardRepo.create(data, { leaned: true });
      return { data: card };
    } catch (err) {
      return { err };
    }
  }

  async getCard(cardId) {
    try {
      const card = this.cardRepo.findOneBy(
        { cardId },
        { leaned: true, populateFields: ["car"] }
      );
      return { data: card };
    } catch (err) {
      return { err };
    }
  }
}

export default new ParkingManagement();
