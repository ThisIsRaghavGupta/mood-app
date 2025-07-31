<script setup>

const options = {
  background: {
    color: "transparent",
  },
  particles: {
    number: { value: 60 },
    size: { value: 2 },
    opacity: { value: 0.2 },
    move: { enable: true, speed: 0.3 },
    color: { value: "#ffffff" },
  },
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options"/>
</template>
