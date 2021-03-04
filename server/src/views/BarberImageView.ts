import BarberImage from '../models/BarberImage';

export default {
  render(barberImage: BarberImage) {
    return {
      id: barberImage.id,
      url: `${process.env.APP_URL}/uploads/${barberImage.name}`,
    };
  },
  renderMany(barberImages: BarberImage[]) {
    if (barberImages) {
      return barberImages.map((barberImage) => this.render(barberImage));
    }

    return [];
  },
};
