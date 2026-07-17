const EXPORT_WIDTH = 720;
const STARTING_POSITIONS = [
  { x: -6, y: -6 },
  { x: 10, y: 10 },
  { x: -15, y: 50 },
  { x: 85, y: 25 },
  { x: 85, y: -5 },
  { x: 5, y: 77 },
  { x: 5, y: 88 },
  { x: 89, y: 89 },
];
const STARTING_COLORS = ['#3364e6', '#fff1a7', '#f35436', '#8576e4', '#ffc0cb', '#47af5c', '#ffd700', '#a0522d'];
const EMOJI_COLORS = ['#3364e6', '#f35436', '#ff6978', '#8576e4', '#47af5c', '#ffd700'];
const STARTING_SIZES = [70, 120, 120, 70, 100, 55, 70, 80];
const STARTING_ROTATIONS = [-10, 0, -10, 10, 15, 0, -5, 0];
const EMOJI_CATALOG = [
  ['😀', 'grinning happy smile face'], ['🥰', 'smiling face hearts love'], ['😎', 'cool sunglasses face'], ['🥹', 'smiling tears face'],
  ['😭', 'crying tears sad face'], ['😈', 'devil purple face'], ['💀', 'skull spooky'], ['👻', 'ghost spooky'],
  ['🦋', 'butterfly insect'], ['🐈', 'cat pet animal'], ['🐕', 'dog pet animal'], ['🐸', 'frog animal'],
  ['🦊', 'fox animal'], ['🐝', 'bee insect'], ['🐚', 'shell sea beach'], ['🐬', 'dolphin ocean animal'],
  ['🌙', 'moon night sky'], ['⭐', 'star sparkle sky'], ['☀️', 'sun sunny sky'], ['☁️', 'cloud sky'],
  ['🌈', 'rainbow weather color'], ['🌊', 'wave ocean water'], ['🔥', 'fire flame hot'], ['🍄', 'mushroom nature'],
  ['🌸', 'cherry blossom pink flower'], ['🌻', 'sunflower yellow flower'], ['🌹', 'rose red flower'], ['🪻', 'hyacinth purple flower'],
  ['🍓', 'strawberry fruit'], ['🍒', 'cherries fruit'], ['🍉', 'watermelon fruit'], ['🍑', 'peach fruit'],
  ['🥐', 'croissant bakery'], ['🧁', 'cupcake sweet dessert'], ['🎂', 'birthday cake dessert'], ['🍭', 'lollipop candy sweet'],
  ['☕', 'coffee cup drink'], ['🧃', 'juice box drink'], ['🍵', 'tea cup drink'], ['🍸', 'cocktail drink party'],
  ['🎀', 'ribbon bow gift'], ['💌', 'love letter mail'], ['💖', 'sparkling heart love'], ['🫶', 'heart hands love'],
  ['✨', 'sparkles magic'], ['🪄', 'magic wand'], ['🪩', 'disco ball party'], ['🎈', 'balloon party'],
  ['🎧', 'headphones music'], ['🎸', 'guitar music'], ['📷', 'camera photo'], ['🎨', 'artist palette paint'],
  ['🕯️', 'candle light'], ['💡', 'light bulb idea'], ['📚', 'books reading'], ['✈️', 'airplane travel'],
  ['🪐', 'planet space'], ['🚀', 'rocket space'], ['🗺️', 'map travel'], ['🏡', 'house home'],
  ['🧸', 'teddy bear toy'], ['🛼', 'roller skate'], ['💃', 'dancing woman dance'], ['🧚', 'fairy magic'],
  ['🎃', 'halloween pumpkin spooky'], ['🦇', 'halloween bat spooky'], ['🕸️', 'halloween spider web spooky'], ['🧙', 'halloween wizard witch magic'],
  ['🧛', 'halloween vampire spooky'], ['🍬', 'halloween candy treat'], ['🪦', 'halloween grave spooky'], ['🔮', 'halloween crystal ball magic'],
  ['🎄', 'christmas tree holiday'], ['🎅', 'christmas santa holiday'], ['🦌', 'christmas reindeer holiday'], ['⛄', 'christmas snowman winter'],
  ['🎁', 'christmas gift present holiday'], ['🧦', 'christmas stocking holiday'],
  ['🌹', 'valentines rose love'], ['💝', 'valentines heart love'], ['💘', 'valentines heart arrow love'], ['💋', 'valentines kiss love'],
  ['🧸', 'valentines teddy bear love'], ['💌', 'valentines love letter'], ['🍫', 'valentines chocolate love'], ['💐', 'valentines flowers love'],
  ['🦃', 'thanksgiving turkey autumn'], ['🥧', 'thanksgiving pie autumn'], ['🍂', 'thanksgiving leaves autumn'], ['🌽', 'thanksgiving corn autumn'],
  ['🍁', 'thanksgiving maple leaf autumn'], ['🥔', 'thanksgiving potato dinner'], ['🧡', 'thanksgiving orange heart autumn'], ['🍗', 'thanksgiving dinner food'],
  ['🌴', 'summer palm tree beach'], ['🍉', 'summer watermelon fruit'], ['🍦', 'summer ice cream'], ['🏄', 'summer surfing beach'],
  ['🐚', 'summer shell beach'], ['🍹', 'summer cocktail drink'],
];
const EMOJI_PACKS = {
  halloween: 'halloween',
  christmas: 'christmas',
  valentines: 'valentines',
  thanksgiving: 'thanksgiving',
  summer: 'summer',
};

