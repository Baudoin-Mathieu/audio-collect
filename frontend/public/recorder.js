let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayback = document.getElementById('audioPlayback');

startBtn.addEventListener('click', async () => {

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    audioChunks = [];

    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      console.log('Taille du blob audio :', audioBlob.size); // Ajoute cette ligne
      audioPlayback.src = URL.createObjectURL(audioBlob);

      const formData = new FormData();
      formData.append('audio', audioBlob);

      await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData
      });

      confirmBtn.disabled = false;
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    alert("Erreur d'accès au micro : " + err.message);
    console.error(err);
    return;
  }
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

document.getElementById('endSessionBtn').addEventListener('click', () => {
  window.location.href = '/';
});

confirmBtn.addEventListener('click', () => {
  confirmBtn.disabled = true;
  audioPlayback.src = ""; // Réinitialise le lecteur audio

  current++;
  if (current < nbPhrases) {
    afficherPhrase();
    // Réactive les boutons pour la nouvelle phrase
    startBtn.disabled = false;
    stopBtn.disabled = true;
  } else {
    // Fin de la session
    document.getElementById('phrase').textContent = "Merci, vous avez terminé !";
    document.getElementById('compteur').textContent = "";
    startBtn.disabled = true;
    stopBtn.disabled = true;
    confirmBtn.disabled = true;
  }
});


const phrases = [
  "Bonjour, comment ça va ?",
  "Le soleil brille aujourd'hui.",
  "J'aime apprendre de nouvelles choses.",
  "La technologie évolue rapidement.",
  "Bonne journée à vous !"
];
const nbPhrases = phrases.length;
let current = 0;

function afficherPhrase() {
  document.getElementById('phrase').textContent = phrases[current];
  document.getElementById('compteur').textContent = `Phrase ${current + 1} / ${nbPhrases}`;
}

afficherPhrase();
