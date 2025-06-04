let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayback = document.getElementById('audioPlayback');

startBtn.addEventListener('click', async () => {

    try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // ...reste du code...
  } catch (err) {
    alert("Erreur d'accès au micro : " + err.message);
    console.error(err);
    return;
  }


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
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
