var recButton = document.querySelector('.mic');
var searchBox = document.querySelector('.searchBox');
recButton.onclick = record;
var icon = document.createElement('img');
icon.setAttribute('src','images/mic.png');
icon.setAttribute('width','20px');
icon.setAttribute('heigth','20px');

recButton.appendChild(icon);
recButton.style.position = ("relative");
recButton.style.borderRadius = "40px";
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
 

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('div');
var hints = document.querySelector('.hints');
 



function record(){
	try {
 
  recognition.start();
  console.log('Ready to record.');
 
recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var word = event.results[last][0].transcript;
  searchBox.value =   word ;
  console.log('Confidence: ' + event.results[0][0].confidence);
}
recognition.onspeechend = function() {
  recognition.stop();
}
 
 
	}

	catch(err) {
		console.log("Error! please refresh the page.");

	}

 
	}
 