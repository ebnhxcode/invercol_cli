<template lang="pug">
#invercol
  pro-header
    //section.section
    nav.nav.has-shadow

      .container
        //pro-loader(v-if="isLoading")
        //pro-spinner(v-if="isLoading")

    .container
      .columns
        .column

        //img(src="./assets/logo.png")
        //h1 {{ msg }}       
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
      msg: "Hola mundo",
      searchQuery: "",
      showChildComponent: false,
      isLoading: true,
      isAnActiveComponentTab: true,
      tourOperadores: [
        { nombre: 'carlson' },
        { nombre: 'cocha' },
        { nombre: 'distantis' },
        { nombre: 'euroandino' },
        { nombre: 'mundotour' },
        { nombre: 'otas' },
        { nombre: 'otsi' },
        { nombre: 'tourmundial' },
        { nombre: 'touravion_dev' },
        { nombre: 'travelclub' },
        { nombre: 'veci' }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/main.scss";
  //@import "@/assets/scss/font-awesome.scss";
</style>
