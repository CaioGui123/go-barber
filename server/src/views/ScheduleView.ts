import Schedule from '../models/Schedule';
import BarberView from './BarberView';
import ClientView from './ClientView';

export default {
  render(schedule: Schedule) {
    return {
      id: schedule.id,
      price: `R$ ${schedule.price.toLocaleString()}`,
      is_cutted: schedule.is_cutted,
      is_accepted: schedule.is_accepted,
      scheduled_at: new Date(schedule.scheduled_at).toLocaleString(),
      scheduled_to: new Date(schedule.scheduled_to).toLocaleString(),
      barber: schedule.barber ? BarberView.render(schedule.barber) : {},
      client: schedule.client ? ClientView.render(schedule.client) : {},
    };
  },
  renderMany(schedules: Schedule[]) {
    return schedules.map((schedule) => this.render(schedule));
  },
};
