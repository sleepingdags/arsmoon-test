<template>
  <div>
    <div class="breeds-list">
      <div class="images">
        <div class="wrapper" v-for="image in getFavourites" :key="image">
          <div class="img-wrapper">
            <img :src="image" alt="image" class="img" />
          </div>
          <div class="btn-wrapper">
            <button class="removeBtn" @click="removeFavourite(image)">
              Удалить из избранного
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFavourites"])
  },
  methods: {
    removeFavourite(image) {
      this.$store.dispatch("removeFromFavourites", { src: image });
    },
  }
};
</script>

<style scoped>
.removeBtn {
  opacity: 0;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: darkred;
  color: #ffffff;
  cursor: pointer;
  transition: opacity .3s ease-in-out;
}
.wrapper:hover button {
  opacity: 1;
}
</style>
