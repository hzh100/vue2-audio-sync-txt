<template>
  <div class="home">
    <h4>Welcome to Your Vue.js App</h4>
    <div class="form-box">
      <HzhForm></HzhForm>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HzhForm from '@/components/HzhForm.vue'

export default {
  name: 'HomeView',
  components: {
    HzhForm
  }
}
</script>

<style scoped lang="scss">
  .form-box {
    width: 400px;
  }
</style>
