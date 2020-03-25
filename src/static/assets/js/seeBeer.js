const bouton = document.querySelector("#id"); //On récupere le promier bouton de la page

//lorsqu'on clique dessus 
bouton.addEventListener("click", function() {
  let id = document.getElementById("idBeer");
  let url = "https://ji8sm.sse.codesandbox.io/api/beer/" + id.value;
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

const bouton2 = document.querySelector("#degre");
bouton2.addEventListener("click", function() {
  let deg = document.getElementById("deg");
  let url = "https://ji8sm.sse.codesandbox.io/api/beer/deg/" + deg.value;
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});
