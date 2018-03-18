let prevTime = 0; // для вычисления дельты времени для перерисовки бегущего текста
let textIndex = 0; // используется для посимвольного вывода бегущего текста
let text = ""; // бегущий текст

const drawRunningText = (
  ctx,
  color = "#ffffff",
  canvasWidth,
  canvasHeight,
  currTime
) => {
  ctx.fillStyle = "color";
  const timePassed = currTime - prevTime;
  if (timePassed / 10 > 0.15) {
    text += runningText[textIndex];
    // ctx.clearRect(0, canvasHeight - 100, canvasWidth, canvasHeight);
    drawTextLines({
      ctx,
      text,
      position: {
        x: 10,
        y: canvasHeight - 90
      }
    });
    textIndex += 1;
    if (textIndex === runningText.length - 1) {
      textIndex = 1;
      text = "";
    }
    prevTime = currTime;
  }
};

const drawAverageVolume = (average, ctx) => {
  // ctx.clearRect(510, 0, 200, 200);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(512, 0, average * 2, 20);
};

const drawFrequencies = (freaquencyData, ctx, ancor) => {
  // array = array.slice(0, Math.floor(array.length / 4));
  freaquencyData = freaquencyData.slice(0, 500);
  const frequenciesBoxWidth = 140;
  const barWidth = frequenciesBoxWidth / freaquencyData.length;
  for (let i = 0; i < freaquencyData.length; i += 1) {
    const k = 6;
    const level = freaquencyData[i] / k;
    ctx.fillRect(512 + i * barWidth, ancor - level, 1, level);
    ctx.fillRect(512 + i * barWidth, ancor, 1, level);
    // audioCanvasCtx.fillRect(i);
  }
};

const drawAudioVisuals = (ctx, streamsContainer) => {
  const freaquencyData = streamsContainer.analyseAudioFrequencyData();
  const averageVolume = streamsContainer.calculateAverageVolume(freaquencyData);
  drawAverageVolume(averageVolume, ctx);
  drawFrequencies(freaquencyData, ctx, 70);
};

const drawTextLines = params => {
  const { ctx, fontSize = 13, maxLines = 5, text, position } = params;
  ctx.font = `bold ${fontSize}px Courier`;
  const lineHeight = 15;
  let lines = text.split("\n");
  lines = lines.slice(lines.length - 1 - maxLines);
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], position.x, position.y + i * lineHeight);
  }
};

const drawTexture = (streamsContainer, time) => {
  const canvas = texCanvasElem;
  const video = videoElem;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};

const drawInterface = (streamsContainer, time) => {
  const canvas = interfaceCanvasElem;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRunningText(ctx, "#ffffff", canvas.width, canvas.height, time);
  drawAudioVisuals(ctx, streamsContainer);
};
