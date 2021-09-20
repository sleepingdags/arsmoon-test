import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./../router";
const STORAGE_KEY = "favourites";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    breeds: [],
    breedsNames: [],
    sortedImages: [],
    favourites: [],
    displayedBreed: null,
    bottom: false,
    alphabetOrder: false,
    originalOrderImages: [],
  },
  getters: {
    getBreeds: function (state) {
      let subBreeds = [];
      for (const name of state.breedsNames) {
        if (state.breeds[name].length > 0) {
          for (let i = 0; i < state.breeds[name].length; i++) {
            subBreeds.push("" + name + " " + state.breeds[name][i]);
          }
        } else {
          subBreeds.push(name);
        }
      }
      subBreeds.splice(127, 1);
      return subBreeds;
    },
    setImages: function (state) {
      if (state.sortedImages.length >= 20) {
        return state.sortedImages;
      }
    },
    getFavourites: function (state) {
      return state.favourites;
    },
  },
  actions: {
    loadBreedsList({ commit }) {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then((r) => r.data)
        .then((breeds) => {
          commit("SET_BREEDS", breeds.message);
        });
    },
    selectChange({ commit }, breed) {
      commit("SELECT_CHANGE", breed.breed);
    },
    initialSort({ commit, state }) {
      state.sortedImages = [];
      for (let i = 0; i < 20; i++) {
        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((r) => r.data)
          .then((breed) => {
            commit("ADD_IMAGE", breed.message);
          });
      }
    },
    changeSort({ commit, state }, breed) {
      state.sortedImages = [];
      if (breed.breed !== "all") {
        for (let i = 0; i < 20; i++) {
          let str = breed.breed.toString();
          str = str.replace(/\s/g, "/");
          axios
            .get("https://dog.ceo/api/breeds/" + str + "/images/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        }
      } else {
        for (let i = 0; i < 20; i++) {
          axios
            .get("https://dog.ceo/api/breeds/image/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        }
      }
    },
    singleBreedImages({ commit, state }, breed) {
      state.sortedImages = [];
      for (let i = 0; i < 20; i++) {
        let str = breed.breed.toString();
        if (str == "") {
          axios
            .get("https://dog.ceo/api/breeds/image/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        } else {
          str = str.replace(/\s/g, "/");
          axios
            .get("https://dog.ceo/api/breed/" + str + "/images/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        }
      }
    },
    addImages({ commit }, breed) {
      if (breed !== "") {
        for (let i = 0; i < 20; i++) {
          let str = breed.toString();
          str = str.replace(/\s/g, "/");
          axios
            .get("https://dog.ceo/api/breed/" + str + "/images/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        }
      } else {
        for (let i = 0; i < 20; i++) {
          axios
            .get("https://dog.ceo/api/breeds/image/random")
            .then((r) => r.data)
            .then((breed) => {
              commit("ADD_IMAGE", breed.message);
            });
        }
      }
    },
    addToFavourites({ commit }, image) {
      commit("ADD_TO_FAVOURITES", image);
    },
    getFavourites({ commit }) {
      commit("GET_FAVOURITES");
    },
    removeFromFavourites({ commit }, image) {
      commit("REMOVE_FROM_FAVOURITES", image.src);
    },
    clearTopSelect() {
      let select = document.querySelector("#breed-select");
      select.value = "";
    },
    alphabetSort({ commit }) {
      commit("GET_ALPHABET_SORT");
    },
  },
  mutations: {
    SET_BREEDS(state, breeds) {
      state.breeds = breeds;
      state.breedsNames = Object.getOwnPropertyNames(breeds);
    },
    ADD_IMAGE(state, image) {
      state.sortedImages.push(image);
    },
    ADD_TO_FAVOURITES(state, image) {
      state.favourites.push(image.src);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favourites));
      image.btn.setAttribute("disabled", true);
      image.btn.classList.add("disabled");
      image.btn.innerText = "Добавлено";
    },
    GET_FAVOURITES(state) {
      state.favourites = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    },
    REMOVE_FROM_FAVOURITES(state, image) {
      state.favourites.splice(state.favourites.indexOf(image), 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favourites));
    },
    SELECT_CHANGE(state, breed) {
      let str = breed.toString();
      if (str == "") {
        router.push({ path: "/" });
        state.displayedBreed = breed;
      } else {
        str = str.replace(/\s/g, "-");
        router.push({ path: "/" + str });
        state.displayedBreed = breed;
      }
    },
    GET_ALPHABET_SORT() {
      if (this.state.alphabetOrder == false) {
        this.state.alphabetOrder = true;

        this.state.originalOrderImages = [];
        for (let i = 0; i < this.state.sortedImages.length; i++) {
          this.state.originalOrderImages.push(this.state.sortedImages[i]);
        }

        this.state.sortedImages.sort();
      } else {
        this.state.alphabetOrder = false;

        this.state.sortedImages = [];
        for (let i = 0; i < this.state.originalOrderImages.length; i++) {
          this.state.sortedImages.push(this.state.originalOrderImages[i]);
        }
      }
    },
  },
});
