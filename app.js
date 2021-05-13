
let synth = window.speechSynthesis;
let voixAnglaise;
let couleur = document.querySelector('#couleur');
let boxContainer = document.querySelector('#box-container');
let couleurs = [
				{
					'voice': 'red',
					'color': '#f00'
				},
				{
					'voice': 'green',
					'color': '#008000'
				},
				{
					'voice': 'white',
					'color': '#fff'
				},
				{
					'voice': 'blue',
					'color': '#00f'
				},
				{
					'voice': 'black',
					'color': '#000'
				},
				{
					'voice': 'yellow',
					'color': '#ff0'
				},
				{
					'voice': 'Salmon',
					'color': '#FA8072'
				},
				{
					'voice': 'Pink',
					'color': '#FFC0CB'
				},
				{
					'voice': 'Coral',
					'color': '#FF7F50'
				},
				{
					'voice': 'Orange',
					'color': '#FFA500'
				},
				{
					'voice': 'Gold',
					'color': '#FFD700'
				},
				{
					'voice': 'Lavender',
					'color': '#E6E6FA'
				},
				{
					'voice': 'Violet',
					'color': '#EE82EE'
				},
				{
					'voice': 'Magenta',
					'color': '#FF00FF'
				},
				{
					'voice': 'Purple',
					'color': '#800080'
				},
				{
					'voice': 'Lime',
					'color': '#00FF00'
				},
				{
					'voice': 'Cyan',
					'color': '#00FFFF'
				},
				{
					'voice': 'Turquoise',
					'color': '#40E0D0'
				},
				{
					'voice': 'Navy',
					'color': '#000080'
				},
				{
					'voice': 'Chocolate',
					'color': '#D2691E'
				},
				{
					'voice': 'Brown',
					'color': '#A52A2A'
				},
				{
					'voice': 'Maroon',
					'color': '#800000'
				},
				{
					'voice': 'Gray',
					'color': '#808080'
				},
];


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


// Mélange les couleurs
couleurs = shuffle(couleurs);


// Prépare la synthèse vocale en anglais
window.speechSynthesis.onvoiceschanged = function() {
	let voices = synth.getVoices();
	for(i = 0; i < voices.length ; i++) {
		if (voices[i].lang == 'en-GB') {
			voixAnglaise = voices[i];
		}
	}
};


// Crée les boites de couleurs
couleurs.forEach((element, index) => {
	let box = document.createElement("li", {'class': 'box'+index});
	d = boxContainer.appendChild(box);
	d.classList.add('box', 'box-'+index);
	d.style.backgroundColor = element.color;
	d.dataset.voice = element.voice;

	box.addEventListener('click', event => {
		if (synth.speaking) {
			synth.cancel();
		}
		couleur.innerText = box.dataset.voice;

		let annonce = new SpeechSynthesisUtterance(box.dataset.voice);
		annonce.onend = function (event) {
		  couleur.innerText = '';
		}
		synth.voice = voixAnglaise;

		synth.speak(annonce);
	});
});


// Crée le Service Worker
if ("serveeeereeeeeeeiceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then(
      function(registration) {
        console.log("Enregistrement OK - Scope : ", registration.scope);
      },
      function(err) {
        console.log("Erreur d'enregistrement : ", err);
      }
    );
  });
}