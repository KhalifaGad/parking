import { EmployeeRepo } from "../repositories";

class EmployeeManagement {
  constructor() {
    this.employeeRepo = EmployeeRepo;
    this.create = this.create.bind(this);
  }

  async create(data) {
    try {
      const user = await this.employeeRepo.create(data, { leaned: true });
      return { data: user };
    } catch (err) {
      return { err };
    }
  }

  async isEmployeeExist(employeeId) {
    try {
      const usersCount = this.employeeRepo.count({ _id: employeeId });
      return { data: !!usersCount };
    } catch (err) {
      return { err };
    }
  }
}

export default new EmployeeManagement();
