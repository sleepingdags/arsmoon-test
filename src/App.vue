<template>
  <div id="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  components: {
    Menu
  },
  beforeCreate() {
    this.$store.dispatch("loadBreedsList");
    this.$store.dispatch("getFavourites");
  },
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  text-align: center;
}
.breeds-list {
  margin-top: 50px;
}
.images {
  text-align: center;
  margin: auto;
}
.wrapper {
  display: inline-block;
  text-align: center;
  margin: 10px;
}
.wrapper:hover img {
  opacity: 0.9;
}
.img-wrapper {
  display: inline-block;
  height: 250px;
}
img {
  height: 100%;
  border-radius: 5px;
  transition: opacity 0.3s ease-in-out;
}
.btn-wrapper {
  height: 0;
  position: relative;
  bottom: 50px;
}
.addBtn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #2c3e50;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}
.addBtn.disabled {
  background-color: #286934;
}

.list label.checkbox {
  position: relative;
}
.list label.checkbox::after,
.list label.checkbox::before {
  content: "";
  position: absolute;
  transition: 0.1s linear;
}
.list label.checkbox::before {
  top: 50%;
  right: -1.5rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  background-color: transparent;
  border: 1px solid #414346;
  border-radius: 5px;
}
.list label.checkbox::after {
  top: calc(50% - 0.35rem);
  right: -11%;
  transform: rotate(45deg) translate(-50%, 0);
  width: 0.2rem;
  height: 0.5rem;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;

  opacity: 0;
}
.list input[type="checkbox"]:checked + label.checkbox:before {
  background-color: #42b983;
}
.list input[type="checkbox"]:checked + label.checkbox:after {
  opacity: 1;
}
.list input[type="checkbox"] {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>