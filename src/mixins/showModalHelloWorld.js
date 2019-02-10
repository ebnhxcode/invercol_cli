const showModalHelloWorldMixin = {
  methods: {
    /**
     * Metodo show y hide para pruebas de modal
     */
    show() {
      this.$modal.show("hello-world", {
        title: "Alert!",
        text: "You are too awesome",
        buttons: [
          {
            title: "Deal with it",
            handler: () => {
              alert("Woot!");
            }
          },
          {
            title: "", // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
          },
          {
            title: "Close"
          }
        ]
      });
    },
    hide() {
      this.$modal.hide("hello-world");
    }
  }
};

export default showModalHelloWorldMixin;
