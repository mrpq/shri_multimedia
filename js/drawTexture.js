const drawTexture = (streamsContainer, time) => {
  const canvas = texCanvasElem;
  const video = videoElem;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};
