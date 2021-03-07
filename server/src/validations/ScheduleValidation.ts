import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';
import { ValidationError } from 'yup';
import Schedule from '../models/Schedule';

Yup.setLocale(ptForm);

const schema = Yup.object().shape({
  barber_id: Yup.number().required(),
  client_id: Yup.number().required(),
  scheduled_to: Yup.date().required(),
  price: Yup.number().required(),
});

interface IValidationErrors {
  [key: string]: string[];
}

export default async function ScheduleValidation(data: Schedule) {
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
