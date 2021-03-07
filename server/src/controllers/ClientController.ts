import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Client from '../models/Client';
import Schedule from '../models/Schedule';
import ClientView from '../views/ClientView';
import ClientValidation from '../validations/ClientValidation';
import LoginValidation from '../validations/LoginValidation';
import ScheduleValidate from '../validations/ScheduleValidation';
import jwt from 'jsonwebtoken';
import deleteImage from '../utils/deleteImage';

export default class ClientController {
  static async login(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { email, password } = req.body;

      await LoginValidation({ email, password });

      const client = await repository.findOne({ where: { email } });

      if (!client || !(await client.passwordIsValid(password))) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }

      const token = jwt.sign(
        ClientView.render(client),
        process.env.TOKEN_SECRET || '',
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        },
      );

      return res.json({ token, user: ClientView.render(client) });
    } catch (errors) {
      return res.status(422).json({
        message: 'Email ou senha incorretos',
        errors,
      });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);

      const clients = await repository.find();

      return res.json(ClientView.renderMany(clients));
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao procurar os clientes' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;

      const client = await repository.findOne(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não encontrado`,
        });
      }

      return res.json(ClientView.render(client));
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao encontrar o cliente' });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const data = req.body;

      await ClientValidation(data);

      const client = repository.create(data);

      await repository.save(client);

      return res.status(201).json(client);
    } catch (errors) {
      return res.status(422).json({ message: 'Erros de Validação', errors });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;
      const data = req.body;

      const client = await repository.findOne(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não foi encontrado`,
        });
      }

      await ClientValidation(data);

      await repository.update(id, data);

      return res.status(201).json(client);
    } catch (errors) {
      return res.status(422).json({ message: 'Erros de Validação', errors });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;

      const client = await repository.findOne(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não foi encontrado`,
        });
      }

      if (client.image) {
        deleteImage(client.image);
      }

      await repository.delete(id);

      return res.json({ message: `Conta deletada com sucesso!` });
    } catch (error) {
      return res.status(400).json({ message: 'Error ao deletar a conta' });
    }
  }

  static async showSchedules(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { id } = req.params;

      const schedules = await repository.find({
        relations: ['barber'],
        where: { client_id: id },
      });

      return res.json(schedules);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao procurar os clientes' });
    }
  }

  static async saveSchedule(req: Request, res: Response) {
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

  static async removeSchedule(req: Request, res: Response) {
    try {
      const repository = getRepository(Schedule);
      const { clientId, scheduleId } = req.params;

      const schedule = await repository.findOne({
        where: {
          id: scheduleId,
          client_id: clientId,
        },
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
