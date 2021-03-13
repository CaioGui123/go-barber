import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Schedule from '../../models/Schedule';
import ScheduleView from '../../views/ScheduleView';

export default class ClientController {
  static async getPedings(req: Request, res: Response) {
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

  static async history(req: Request, res: Response) {
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

  static async show(req: Request, res: Response) {
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
