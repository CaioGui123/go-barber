<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Go Cut</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }">
          Home
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Linguagem" right>
          <b-dropdown-item href="#">English</b-dropdown-item>
          <b-dropdown-item href="#">Espanhol</b-dropdown-item>
          <b-dropdown-item href="#">Português</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Usuário" right>
          <b-dropdown-item :to="{ name: 'ClientProfile', }">Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'ClientNavBar',
  props: {},
};
</script>
