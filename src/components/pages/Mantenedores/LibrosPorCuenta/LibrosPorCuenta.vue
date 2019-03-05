<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Libros
        h6 Invercol IO

    .hero.is-light.hero-head
      .content

        .columns
          .column.is-12
            div.box(style="border-radius: 2px 2px 5px 5px;")
              .buttons

                button.button.is-small(
                  @click.prevent="isVisibleOptionsBanner=!isVisibleOptionsBanner",
                  :class="isVisibleOptionsBanner==true?'is-danger':'is-primary'",
                  href="/#top"
                )
                  small Más Opciones &nbsp;
                  v-icon(name="arrow-up",v-if="isVisibleOptionsBanner==true")
                  v-icon(name="arrow-down",v-if="isVisibleOptionsBanner==false")

                button.button.is-small(@click.prevent="modalNewBook()") Nuevo Libro
                button.button.is-small(@click.prevent="false") Asociar Libro a Cuenta
                
                //modal-new-book

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section

            .columns
              .column.is-6
                div.box
                  h2 Nuevo Libro
                  .field
                    .field
                      label Libro Código
                      input.input.is-fullwidth(type='text', v-model='newBook.libro_codigo')
                    .field
                      label Libro Nombre
                      input.input.is-fullwidth(type='text', v-model='newBook.libro_nombre')
                    .field
                      label Libro Descripción
                      input.textarea.is-fullwidth(v-model='newBook.libro_descripcion', rows="1")

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="saveNewBook()"
                    ) Guardar Libro

              .column.is-6
                div.box
                  h2 Asociar Libro a Cuenta
                  .field
                    .field
                      label Seleccione Libro
                      .select.is-fullwidth
                        select(v-model='newBookAccount.libro_id')
                          option(value='')
                          option(v-for='b in books', :value='b.libro_id') {{ b.libro_nombre }}

                    .field
                      label Seleccione Cuenta
                      .select.is-fullwidth
                        select(v-model='newBookAccount.cuenta_id')
                          option(value='')
                          option(v-for='a in accounts', :value='a.cuenta_id') {{ `${a.cuenta_id} - ${a.cuenta_nombre}` }}

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="saveNewBook()"
                    ) Guardar Asociacion

            div.box
               h2 Libros               
               table
                  thead
                     tr
                        th Acciones 
                        th Libro ID
                        th Libro Código
                        th Libro Nombre
                        th Libro Descripción
                        th Cuentas
                  tbody
                     tr(v-for="book in books")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ book.libro_id }}
                        td {{ book.libro_codigo }}
                        td {{ book.libro_nombre }}
                        td {{ book.libro_descripcion }}
                        td {{ book.libros_cuentas ? book.libros_cuentas.length : 0 }}


</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
//import ModalNewBook from '@/components/pages/Books/Modals/ModalNewBook/ModalNewBook.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu,
    //ModalNewBook
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        books:[], // lista de libros
        accounts:[], // lista de cuentas
        localInstanceNameDetail:'Libros', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,
        newBook: {
          libro_codigo:'',
          libro_nombre:'',
          libro_descripcion:'',
        },
        newBookAccount: {
          libro_id:'',
          cuenta_id:'',
        }

    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.getBooks()
      this.getAccounts()

    },

    getBooks: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/libros`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.books = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getAccounts: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/cuentas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.accounts = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },

    modalNewBook: function () {
      console.log('si estoy llegando al modal')
      //this.$modal.show('modal-new-book')
    }
  }

}
</script>