import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Client from '../models/Client';
import Image from '../models/Image';

export default class ClientController {
  static async index(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);

      const clients = await repository.find({ relations: ['image'] });

      return res.json(clients);
    } catch (error) {
      return res.status(400).json({ message: 'Error 400' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;

      const client = await repository.findOne(id, { relations: ['image'] });

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não encontrado`,
        });
      }

      return res.json(client);
    } catch (error) {
      return res.status(400).json({ message: 'Error 400' });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const data = req.body;

      const client = repository.create(data);

      await repository.save(client);

      return res.status(201).json(client);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao cadastrar' });
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

      await repository.update(id, data);

      return res.status(201).json(client);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao cadastrar' });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const imageRepository = getRepository(Image);
      const { id } = req.params;

      const client = await repository.findOne(id, { relations: ['image'] });

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não foi encontrado`,
        });
      }

      if (client.image) {
        await imageRepository.delete(client.image.id);
      }

      await repository.delete(id);

      return res.json({
        message: `O cliente #${id} foi deletado`,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error 400',
      });
    }
  }
}
