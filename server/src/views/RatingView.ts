import Rating from '../models/Rating';
import ClientView from './ClientView';

export default {
  render(rating: Rating) {
    return {
      id: rating.id,
      stars: rating.stars,
      body: rating.body,
      client: rating.client ? ClientView.render(rating.client) : {},
      barber: rating.barber,
    };
  },
  renderMany(ratings: Rating[]) {
    return ratings.map((rating) => this.render(rating));
  },
};
