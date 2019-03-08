<template lang="pug">
  footer.footer
    .hero.is-small.is-bold
      .is-light.hero-footer
        .container
          .content.has-text-centered
            .section
              p Invercol {{ d.getFullYear() }} · 💪
              notifications(group="global",position="bottom right")
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
