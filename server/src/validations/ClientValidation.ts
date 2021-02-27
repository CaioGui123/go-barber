import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { ValidationError } from 'yup';
import Client from '../models/Client';

Yup.setLocale(ptForm);

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  mobile_phone: Yup.string().required(),
  image: Yup.string(),
});

interface IValidationErrors {
  [key: string]: string[];
}

export default async function ClientValidation(data: Client) {
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
