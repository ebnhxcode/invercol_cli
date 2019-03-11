<template lang="pug">
#invercol
  pro-header
  router-view
  pro-footer
</template>

<script>

import ProHeader from "@/components/layouts/Headers/Header.vue"
import ProFooter from "@/components/layouts/Footers/Footer.vue"

import ProLoader from "@/components/shared/Loader.vue"
import ProSpinner  from "@/components/shared/Spinner.vue"


export default {
  name: "Invercol",
  components: {
    ProHeader,
    ProFooter,
    ProLoader,
    ProSpinner,
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";
</style>
