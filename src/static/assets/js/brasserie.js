const socket = io();

const app = new Vue({
  el: "#tchat-biere",
  vuetify: new Vuetify(),
  data: {
    brasseries: ""
  },
  methods: {
    beerSearch: function() {
      this.beer = this.beer;
      socket.emit("room-connection", this.beer);
      this.beer = "";
    }
  },
  mounted() {
    this.brasseries = fetch("https://ji8sm.sse.codesandbox.io/api/brewery/1")
      .then(response => response.json())
      .then(data => data)
      .catch(err => err);
    console.log(this.brasseries);
    socket.on("broadcast-room-messages", data => {
      this.allMessage = data;
    });
  }
});

socket.on("init-room", function(message) {
  app.message = message;
});
