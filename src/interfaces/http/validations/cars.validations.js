import * as yup from "yup";

export const editCarSchema = yup.object().shape({
  brand: yup.string(),
  model: yup.string(),
  employee: yup.string(),
});

export const addCarSchema = yup.object().shape({
  brand: yup.string().required(),
  model: yup.string().required(),
  employee: yup.string().required(),
});
