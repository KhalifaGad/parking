import { ParkingManagement } from "domain/aggregates";
import { RegisterCarService } from "domain/services";
import BaseController from "./BaseController";

class CarsController extends BaseController {
  constructor() {
    super(ParkingManagement);
  }

  async create(req, res, next) {
    try {
      const { err, data } = await new RegisterCarService(req.body).exec();
      if (err) return next(err);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default new CarsController();
