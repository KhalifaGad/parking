import { ParkingManagement } from "domain/aggregates";
import CarExistService from "domain/services/CarExit.service";
import BaseController from "./BaseController";

class CardsController extends BaseController {
  constructor() {
    super(ParkingManagement);
  }

  async exitEvent(req, res, next) {
    try {
      const { err, data } = await new CarExistService(req.params.cardId).exec();
      if (err) return next(err);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default new CardsController();
