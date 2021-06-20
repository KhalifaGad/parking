import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  position: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
});

let EmployeeModel = mongoose.model("Employee", employeeSchema);

export { EmployeeModel };
