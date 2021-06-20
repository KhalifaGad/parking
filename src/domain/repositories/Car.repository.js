import { BaseRepo } from "./BaseRepository";
import { CarModel } from "../entities";

class CarRepo extends BaseRepo {
  constructor() {
    super(CarModel);
  }
}

export default new CarRepo();
