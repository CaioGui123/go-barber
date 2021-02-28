import Client from '../models/Client';

export default {
  render(client: Client) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      mobile_phone: client.mobile_phone,
      image: client.image
        ? `${process.env.APP_URL}/uploads/${client.image}`
        : '',
    };
  },
  renderMany(clients: Client[]) {
    return clients.map((client) => this.render(client));
  },
};
