<template>
  <div class="main">
    <BreedList />
  </div>
</template>

<script>
import BreedList from "../components/BreedList.vue";

export default {
  components: {
    BreedList,
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
  opacity: 0.5;
}
.wrapper:hover button {
  opacity: 1;
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
.removeBtn {
  opacity: 0;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: darkred;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}
</style>
