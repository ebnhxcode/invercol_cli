<template lang="pug">
  //.loader Cargando ...
  .loader-css Cargando ...
</template>

<script>
  export default {
    'loader': {
      props: [''],
      'name': 'loader',
      // 'template':`<div class="loader">Loading...</div>`,
      data () {
        return {
        }
      },
      ready () {},
      created(){},
      filters: {},
      methods: {},
    },
  }
</script>

<style lang="css" scoped>
   .loader-css,
   .loader-css:before,
   .loader-css:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
   }
   .loader-css {
      color: #a9b2fb;
      font-size: 10px;
      margin: 80px auto;
      position: relative;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
   }
   .loader-css:before,
   .loader-css:after {
      content: '';
      position: absolute;
      top: 0;
   }
   .loader-css:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
   }
   .loader-css:after {
      left: 3.5em;
   }
   @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
   @keyframes load7 {
      0%,
      80%,
      100% {
         box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
         box-shadow: 0 2.5em 0 0;
      }
   }
</style>