const state = {
  imageUrl: null,
  imageElement: null,
  quote: 'a little moment',
  showQuote: true,
  emojis: [],
  selectedEmojiId: null,
};

const imageInput = document.querySelector('#image-input');
const previewImage = document.querySelector('#preview-image');
const placeholder = document.querySelector('#photo-placeholder');
const quoteInput = document.querySelector('#quote-input');
const quoteToggle = document.querySelector('#quote-toggle');
const quotePreview = document.querySelector('#quote-preview');
const emojiInput = document.querySelector('#emoji-input');
const addEmojiButton = document.querySelector('#add-emoji');
const emojiPalette = document.querySelector('#emoji-palette');
const emojiSearch = document.querySelector('#emoji-search');
const emojiResults = document.querySelector('#emoji-results');
const emojiPacks = document.querySelector('.emoji-packs');
const emojiCount = document.querySelector('#emoji-count');
const emojiLayer = document.querySelector('#emoji-layer');
const copyright = document.querySelector('#copyright');
const exportButton = document.querySelector('#export-button');
const frame = document.querySelector('#frame');
const exportArea = document.querySelector('#export-area');

quoteInput.value = state.quote;
syncPaletteLabels();
copyright.textContent = `Copyright © Manish ${new Date().getFullYear()}.`;

imageInput.addEventListener('change', handleImageUpload);
quoteInput.addEventListener('input', () => {
  state.quote = quoteInput.value;
  renderQuote();
});
quoteToggle.addEventListener('change', () => {
  state.showQuote = quoteToggle.checked;
  renderQuote();
});
addEmojiButton.addEventListener('click', () => addEmoji());
emojiInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addEmoji();
});
emojiPalette.addEventListener('click', (event) => {
  const button = event.target.closest('[data-emoji]');
  if (button) addEmoji(button.dataset.emoji);
});
emojiSearch.addEventListener('input', renderEmojiSearch);
emojiPacks.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pack]');
  if (!button) return;
  emojiSearch.value = EMOJI_PACKS[button.dataset.pack];
  emojiPacks.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
  renderEmojiSearch();
});
emojiResults.addEventListener('click', (event) => {
  const button = event.target.closest('[data-emoji]');
  if (!button) return;
  addEmoji(button.dataset.emoji);
  emojiSearch.value = '';
  renderEmojiSearch();
});
exportButton.addEventListener('click', exportPng);

async function handleImageUpload(event) {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const imageUrl = await readImageAsDataUrl(file);
    const image = new Image();
    image.onload = () => {
      state.imageUrl = imageUrl;
      state.imageElement = image;
      previewImage.src = imageUrl;
      previewImage.classList.add('visible');
      placeholder.hidden = true;
    };
    image.src = imageUrl;
  } catch (error) {
    window.alert('Could not load this image. Please choose another one.');
    console.error(error);
  }
}

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function addEmoji(value = emojiInput.value) {
  const emoji = typeof value === 'string' ? value.trim() : '';
  if (!emoji) return;

  const index = state.emojis.length;
  const position = STARTING_POSITIONS[index] ?? {
    x: 8 + (index % 4) * 25,
    y: 12 + Math.floor(index / 4) * 22,
  };
  state.emojis.push({
    id: crypto.randomUUID(),
    value: emoji,
    x: position.x,
    y: position.y,
    color: STARTING_COLORS[index % STARTING_COLORS.length],
    size: STARTING_SIZES[index % STARTING_SIZES.length],
    rotation: STARTING_ROTATIONS[index % STARTING_ROTATIONS.length],
  });
  state.selectedEmojiId = state.emojis.at(-1).id;
  emojiInput.value = '';
  renderEmojis();
}

