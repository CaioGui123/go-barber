import Barber from '../models/Barber';
import BarberImageView from './BarberImageView';
import RatingView from './RatingView';

export default {
  render(barber: Barber) {
    return {
      id: barber.id,
      name: barber.name,
      email: barber.email,
      mobile_phone: barber.mobile_phone,
      city: barber.city,
      neighborhood: barber.neighborhood,
      street: barber.street,
      number: barber.number,
      images: barber.images ? BarberImageView.renderMany(barber.images) : [],
      ratings: barber.ratings ? RatingView.renderMany(barber.ratings) : [],
    };
  },
  renderMany(barbers: Barber[]) {
    return barbers.map((barber) => this.render(barber));
  },
};
