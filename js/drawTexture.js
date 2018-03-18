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
  ctx.fillStyle = color;
  const timePassed = currTime - prevTime;
  if (timePassed / 10 > 0.15) {
    text += runningText[textIndex];
    ctx.clearRect(0, canvasHeight - 100, canvasWidth, canvasHeight);
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
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  drawRunningText(ctx, "#ffffff", canvas.width, canvas.height, time);
};
