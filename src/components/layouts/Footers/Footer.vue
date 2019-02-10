<template lang="pug">
  footer.footer
    .hero.is-small.is-bold
      .is-light.hero-footer
        .container
          .content.has-text-centered
            .section
              p Distantis {{ d.getFullYear() }} · Made with 💪
        // ❤
</template>
<script>
export default {
  data() {
    return {
      d: new Date(),
    }
  }
}
</script>
<style>
</style>
