const socket = io();

const app = new Vue({
  el: "#tchat-brasserie",
  vuetify: new Vuetify(),
  data: {
    brasserie: "",
    message: "",
    allMessage: [],
    displayBrasserie: false
  },
  methods: {
    onBrasserieConnection: function() {
      this.brasserie = this.brasserie;
      this.displayBrasserie = true;
      socket.emit("room-connection", this.brasserie);
    },
    onBrasserieInput: function() {
      if (this.message != "") {
        this.allMessage.unshift(this.message);
        socket.emit("on-room-input", this.room, this.message);
        this.message = "";
      }
    }
  },
  mounted() {
    socket.on("broadcast-room-message", data => {
      this.allMessage.unshift(data);
    });
  }
});

socket.on("init-room", function(message) {
  app.allMessage.unshift(message);
});
