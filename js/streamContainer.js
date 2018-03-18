class StreamContainer {
  constructor({ mediaStream, video = true, audio = false, selector }) {
    if (video) {
      if (!selector) {
        throw new Error("Video tag selector missing");
      }
      this.initVideoStream(mediaStream, selector);
      this.initAudioStream(mediaStream);
    }
  }

  initVideoStream(mediaStream, selector) {
    this.video = document.getElementById(selector);
    this.video.srcObject = mediaStream;
  }

  initAudioStream(mediaStream) {
    this.audioContext = new AudioContext();
    const input = this.audioContext.createMediaStreamSource(mediaStream);
    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioAnalyser.smoothingTimeConstant = 0.3;
    this.audioAnalyser.fftSize = 1024;
    input.connect(this.audioAnalyser);
  }

  getAudioContex() {
    return this.audioContext;
  }

  getAudioAnalyser() {
    return this.audioAnalyser;
  }

  analyseAudioFrequencyData() {
    const array = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    this.audioAnalyser.getByteFrequencyData(array);
    this.frequencyData = array;
    return this.frequencyData;
  }

  calculateAverageVolume(array) {
    let values = 0;
    let length = array.length;
    for (let i = 0; i < length; i++) {
      values += array[i];
    }
    let average = values / length;
    return average;
  }
}
