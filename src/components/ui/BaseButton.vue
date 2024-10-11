<template>
  <button :class="['base-button', buttonType]">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    buttonType: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.base-button.primary {
  background-color: #007bff;
  color: #fff;
}

.base-button.primary:hover {
  background-color: #0056b3;
}

.base-button.secondary {
  background-color: #caac58;
  color: #fff;
}

.base-button.secondary:hover {
  background-color: #917b40;
}

.base-button.third {
  background-color: #ca6958;
  color: #fff;
}

.base-button.third:hover {
  background-color: #9b4b3d;
}

.base-button.more {
  background-color: #58a6ca;
  color: #fff;
}
.base-button.more:hover {
  background-color: #379189;
}
</style>
