import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Client from '../../models/Client';

import deleteImage from '../../utils/deleteImage';

export default class ClientController {
  static async store(req: Request, res: Response) {
    try {
      const repository = getRepository(Client);
      const { id } = req.params;

      const client = await repository.findOne(id);

      if (!client) {
        return res.status(400).json({
          message: `Cliente #${id} não encontrado`,
        });
      }

      const [requestImage] = req.files as Express.Multer.File[];

      if (!req.files) {
        return res.status(422).json({ message: 'Nenhuma imagem foi enviada!' });
      }

      const image = { image: requestImage.filename };

      await repository.update(id, image);

      return res.status(201).json(image);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao salvar a imagem' });
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

      if (!client.image) {
        return res.status(422).json({
          message: `Você não tem uma imagem`,
        });
      }

      deleteImage(client.image);

      const data = { image: '' };

      await repository.update(id, data);

      return res.json({ message: 'A imagem foi removida com sucesso!' });
    } catch (error) {
      return res.status(400).json({ message: 'Error ao deletar a imagem' });
    }
  }
}
