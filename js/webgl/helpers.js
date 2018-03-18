const DEBUG = true;

/**
 * Создает шейдер
 *
 * @param {any} gl webgl контекст
 * @param {any} type тип шейдера
 * @param {any} source исходный код шейдера (на glsl)
 * @returns
 */
const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (DEBUG) {
    if (!success) throw gl.getShaderInfoLog(shader);
  }

  return shader;
};

/**
 * Создает webgl программу
 *
 * @param {any} gl webgl контекст
 * @param {any} vertexShader вертексный шейдер
 * @param {any} fragmentShader фрагментный шейдер
 * @returns
 */
const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (DEBUG) {
    if (!success) throw gl.getProgramInfoLog(program);
  }

  return program;
};

/**
 * Создает набор координат вершин двух треугольников
 * и помещает в буфер
 *
 * @param {any} gl webgl контекст
 * @param {any} x начальная x координата
 * @param {any} y начальная y координата
 * @param {any} width ширина области отрисовки
 * @param {any} height ширина области отрисовки
 */
const setVerices = (gl, x, y, width, height) => {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
};

/**
 * Помещает в буфер координаты текстуры для прямоугольника
 *
 * @param {any} gl
 */
const setTexCoords = gl => {
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
};

const setTexture = (gl, image) => {
  // Установки ниже позволяют отрисовать изображение любого размера.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Загружаем изображение в текстуру
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
};
