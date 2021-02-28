import Barber from '../models/Barber';
import BarberImageView from './BarberImageView';

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
      images: BarberImageView.renderMany(barber.images),
    };
  },
  renderMany(barbers: Barber[]) {
    return barbers.map((barber) => this.render(barber));
  },
};
