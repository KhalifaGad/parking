import { Router } from "express";
import asyncHandler from "express-async-handler";
import EmployeesController from "../controllers/Employees.controller";

const employeesRouter = Router();

employeesRouter.route("/").post(asyncHandler(EmployeesController.create()));

export { employeesRouter };
