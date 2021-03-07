import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Barber from '../models/Barber';
import Schedule from '../models/Schedule';
import BarberView from '../views/BarberView';
import ScheduleView from '../views/ScheduleView';
import BarberValidation from '../validations/BarberValidation';
import LoginValidation from '../validations/LoginValidation';
import jwt from 'jsonwebtoken';
import deleteImage from '../utils/deleteImage';

export default class ClientController {
  static async login(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const { email, password } = req.body;

      await LoginValidation({ email, password });

      const barber = await repository.findOne({ where: { email } });

      if (!barber || !(await barber.passwordIsValid(password))) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }

      const token = jwt.sign(
        BarberView.render(barber),
        process.env.TOKEN_SECRET || '',
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        },
      );

      return res.json({ token, user: BarberView.render(barber) });
    } catch (errors) {
      return res.status(422).json({
        message: 'Email ou senha incorretos',
        errors,
      });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);

      const barbers = await repository.find({ relations: ['images'] });

      return res.json(BarberView.renderMany(barbers));
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao encontrar os barbeiros',
      });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const { id } = req.params;

      const barber = await repository.findOne(id, {
        relations: ['images'],
      });

      if (!barber) {
        return res.status(400).json({
          message: `Barbeiro #${id} não encontrado`,
        });
      }

      return res.json(BarberView.render(barber));
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao encontrar o barbeiro' });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const data = req.body;

      await BarberValidation(data);

      const barber = repository.create(data);

      await repository.save(barber);

      return res.status(201).json(barber);
    } catch (errors) {
      return res.status(422).json({ message: 'Erros de Validação', errors });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const { id } = req.params;
      const data = req.body;

      const barber = await repository.findOne(id);

      if (!barber) {
        return res.status(400).json({
          message: `Barbeiro #${id} não foi encontrado`,
        });
      }

      await BarberValidation(data);

      await repository.update(id, data);

      return res.status(201).json(barber);
    } catch (errors) {
      return res.status(422).json({ message: 'Erros de Validação', errors });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const { id } = req.params;

      const barber = await repository.findOne(id, {
        relations: ['images'],
      });

      if (!barber) {
        return res.status(400).json({
          message: `Barbeiro #${id} não foi encontrado`,
        });
      }

      barber.images.forEach((image) => {
        deleteImage(image.name);
      });

      await repository.delete(id);

      return res.json({ message: 'Conta deletada com sucesso!' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao deletar a conta' });
    }
  }

  static async showPendingSchedules(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { id } = req.params;

      const schedules = await repository.find({
        relations: ['client'],
        where: {
          barber_id: id,
          is_cutted: false,
        },
      });

      return res.json(ScheduleView.renderMany(schedules));
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Erro ao procurar os agendamentos',
      });
    }
  }

  static async schedulesHistory(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { id } = req.params;

      const schedules = await repository.find({
        relations: ['barber'],
        where: { barber_id: id },
      });

      return res.json(ScheduleView.renderMany(schedules));
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao procurar os agendamentos',
      });
    }
  }

  static async showSchedule(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { barberId, scheduleId } = req.params;

      const schedule = await repository.findOne(scheduleId, {
        relations: ['client'],
        where: { barber_id: barberId },
      });

      if (!schedule) {
        return res.status(400).json({
          message: `Agendamento #${scheduleId} não encontrado`,
        });
      }

      return res.json(ScheduleView.render(schedule));
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao procurar os agendamentos',
      });
    }
  }

  static async acceptSchedule(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { barberId, scheduleId } = req.params;

      const schedule = repository.findOne(scheduleId, {
        where: { barber_id: barberId },
      });

      if (!schedule) {
        return res.status(400).json({
          message: `Agendamento #${scheduleId} não encontrado`,
        });
      }

      await repository.update(scheduleId, { is_accepted: true });

      return res.status(201).json({ message: 'Corte confirmado!' });
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao aceitar o agendamento',
      });
    }
  }

  static async dontAcceptSchedule(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { barberId, scheduleId } = req.params;

      const schedule = repository.findOne(scheduleId, {
        where: { barber_id: barberId },
      });

      if (!schedule) {
        return res.status(400).json({
          message: `Agendamento #${scheduleId} não encontrado`,
        });
      }

      await repository.update(scheduleId, { is_accepted: false });

      return res.status(201).json({ message: 'Corte confirmado!' });
    } catch (error) {
      return res.status(400).json({
        message: 'Erro ao aceitar o agendamento',
      });
    }
  }
}
