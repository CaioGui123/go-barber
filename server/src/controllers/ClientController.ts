import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Client from '../models/Client';
import validate from '../validations/ClientValidation';

export default class ClientController {
  static async index(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);

      const clients = await repository.find();

      return res.json(clients);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao procurar os clientes' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;

      const client = await repository.findOneOrFail(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não encontrado`,
        });
      }

      return res.json(client);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao encontrar o cliente' });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const data = req.body;

      await validate(data);

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

      const client = await repository.findOneOrFail(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não foi encontrado`,
        });
      }

      await validate(data);

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

      const client = await repository.findOneOrFail(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não foi encontrado`,
        });
      }

      await repository.delete(id);

      return res.json({ message: `Conta deletada com sucesso!` });
    } catch (error) {
      return res.status(400).json({ message: 'Error ao deletar a conta' });
    }
  }
}
