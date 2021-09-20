<template>
  <div class="breeds-list">
    <div class="list">
      <input
        @click="imageAlphabetSort"
        type="checkbox"
        name="sort-alphabet"
        id="sort-alphabet"
      />
      <label class="checkbox" for="sort-alphabet">
        <span>Сортировать по алфавиту</span>
      </label>
    </div>
    <div class="images">
      <div class="wrapper" v-for="image in images" :key="image.id">
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
export default {
  name: "BreedList",
  data() {
    return {
      bottom: false,
    };
  },
  computed: {
    images() {
      return this.$store.getters.setImages;
    }
  },
  methods: {
    addToFavourites(image, e) {
      this.$store.dispatch("addToFavourites", { src: image, btn: e.target });
    },
    loadMore(breed) {
      this.$store.dispatch("addImages", breed);
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    imageAlphabetSort() {
      this.$store.dispatch("alphabetSort");
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
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

<style scoped>
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