function syncPaletteLabels() {
  emojiPalette.querySelectorAll('[data-emoji]').forEach((button) => {
    const emoji = button.textContent.trim();
    button.dataset.emoji = emoji;
    button.setAttribute('aria-label', `Add ${emoji}`);
    button.title = `Add ${emoji}`;
  });
}

function renderEmojiSearch() {
  const terms = emojiSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  emojiResults.replaceChildren();
  emojiPacks.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('active', EMOJI_PACKS[button.dataset.pack] === terms.join(' '));
  });
  if (!terms.length) return;

  const matches = EMOJI_CATALOG.filter(([emoji, keywords]) => {
    const searchText = `${emoji} ${keywords}`;
    return terms.every((term) => searchText.includes(term));
  }).slice(0, 18);
  if (!matches.length) {
    emojiResults.textContent = 'No match yet - paste any emoji below.';
    return;
  }

  matches.forEach(([emoji, keywords]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.emoji = emoji;
    button.setAttribute('aria-label', `Add ${emoji}`);
    button.title = `Add ${keywords}`;
    button.textContent = `${emoji}\uFE0E`;
    emojiResults.append(button);
  });
}

function renderQuote() {
  quotePreview.textContent = state.quote || ' ';
  quotePreview.classList.toggle('hidden', !state.showQuote);
}

function renderEmojis() {
  emojiLayer.replaceChildren();
  emojiCount.textContent = state.emojis.length;

  for (const emoji of state.emojis) {
    const element = document.createElement('span');
    element.className = `emoji${emoji.id === state.selectedEmojiId ? ' selected' : ''}`;
    element.textContent = emoji.value;
    element.style.left = `${emoji.x}%`;
    element.style.top = `${emoji.y}%`;
    element.style.color = emoji.color;
    element.style.fontSize = `${emoji.size}%`;
    element.style.transform = `rotate(${emoji.rotation}deg)`;
    element.dataset.id = emoji.id;
    element.addEventListener('pointerdown', startDrag);
    if (emoji.id === state.selectedEmojiId) addDirectTransformHandles(element, emoji);
    emojiLayer.append(element);
  }
}

function removeEmoji(id) {
  state.emojis = state.emojis.filter((emoji) => emoji.id !== id);
  if (state.selectedEmojiId === id) state.selectedEmojiId = null;
  renderEmojis();
}

function startDrag(event) {
  event.preventDefault();
  const id = event.currentTarget.dataset.id;
  state.selectedEmojiId = id;
  renderEmojis();

  const emoji = state.emojis.find((item) => item.id === id);
  const rect = frame.getBoundingClientRect();
  const pointerOffsetX = event.clientX - rect.left - (emoji.x / 100) * rect.width;
  const pointerOffsetY = event.clientY - rect.top - (emoji.y / 100) * rect.height;

  const move = (moveEvent) => {
    emoji.x = ((moveEvent.clientX - rect.left - pointerOffsetX) / rect.width) * 100;
    emoji.y = ((moveEvent.clientY - rect.top - pointerOffsetY) / rect.height) * 100;
    const active = emojiLayer.querySelector(`[data-id="${id}"]`);
    if (active) {
      active.style.left = `${emoji.x}%`;
      active.style.top = `${emoji.y}%`;
      keepEmojiInsideExportArea(emoji, active);
    }
  };
  const stop = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);
  };
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', stop, { once: true });
}

function keepEmojiInsideExportArea(emoji, element) {
  const areaRect = exportArea.getBoundingClientRect();
  const emojiRect = element.getBoundingClientRect();
  const horizontalCorrection = emojiRect.left < areaRect.left
    ? areaRect.left - emojiRect.left
    : emojiRect.right > areaRect.right ? areaRect.right - emojiRect.right : 0;
  const verticalCorrection = emojiRect.top < areaRect.top
    ? areaRect.top - emojiRect.top
    : emojiRect.bottom > areaRect.bottom ? areaRect.bottom - emojiRect.bottom : 0;

  if (!horizontalCorrection && !verticalCorrection) return;
  const transform = new DOMMatrix(getComputedStyle(frame).transform);
  const inverse = transform.inverse();
  const localX = inverse.a * horizontalCorrection + inverse.c * verticalCorrection;
  const localY = inverse.b * horizontalCorrection + inverse.d * verticalCorrection;
  emoji.x += (localX / frame.clientWidth) * 100;
  emoji.y += (localY / frame.clientHeight) * 100;
  element.style.left = `${emoji.x}%`;
  element.style.top = `${emoji.y}%`;
}

