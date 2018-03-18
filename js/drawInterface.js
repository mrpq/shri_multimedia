let prevTime = 0; // для вычисления разницы времени для перерисовки бегущего текста
let textIndex = 0; // для посимвольного вывода бегущего текста
let text = ""; // видимый бегущий текст

const drawRunningText = (
  ctx,
  color = "rgba(255, 255, 255, 1)",
  canvasWidth,
  canvasHeight,
  currTime
) => {
  ctx.fillStyle = color;
  const timePassed = currTime - prevTime;
  if (timePassed / 10 > 0.15) {
    text += runningText[textIndex];
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
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(512, 0, average * 2, 20);
};

const drawFrequencies = (freaquencyData, ctx, ancor) => {
  freaquencyData = freaquencyData.slice(0, 500);
  const frequenciesBoxWidth = 140;
  const barWidth = frequenciesBoxWidth / freaquencyData.length;
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  for (let i = 0; i < freaquencyData.length; i += 1) {
    const k = 6;
    const level = freaquencyData[i] / k;
    ctx.fillRect(512 + i * barWidth, ancor - level, 1, level);
    ctx.fillRect(512 + i * barWidth, ancor, 1, level);
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

const drawInterface = (streamsContainer, time) => {
  const canvas = interfaceCanvasElem;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRunningText(
    ctx,
    "rgba(255, 255, 255, 1)",
    canvas.width,
    canvas.height,
    time
  );
  drawAudioVisuals(ctx, streamsContainer);
};
