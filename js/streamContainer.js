class StreamContainer {
  constructor({ mediaStream, video = true, audio = false, selector }) {
    if (video) {
      if (!selector) {
        throw new Error("Video tag selector missing");
      }
      this.initVideoStream(mediaStream, selector);
    }
  }

  initVideoStream(mediaStream, selector) {
    this.video = document.getElementById(selector);
    this.video.srcObject = mediaStream;
  }
}
