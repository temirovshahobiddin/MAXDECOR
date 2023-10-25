<template>
  <div class="spinner">
    <loading-progress
      :progress="progress" 
      :indeterminate="true"
      :counter-clockwise="counterClockwise" 
      :hide-background="false"
      size="64"
      rotate
      fillDuration="2"
      rotationDuration="1"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    progress: 0, // Define the progress property with an initial value
    counterClockwise: false, // Define the counterClockwise property with an initial value
  }),
};
</script>

<style>
.vue-progress-path path {
  stroke-width: 12;
}

.vue-progress-path .progress {
  stroke: #192965 !important;
}

.vue-progress-path .background {
  stroke: #fff !important;
}
</style>
