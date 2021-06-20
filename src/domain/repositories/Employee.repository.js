import { BaseRepo } from "./BaseRepository";
import { EmployeeModel } from "../entities";

class EmployeeRepo extends BaseRepo {
  constructor() {
    super(EmployeeModel);
  }
}

export default new EmployeeRepo();
