const drawTexture = (streamsContainer, time) => {
  const canvas = texCanvasElem;
  const video = videoElem;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};
