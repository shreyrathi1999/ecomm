<template>
  <div class="container">
    <h1>Page doesn't exist..</h1>
    <p>Visit homepage?</p>
    <router-link to="/"><base-button>Home</base-button></router-link>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue'
export default {
  components: { BaseButton },
    
}
</script>