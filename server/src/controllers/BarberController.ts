import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Barber from '../models/Barber';
import BarberView from '../views/BarberView';

import validate from '../validations/BarberValidation';
import deleteImage from '../utils/deleteImage';

export default class ClientController {
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

  static async store(req: Request, res: Response) {
    try {
      const repository = getRepository(Barber);
      const data = req.body;

      await validate(data);

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

      await validate(data);

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
}
