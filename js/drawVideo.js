const drawVideo = (streamsContainer, time) => {
  const texCanvas = texCanvasElem;
  const canvas = displayCanvasElem;
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // setup GLSL program
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertCode);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    Math.random() > 0.05 ? fragCodeNoise : fragCodeGlitch
  );
  const program = createProgram(gl, vertexShader, fragmentShader);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setRectangle(gl, 0, 0, canvas.width, canvas.height);

  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,
      0.0,
      1.0,
      1.0,
      0.0,
      1.0,
      1.0
    ]),
    gl.STATIC_DRAW
  );

  // Create a texture.
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texCanvas
  );

  const resolutionLocation = gl.getUniformLocation(program, "resolution");

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

  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

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
