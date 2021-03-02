import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Client from '../models/Client';
import ClientView from '../views/ClientView';

import validate from '../validations/ClientValidation';
import validateLogin from '../validations/ClientLoginValidation';
import deleteImage from '../utils/deleteImage';

export default class ClientController {
  static async login(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { email, password } = req.body;

      await validateLogin({ email, password });

      const client = await repository.findOne({ where: { email } });

      if (!client || !(await client.passwordIsValid(password))) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }

      const { id, name } = client;

      const secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';

      const token = jwt.sign({ id, name, email }, secret, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });

      return res.json({ token, client });
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

      const client = await repository.findOne(id);

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
}
