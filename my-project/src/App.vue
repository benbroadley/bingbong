<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">BingBong</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="nav-link" to="/">New game</router-link>
           </b-nav-item>
          <b-nav-item>
            <router-link class="nav-link" to="/leaderboard">Leader board</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container pt-4">
      <h1 class="mb-4">{{ title }}</h1>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Bing Bong 2019',
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
