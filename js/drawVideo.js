const drawVideo = (streamsContainer, time) => {
  const texCanvas = texCanvasElem;
  const canvas = displayCanvasElem;
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Ваш браузер не потдерживает webl");
    return;
  }

  // Создаем программу
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertCode);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    Math.random() > 0.05 ? fragCodeNoise : fragCodeGlitch
  );

  const program = createProgram(gl, vertexShader, fragmentShader);
  // получаем локейшн соответствующих аттрибутов
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

  // создаем буфер под данные для вершин, наполняем данными
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setVerices(gl, 0, 0, canvas.width, canvas.height);

  // создаем буфер под данные для координат текстуры, наполняем данными
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  setTexCoords(gl);

  // Создаем текстуру.
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  setTexture(gl, texCanvas);

  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

  // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
    positionLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(texcoordLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
    texcoordLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // set the resolution
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  // set time
  const timeLocation = gl.getUniformLocation(program, "time");
  gl.uniform1f(timeLocation, time);
  // Draw the rectangle.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
};
