const DEFAULT_EXPORT_WIDTH = 720;
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
const photoWrap = document.querySelector('.photo-wrap');
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
    const exportWidth = Number(document.querySelector('[name="export-size"]:checked').value);
    const aesthetic = document.querySelector('[name="export-style"]:checked').value === 'aesthetic';
    const canvas = await capturePreview({ exportWidth, aesthetic });
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

async function capturePreview({ exportWidth = DEFAULT_EXPORT_WIDTH, aesthetic = false } = {}) {
  if (!window.html2canvas) throw new Error('Preview capture did not load');
  if (document.fonts?.ready) await document.fonts.ready;

  const scene = getExportScene(exportWidth);
  const quoteDisplay = quotePreview.style.display;
  const emojiVisibility = emojiLayer.style.visibility;
  exportArea.classList.add('is-exporting');
  quotePreview.style.display = 'none';
  emojiLayer.style.visibility = 'hidden';
  try {
    const canvas = await window.html2canvas(exportArea, {
      backgroundColor: null,
      scale: exportWidth / exportArea.getBoundingClientRect().width,
      useCORS: true,
      logging: false,
      foreignObjectRendering: false,
    });
    drawExportTypography(canvas, scene, aesthetic);
    return canvas;
  } finally {
    quotePreview.style.display = quoteDisplay;
    emojiLayer.style.visibility = emojiVisibility;
    exportArea.classList.remove('is-exporting');
  }
}

function getExportScene(exportWidth = DEFAULT_EXPORT_WIDTH) {
  const areaRect = exportArea.getBoundingClientRect();
  const scale = exportWidth / areaRect.width;
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
  const photoRect = photoWrap.getBoundingClientRect();
  const photo = state.imageUrl
    ? {
        centerX: (photoRect.left + photoRect.width / 2 - areaRect.left) * scale,
        centerY: (photoRect.top + photoRect.height / 2 - areaRect.top) * scale,
        width: photoWrap.offsetWidth * scale,
        height: photoWrap.offsetHeight * scale,
        angle: frameAngle,
      }
    : null;

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

  return { photo, quote, emojis };
}

function drawExportTypography(canvas, scene, aesthetic) {
  const context = canvas.getContext('2d');
  context.setTransform(1, 0, 0, 1, 0, 0);
  if (aesthetic && scene.photo) {
    drawAestheticPhoto(canvas, scene.photo);
  }
  if (scene.quote) {
    drawExportText(context, scene.quote);
  }
  scene.emojis.forEach((emoji) => drawExportText(context, emoji, 0, true));
}

function drawAestheticPhoto(canvas, photo) {
  const width = Math.ceil(photo.width);
  const height = Math.ceil(photo.height);
  const source = document.createElement('canvas');
  source.width = width;
  source.height = height;
  const sourceContext = source.getContext('2d');
  sourceContext.translate(width / 2, height / 2);
  sourceContext.rotate(-photo.angle);
  sourceContext.drawImage(canvas, -photo.centerX, -photo.centerY);

  const image = sourceContext.getImageData(0, 0, width, height);
  const pixels = image.data;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
      const highlight = Math.max(0, luminance - 150) * 0.055;
      const grain = (aestheticNoise(x, y) - 0.5) * 3;
      pixels[index] = clamp((red - 128) * 1.045 + 132 + highlight + grain + 2, 0, 255);
      pixels[index + 1] = clamp((green - 128) * 1.035 + 132 + highlight + grain + 1, 0, 255);
      pixels[index + 2] = clamp((blue - 128) * 1.055 + 132 + highlight * 1.15 + grain + 3, 0, 255);
    }
  }
  sourceContext.setTransform(1, 0, 0, 1, 0, 0);
  sourceContext.putImageData(image, 0, 0);
  drawAestheticGlow(sourceContext, width, height);

  const context = canvas.getContext('2d');
  context.save();
  context.translate(photo.centerX, photo.centerY);
  context.rotate(photo.angle);
  context.drawImage(source, -width / 2, -height / 2);
  context.restore();
}

