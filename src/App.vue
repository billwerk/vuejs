<template>
  <md-app id="app" md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <span class="md-title">Subscribe to sign up</span>
    </md-app-toolbar>
    <md-app-content>
      <Sign-up />
    </md-app-content>
  </md-app>
</template>

<script>
import SignUp from "./components/signup/SignUp.vue";

export default {
  name: "App",
  components: {
    SignUp
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin: auto;
  width: 500px;
  height: 100%;
  padding: 10px;
}

.md-card{
  margin-top: 5px;
}
</style>
