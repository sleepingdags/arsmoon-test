<template>
  <div>
    <div class="menu">
      <ul class="list">
        <li @click="resetSelect">
          <router-link class="menu-link" to="/">Все Пёсели</router-link>
        </li>
        <li @click="resetSelect">
          <router-link class="menu-link" to="/favorites">
            Избранные пёсели
          </router-link>
        </li>
        <li>
          <label for="breed-select">
            <span>Породы:</span>
          </label>
          <select @change="selectChange" name="breed-select" id="breed-select">
            <option :value="null" selected>All</option>
            <option :value="breed" v-for="breed in breeds" :key="breed.id">
              {{ breed }}
            </option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  computed: {
    breeds() {
      return this.$store.getters.getBreeds;
    },
  },
  methods: {
    selectChange(e) {
      this.$store.dispatch("selectChange", { breed: e.target.value });
      this.$store.dispatch("singleBreedImages", { breed: e.target.value });
    },
    resetSelect() {
      this.$store.dispatch("clearTopSelect");
      this.$store.dispatch("initialSort");
    },
  },
};
</script>

<style scoped>
.menu{
  margin: 0;
  height: 60px;
  display: flex;
  background: #414346;
}
.list {
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style: none;
  width: 50%;
  margin: auto;
  text-align: center;
}
.list li {
  margin: auto;
}
.list li {
  margin: auto;
  color: #ffffff;
  text-transform: capitalize;
}
.menu-link {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  text-transform: capitalize;
}
.menu-link.router-link-exact-active {
  color: #42b983;
}
.list select {
  margin: auto 15px;
  border-radius: 5px;
}
.list select,
.list select option {
  text-transform: capitalize;
  text-align: center;
  padding: 2px 5px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
