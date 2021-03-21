<template>
  <client-container>
    <div class="container">
      <b-card-group deck>
        <b-card class="mb-2" header-tag="header">
          <template #header>
            <h4 class="card-title mb-0">Perfil</h4>
          </template>

          <b-card-text>
            <div class="row">
              <div class="col-4">
                <img src="https://via.placeholder.com/150" class="rounded">
              </div>

              <div class="col-8 d-flex flex-column justify-content-between">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text>
                      <strong>Nome</strong>
                    </b-input-group-text>
                  </template>
                  <b-form-input v-model="client.name" placeholder="Nome..."/>
                </b-input-group>

                <b-input-group>
                  <template #prepend>
                    <b-input-group-text>
                      <strong>Email</strong>
                    </b-input-group-text>
                  </template>
                  <b-form-input v-model="client.email" placeholder="Email..."/>
                </b-input-group>

                <b-input-group>
                  <template #prepend>
                    <b-input-group-text>
                      <strong>Telefone</strong>
                    </b-input-group-text>
                  </template>
                  <b-form-input v-model="client.mobile_phone" placeholder="Telefone..."/>
                </b-input-group>
              </div>
            </div>
          </b-card-text>
        </b-card>

        <b-card class="mb-2" header-tag="header" no-body>
          <template #header>
            <h4 class="card-title mb-0">Histórico</h4>
          </template>

          <b-list-group flush>
            <b-list-group-item
              v-for="item in client.history"
              :key="item.id"
              class="d-flex justify-content-between align-items-center"
            >
              {{ item.barber.name }}

              <b-badge
                :variant="item.is_cutted ? 'success' : 'danger'"
                pill
              >
                {{ item.is_cutted ? 'Cortado' : 'Pendente' }}
              </b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div>
  </client-container>
</template>

<script>
import ClientContainer from './Container.vue';

export default {
  components: {
    ClientContainer,
  },
  data() {
    return {
      client: {
        name: 'Caio Guilherme',
        email: 'caio@gmail.com',
        mobile_phone: '(000) 00000-0000',
        history: [
          {
            id: 1,
            is_cutted: true,
            scheduled_to: '18/03/2021',
            barber: {
              name: 'Best Barber',
            },
          },
          {
            id: 2,
            is_cutted: false,
            scheduled_to: '18/03/2021',
            barber: {
              name: 'Virgulino',
            },
          },
          {
            id: 3,
            is_cutted: true,
            scheduled_to: '18/03/2021',
            barber: {
              name: 'Rocha Cut',
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
label {
  margin-bottom: 0;
}
</style>
