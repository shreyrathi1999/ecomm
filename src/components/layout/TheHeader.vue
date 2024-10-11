<template>
  <nav class="nav-container">
    <h1 class="nav-heading">My Website</h1>
    <ul class="nav-links">
      <li><router-link to="/products" class="nav-button"><base-button>Products</base-button></router-link></li>
      <li><router-link to="/favourites" class="nav-button"><base-button>Favourites</base-button></router-link></li>
    </ul>
  </nav>
</template>


<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>


<style scoped>
.nav-container {
  display: flex;
  flex-direction: column; /*Stack items vertically by default */
  align-items: center;
  background-color: rgb(119, 178, 240);
  padding: 5px;
}

.nav-heading {
  margin-bottom: 10px; /* Add spacing between heading and other elements */
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 10px 0; /* Add margin between links and other elements */
}

.nav-button {
  margin-left: 20px; /* Spacing between nav links */
}

@media (min-width: 769px) {
  .nav-container {
    flex-direction: row; /* Stack items horizontally on larger screens */
    justify-content: space-between; /* Space out items */
    align-items: center; /* Center align items vertically */
  }

  .nav-links {
    flex-direction: row; /* Keep links in a row */
  }

  .nav-button {
    margin-left: 20px; /* Spacing between nav links */
  }
}
</style>
