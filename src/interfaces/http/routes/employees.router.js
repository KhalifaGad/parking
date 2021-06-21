import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validate } from "../middlewares";
import { addEmployeeSchema } from "../validations/employees.validation";
import EmployeesController from "../controllers/Employees.controller";

const employeesRouter = Router();

employeesRouter
  .route("/")
  .post(
    validate(addEmployeeSchema),
    asyncHandler(EmployeesController.create())
  );

export { employeesRouter };
