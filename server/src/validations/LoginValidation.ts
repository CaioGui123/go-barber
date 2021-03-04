import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { ValidationError } from 'yup';

Yup.setLocale(ptForm);

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

interface IValidationErrors {
  [key: string]: string[];
}

interface ICredentials {
  email: string;
  password: string;
}

export default async function LoginValidation(data: ICredentials) {
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
