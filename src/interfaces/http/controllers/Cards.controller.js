import { ParkingManagement } from "domain/aggregates";
import BaseController from "./BaseController";

class CardsController extends BaseController {
  constructor() {
    super(ParkingManagement);
  }

  async exitEvent(req, res, next) {}
}

export default new CardsController();
