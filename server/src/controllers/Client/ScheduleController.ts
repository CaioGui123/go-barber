import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Schedule from '../../models/Schedule';
import ScheduleView from '../../views/ScheduleView';
import ScheduleValidate from '../../validations/ScheduleValidation';

export default class ClientController {
  static async getPendings(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { id } = req.params;

      const schedules = await repository.find({
        relations: ['barber'],
        where: {
          client_id: id,
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
        where: { client_id: id },
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
      const { clientId, scheduleId } = req.params;

      const schedule = await repository.findOne(scheduleId, {
        relations: ['barber'],
        where: { client_id: clientId },
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

  static async store(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { id } = req.params;
      const data = {
        ...req.body,
        client_id: id,
      };

      await ScheduleValidate(data);

      const schedule = repository.create(data);

      await repository.save(schedule);

      return res.status(201).json(schedule);
    } catch (errors) {
      return res.status(422).json({ message: 'Erros de Validação', errors });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { clientId, scheduleId } = req.params;

      const schedule = await repository.findOne(scheduleId, {
        where: { client_id: clientId },
      });

      if (!schedule) {
        return res.status(400).json({
          message: `Agendamento #${scheduleId} não encontrado`,
        });
      }

      await repository.delete(scheduleId);

      return res.json({ message: 'Agendamento removido com sucesso!' });
    } catch (errors) {
      return res.status(201).json({ message: 'Erro ao remover o agendamento' });
    }
  }
}
