import { EmployeeManagement } from "domain/aggregates";
import BaseController from "./BaseController";

class EmployeesController extends BaseController {
  constructor() {
    super(EmployeeManagement);
  }
}

export default new EmployeesController();
