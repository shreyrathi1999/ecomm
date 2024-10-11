<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card {
  width: 100%; 
  max-width: 325px; 
  background-color: #f0f0f0; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
  margin: 20px; 
  transition: box-shadow 0.3s ease;
}

.base-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>

