<template>
  <div>
    <header>
      <client-nav-bar />
    </header>
    <main class="mt-3">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import ClientNavBar from '../../components/Client/NavBar.vue';

export default {
  name: 'ClientContainer',
  components: {
    ClientNavBar,
  },
};
</script>

<style>

</style>
