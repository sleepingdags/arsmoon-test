<template>
  <div class="breeds-list">
    <div class="images">
      <div class="wrapper" v-for="image in setImages" :key="image.id">
        <div class="img-wrapper">
          <img :src="image" alt="image" class="img" />
        </div>
        <div class="btn-wrapper">
          <button class="addBtn" @click="addToFavourites(image, $event)">
            Добавить в избранное
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BreedPage",
  data() {
    return {
      bottom: false,
    };
  },
  computed: {
    ...mapGetters(["setImages"])
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    ...mapActions(["addImages", "alphabetSort"]),
    addToFavourites(image, e) {
      this.$store.dispatch("addToFavourites", { src: image, btn: e.target });
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.loadMore(document.querySelector("#breed-select").value);
      }
    },
  },
};
</script>