function addDirectTransformHandles(element, emoji) {
  const rotateHandle = document.createElement('button');
  rotateHandle.className = 'emoji-handle emoji-handle-rotate';
  rotateHandle.type = 'button';
  rotateHandle.textContent = '↻';
  rotateHandle.setAttribute('aria-label', `Rotate ${emoji.value}`);
  rotateHandle.addEventListener('pointerdown', (event) => startRotate(event, emoji, element));

  const resizeHandle = document.createElement('button');
  resizeHandle.className = 'emoji-handle emoji-handle-resize';
  resizeHandle.type = 'button';
  resizeHandle.textContent = '↗';
  resizeHandle.setAttribute('aria-label', `Resize ${emoji.value}`);
  resizeHandle.addEventListener('pointerdown', (event) => startResize(event, emoji, element));

  const deleteHandle = document.createElement('button');
  deleteHandle.className = 'emoji-handle emoji-handle-delete';
  deleteHandle.type = 'button';
  deleteHandle.textContent = '×';
  deleteHandle.setAttribute('aria-label', `Remove ${emoji.value}`);
  deleteHandle.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    removeEmoji(emoji.id);
  });

  element.append(rotateHandle, resizeHandle, deleteHandle, createEmojiColorControls(emoji));
}

function createEmojiColorControls(emoji) {
  const controls = document.createElement('div');
  controls.className = 'emoji-color-controls';
  controls.setAttribute('aria-label', `Color options for ${emoji.value}`);
  controls.addEventListener('pointerdown', (event) => event.stopPropagation());

  EMOJI_COLORS.forEach((color) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'emoji-color-swatch';
    swatch.style.setProperty('--swatch', color);
    swatch.setAttribute('aria-label', `Set ${emoji.value} to ${color}`);
    swatch.setAttribute('title', 'Set emoji color');
    swatch.addEventListener('click', () => setEmojiColor(emoji, color));
    controls.append(swatch);
  });

  const customColor = document.createElement('input');
  customColor.type = 'color';
  customColor.value = emoji.color;
  customColor.className = 'emoji-custom-color';
  customColor.setAttribute('aria-label', `Choose a custom color for ${emoji.value}`);
  customColor.addEventListener('input', () => setEmojiColor(emoji, customColor.value));
  const customColorButton = document.createElement('label');
  customColorButton.className = 'emoji-custom-color-button';
  customColorButton.setAttribute('title', 'Choose a custom emoji color');
  customColorButton.textContent = '✨';
  customColorButton.append(customColor);
  controls.append(customColorButton);
  return controls;
}

function setEmojiColor(emoji, color) {
  emoji.color = color;
  const activeEmoji = emojiLayer.querySelector(`[data-id="${emoji.id}"]`);
  if (activeEmoji) activeEmoji.style.color = color;
}

function startResize(event, emoji, element) {
  event.preventDefault();
  event.stopPropagation();
  const startX = event.clientX;
  const startY = event.clientY;
  const startSize = emoji.size;
  const rect = frame.getBoundingClientRect();

  const move = (moveEvent) => {
    const distance = Math.max(moveEvent.clientX - startX, moveEvent.clientY - startY);
    emoji.size = clamp(startSize + (distance / rect.width) * 100, 30, 220);
    element.style.fontSize = `${emoji.size}%`;
    keepEmojiInsideExportArea(emoji, element);
  };
  const stop = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);
    renderEmojis();
  };
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', stop, { once: true });
}

function startRotate(event, emoji, element) {
  event.preventDefault();
  event.stopPropagation();
  const elementRect = element.getBoundingClientRect();
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  const startAngle = getPointerAngle(event, centerX, centerY);
  const startRotation = emoji.rotation;

  const move = (moveEvent) => {
    emoji.rotation = Math.round(startRotation + getPointerAngle(moveEvent, centerX, centerY) - startAngle);
    element.style.transform = `rotate(${emoji.rotation}deg)`;
  };
  const stop = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);
    renderEmojis();
  };
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', stop, { once: true });
}

function getPointerAngle(event, centerX, centerY) {
  return Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function exportPng() {
  exportButton.disabled = true;
  exportButton.firstChild.textContent = 'Making PNG ';

  try {
    const canvas = await capturePreview(null, 2);
    const png = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!png) throw new Error('PNG creation failed');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(png);
    link.download = 'little-moment.png';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  } catch (error) {
    window.alert('Could not export this frame. Please try again.');
    console.error(error);
  } finally {
    exportButton.disabled = false;
    exportButton.firstChild.textContent = 'Export PNG ';
  }
}

