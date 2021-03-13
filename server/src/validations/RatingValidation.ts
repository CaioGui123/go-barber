import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { ValidationError } from 'yup';
import Rating from '../models/Rating';

Yup.setLocale(ptForm);

const schema = Yup.object().shape({
  body: Yup.string().required(),
  stars: Yup.number().max(5).min(0.5).required(),
  barber_id: Yup.number().required(),
  client_id: Yup.number().required(),
});

interface IValidationErrors {
  [key: string]: string[];
}

export default async function RatingValidation(data: Rating) {
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
