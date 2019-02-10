<template lang="pug">
  .container
    .content
      .has-text-centered
        div.tabs.is-centered.is-boxed
          ul
            li(v-for="operator in TourOperators"): a {{ operator.name }}
</template>
<script>
  export default {
    data () {
      return {
        tourOperators: [
          { name: 'carlson' },
          { name: 'cocha' },
          { name: 'distantis' },
          { name: 'euroandino' },
          { name: 'mundotour' },
          { name: 'otas' },
          { name: 'otsi' },
          { name: 'tourmundial' },
          { name: 'touravion_dev' },
          { name: 'travelclub' },
          { name: 'veci' }
        ]
      }
    }
  }
</script>