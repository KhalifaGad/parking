import * as yup from "yup";

export const addEmployeeSchema = yup.object().shape({
  name: yup.string().required(),
  position: yup.string().required(),
  birthday: yup.date().required(),
});