async function capturePreview(backgroundColor = null, animationFrame = 0) {
  if (!window.html2canvas) throw new Error('Preview capture did not load');
  if (document.fonts?.ready) await document.fonts.ready;

  const scene = getExportScene();
  const quoteDisplay = quotePreview.style.display;
  const emojiVisibility = emojiLayer.style.visibility;
  exportArea.classList.add('is-exporting');
  quotePreview.style.display = 'none';
  emojiLayer.style.visibility = 'hidden';
  try {
    const canvas = await window.html2canvas(exportArea, {
      backgroundColor,
      scale: EXPORT_WIDTH / exportArea.getBoundingClientRect().width,
      useCORS: true,
      logging: false,
      foreignObjectRendering: false,
    });
    drawExportTypography(canvas, scene, animationFrame);
    if (!backgroundColor) return canvas;

    const opaqueCanvas = document.createElement('canvas');
    opaqueCanvas.width = canvas.width;
    opaqueCanvas.height = canvas.height;
    const context = opaqueCanvas.getContext('2d');
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, opaqueCanvas.width, opaqueCanvas.height);
    context.drawImage(canvas, 0, 0);
    return opaqueCanvas;
  } finally {
    quotePreview.style.display = quoteDisplay;
    emojiLayer.style.visibility = emojiVisibility;
    exportArea.classList.remove('is-exporting');
  }
}

function getExportScene() {
  const areaRect = exportArea.getBoundingClientRect();
  const scale = EXPORT_WIDTH / areaRect.width;
  const frameTransform = getComputedStyle(frame).transform;
  const frameAngle = getTransformAngle(frameTransform);
  const getCoordinates = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: (rect.left - areaRect.left) * scale,
      y: (rect.top - areaRect.top) * scale,
      width: rect.width * scale,
      height: rect.height * scale,
    };
  };

  const quoteStyle = getComputedStyle(quotePreview);
  const quote = state.showQuote && state.quote.trim()
    ? { ...getCoordinates(quotePreview), value: state.quote, font: `${parseFloat(quoteStyle.fontSize) * scale}px ${quoteStyle.fontFamily}`, color: quoteStyle.color, angle: frameAngle }
    : null;
  const emojis = state.emojis.map((emoji) => {
    const element = emojiLayer.querySelector(`[data-id="${emoji.id}"]`);
    const style = getComputedStyle(element);
    return {
      ...getCoordinates(element),
      value: emoji.value,
      font: `${parseFloat(style.fontSize) * scale}px ${style.fontFamily}`,
      color: style.color,
      angle: frameAngle + getTransformAngle(style.transform),
    };
  });

  return { quote, emojis };
}

function drawExportTypography(canvas, scene, animationFrame) {
  const context = canvas.getContext('2d');
  context.setTransform(1, 0, 0, 1, 0, 0);
  if (scene.quote) {
    drawExportText(context, scene.quote);
  }
  scene.emojis.forEach((emoji, index) => {
    drawDistortedExportText(context, emoji, animationFrame + index * 0.7);
  });
}

function drawDistortedExportText(context, text, phase) {
  const layer = document.createElement('canvas');
  layer.width = context.canvas.width;
  layer.height = context.canvas.height;
  drawExportText(layer.getContext('2d'), text);

  const sliceHeight = 4;
  const amplitude = phase ? 3.5 : 0;
  for (let y = 0; y < layer.height; y += sliceHeight) {
    const offset = Math.sin(y * 0.09 + phase * 1.7) * amplitude;
    context.drawImage(layer, 0, y, layer.width, sliceHeight, offset, y, layer.width, sliceHeight);
  }
}

function drawExportText(context, text, offsetX = 0) {
  context.save();
  context.translate(text.x + text.width / 2 + offsetX, text.y + text.height / 2);
  context.rotate(text.angle);
  context.fillStyle = text.color;
  context.font = text.font;
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';
  const metrics = context.measureText(text.value);
  const inkWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const inkHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  const drawX = -inkWidth / 2 + metrics.actualBoundingBoxLeft;
  const drawY = inkHeight / 2 - metrics.actualBoundingBoxDescent;
  context.fillText(text.value, drawX, drawY);
  context.restore();
}

function getTransformAngle(transform) {
  if (!transform || transform === 'none') return 0;
  const values = transform.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
  return values ? Math.atan2(values[1], values[0]) : 0;
}

function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

renderQuote();
renderEmojis();
