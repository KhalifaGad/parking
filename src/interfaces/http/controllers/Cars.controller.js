import { ParkingManagement } from "domain/aggregates";
import BaseController from "./BaseController";

class CarsController extends BaseController {
  constructor() {
    super(ParkingManagement);
  }

  async create(req, res, next) {}
}

export default new CarsController();
