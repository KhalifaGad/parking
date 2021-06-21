import { Router } from "express";
import { cardsRouter } from "./cards.router";
import { carsRouter } from "./cars.router";
import { employeesRouter } from "./employees.router";

const router = Router();

router.use("/cars", carsRouter);
router.use("/cards", cardsRouter);
router.use("/employees", employeesRouter);

export { router };