function drawAestheticGlow(context, width, height) {
  context.save();
  context.globalCompositeOperation = 'soft-light';

  const iridescence = context.createLinearGradient(0, height, width, 0);
  iridescence.addColorStop(0, '#ff7fba4a');
  iridescence.addColorStop(0.34, '#ffd6ec18');
  iridescence.addColorStop(0.62, '#d9f5ff1c');
  iridescence.addColorStop(1, '#70d8ff42');
  context.fillStyle = iridescence;
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = 'screen';

  const pinkGlow = context.createRadialGradient(width * 0.08, height * 0.12, 0, width * 0.08, height * 0.12, width * 0.72);
  pinkGlow.addColorStop(0, '#ff8fc97a');
  pinkGlow.addColorStop(0.42, '#ffbad538');
  pinkGlow.addColorStop(1, '#ffbad500');
  context.fillStyle = pinkGlow;
  context.fillRect(0, 0, width, height);

  const blueGlow = context.createRadialGradient(width * 0.92, height * 0.82, 0, width * 0.92, height * 0.82, width * 0.65);
  blueGlow.addColorStop(0, '#a8e9ff50');
  blueGlow.addColorStop(0.5, '#c9f2ff1f');
  blueGlow.addColorStop(1, '#c9f2ff00');
  context.fillStyle = blueGlow;
  context.fillRect(0, 0, width, height);

  const sheen = context.createLinearGradient(0, height, width, 0);
  sheen.addColorStop(0.28, '#ffffff00');
  sheen.addColorStop(0.46, '#ffffff0a');
  sheen.addColorStop(0.53, '#ffffff28');
  sheen.addColorStop(0.61, '#ffffff08');
  sheen.addColorStop(0.76, '#ffffff00');
  context.fillStyle = sheen;
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = 'source-over';
  drawGlossySparkle(context, width * 0.79, height * 0.18, width * 0.045);
  drawGlossySparkle(context, width * 0.18, height * 0.68, width * 0.028);
  drawGlossySparkle(context, width * 0.67, height * 0.78, width * 0.016);
  context.restore();
}

function drawGlossySparkle(context, centerX, centerY, radius) {
  context.save();
  context.translate(centerX, centerY);
  context.beginPath();
  context.moveTo(0, -radius);
  context.bezierCurveTo(radius * 0.12, -radius * 0.2, radius * 0.2, -radius * 0.12, radius, 0);
  context.bezierCurveTo(radius * 0.2, radius * 0.12, radius * 0.12, radius * 0.2, 0, radius);
  context.bezierCurveTo(-radius * 0.12, radius * 0.2, -radius * 0.2, radius * 0.12, -radius, 0);
  context.bezierCurveTo(-radius * 0.2, -radius * 0.12, -radius * 0.12, -radius * 0.2, 0, -radius);
  context.closePath();
  context.fillStyle = '#ffffffd9';
  context.shadowColor = '#ff69b4b8';
  context.shadowBlur = radius * 0.65;
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = '#ff69b48f';
  context.lineWidth = Math.max(1, radius * 0.08);
  context.stroke();
  context.restore();
}

function aestheticNoise(x, y) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function drawExportText(context, text, offsetX = 0, useFontBox = false) {
  context.save();
  context.translate(text.x + text.width / 2 + offsetX, text.y + text.height / 2);
  context.rotate(text.angle);
  context.fillStyle = text.color;
  context.font = text.font;
  context.textBaseline = 'alphabetic';
  const metrics = context.measureText(text.value);
  if (useFontBox) {
    const ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent;
    const descent = metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent;
    context.textAlign = 'center';
    context.fillText(text.value, 0, (ascent - descent) / 2);
  } else {
    const inkWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const inkHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    context.textAlign = 'left';
    context.fillText(text.value, -inkWidth / 2 + metrics.actualBoundingBoxLeft, inkHeight / 2 - metrics.actualBoundingBoxDescent);
  }
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
