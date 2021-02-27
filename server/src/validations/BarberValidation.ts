import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { ValidationError } from 'yup';
import Barber from '../models/Barber';

Yup.setLocale(ptForm);

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  mobile_phone: Yup.string().required(),
  city: Yup.string().required(),
  neighborhood: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.string().required(),
});

interface IValidationErrors {
  [key: string]: string[];
}

export default async function BarberValidation(data: Barber) {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });

    return Promise.resolve();
  } catch (error) {
    const errors: IValidationErrors = {};

    error.inner.forEach((err: ValidationError) => {
      if (err.path) errors[err.path] = err.errors;
    });

    return Promise.reject(errors);
  }
}
