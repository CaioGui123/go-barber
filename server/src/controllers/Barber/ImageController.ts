import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Barber from '../../models/Barber';
import BarberImage from '../../models/BarberImage';

import deleteImage from '../../utils/deleteImage';

export default class BarberImageController {
  static async massStore(req: Request, res: Response) {
    try {
      const barberRepository = getRepository(Barber);
      const imageRepository = getRepository(BarberImage);
      const { id } = req.params;

      const barber = await barberRepository.findOne(id);

      if (!barber) {
        return res.status(400).json({
          message: `Barbeiro #${id} não encontrado`,
        });
      }

      const requestImages = req.files as Express.Multer.File[];

      requestImages.forEach(async (requestImage) => {
        try {
          const image = imageRepository.create({
            barber_id: id,
            name: requestImage.filename,
          });

          await imageRepository.save(image);
        } catch (error) {
          return res.status(400).json({
            message: `Erro ao criar as imagens`,
          });
        }
      });

      return res.status(201).json({ message: 'Imagens salvas com sucesso!' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao criar as imagens' });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const barberRepository = getRepository(Barber);
      const imageRepository = getRepository(BarberImage);
      const { barberId, imageId } = req.params;

      const barber = await barberRepository.findOne(barberId);

      if (!barber) {
        return res.status(400).json({
          message: `Barbeiro #${barberId} não encontrado`,
        });
      }

      const image = await imageRepository.findOne(imageId);

      if (!image) {
        return res.status(400).json({ message: 'Imagem não encontrada' });
      }

      deleteImage(image.name);

      await imageRepository.delete(imageId);

      return res.json({ message: 'Imagem removida com sucesso!' });
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao deletar as imagens' });
    }
  }
}
