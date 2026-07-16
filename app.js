const MAX_EMOJIS = 8;
const EXPORT_SCALE = 3;
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
const emojiCount = document.querySelector('#emoji-count');
const emojiLayer = document.querySelector('#emoji-layer');
const emojiList = document.querySelector('#emoji-list');
const exportButton = document.querySelector('#export-button');
const frame = document.querySelector('#frame');

quoteInput.value = state.quote;

imageInput.addEventListener('change', handleImageUpload);
quoteInput.addEventListener('input', () => {
  state.quote = quoteInput.value;
  renderQuote();
});
quoteToggle.addEventListener('change', () => {
  state.showQuote = quoteToggle.checked;
  renderQuote();
});
addEmojiButton.addEventListener('click', addEmoji);
emojiInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addEmoji();
});
exportButton.addEventListener('click', exportPng);

function handleImageUpload(event) {
  const [file] = event.target.files;
  if (!file) return;

  if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
  state.imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    state.imageElement = image;
    previewImage.src = state.imageUrl;
    previewImage.classList.add('visible');
    placeholder.hidden = true;
  };
  image.src = state.imageUrl;
}

function addEmoji() {
  const emoji = emojiInput.value.trim();
  if (!emoji || state.emojis.length >= MAX_EMOJIS) return;

  const position = STARTING_POSITIONS[state.emojis.length];
  state.emojis.push({
    id: crypto.randomUUID(),
    value: emoji,
    x: position.x,
    y: position.y,
    color: STARTING_COLORS[state.emojis.length],
  });
  emojiInput.value = '';
  renderEmojis();
}

function renderQuote() {
  quotePreview.textContent = state.quote || ' ';
  quotePreview.classList.toggle('hidden', !state.showQuote);
}

function renderEmojis() {
  emojiLayer.replaceChildren();
  emojiList.replaceChildren();
  emojiCount.textContent = `${state.emojis.length} / ${MAX_EMOJIS}`;
  addEmojiButton.disabled = state.emojis.length >= MAX_EMOJIS;
  emojiInput.disabled = state.emojis.length >= MAX_EMOJIS;

  for (const emoji of state.emojis) {
    const element = document.createElement('span');
    element.className = `emoji emoji-${state.emojis.indexOf(emoji)}${emoji.id === state.selectedEmojiId ? ' selected' : ''}`;
    element.textContent = emoji.value;
    element.style.left = `${emoji.x}%`;
    element.style.top = `${emoji.y}%`;
    element.style.color = emoji.color;
    element.dataset.id = emoji.id;
    element.addEventListener('pointerdown', startDrag);
    emojiLayer.append(element);

    const chip = document.createElement('div');
    chip.className = 'emoji-chip';
    chip.innerHTML = `<span>${emoji.value}</span><input type="color" value="${emoji.color}" aria-label="Color for ${emoji.value}" title="Choose emoji color"><button type="button" aria-label="Remove ${emoji.value}" title="Remove emoji">×</button>`;
    chip.querySelector('input').addEventListener('input', (event) => {
      emoji.color = event.target.value;
      const preview = emojiLayer.querySelector(`[data-id="${emoji.id}"]`);
      if (preview) preview.style.color = emoji.color;
    });
    chip.querySelector('button').addEventListener('click', () => removeEmoji(emoji.id));
    emojiList.append(chip);
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
    emoji.x = clamp(((moveEvent.clientX - rect.left - pointerOffsetX) / rect.width) * 100, -8, 92);
    emoji.y = clamp(((moveEvent.clientY - rect.top - pointerOffsetY) / rect.height) * 100, -8, 92);
    const active = emojiLayer.querySelector(`[data-id="${id}"]`);
    if (active) {
      active.style.left = `${emoji.x}%`;
      active.style.top = `${emoji.y}%`;
    }
  };
  const stop = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', stop);
  };
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', stop, { once: true });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function exportPng() {
  exportButton.disabled = true;
  exportButton.firstChild.textContent = 'Making PNG ';

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = document.createElement('canvas');
    const width = 480;
    const height = 600;
    canvas.width = width * EXPORT_SCALE;
    canvas.height = height * EXPORT_SCALE;
    const context = canvas.getContext('2d');
    context.scale(EXPORT_SCALE, EXPORT_SCALE);
    context.translate(width / 2, height / 2);
    context.rotate((-5 * Math.PI) / 180);
    context.translate(-width / 2, -height / 2);

    context.fillStyle = '#f8f6ef';
    context.fillRect(0, 0, width, height);

    const photoX = 32;
    const photoY = 32;
    const photoSize = 416;
    if (state.imageElement) {
      drawCoverImage(context, state.imageElement, photoX, photoY, photoSize, photoSize);
      context.fillStyle = 'rgba(0, 0, 0, .16)';
      context.fillRect(photoX, photoY, photoSize, 3);
      context.fillRect(photoX, photoY, 3, photoSize);
    } else {
      context.fillStyle = '#dedbd1';
      context.fillRect(photoX, photoY, photoSize, photoSize);
      context.fillStyle = '#716f68';
      context.font = '40px "Gochi Hand"';
      context.textAlign = 'center';
      context.fillText('pick a photo', width / 2, 240);
    }

    if (state.showQuote && state.quote.trim()) {
      context.fillStyle = '#242422';
      context.font = '42px "Gochi Hand"';
      context.textAlign = 'right';
      drawWrappedRightText(context, state.quote, 442, 508, 390, 44);
    }

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '52px "Noto Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    state.emojis.forEach((emoji, index) => {
      context.save();
      context.translate((emoji.x / 100) * width + 30, (emoji.y / 100) * height + 30);
      context.rotate(([-10, 0, -10, 10, 15, 0, -5, 0][index] * Math.PI) / 180);
      context.fillStyle = emoji.color;
      context.fillText(emoji.value, 0, 0);
      context.restore();
    });

    const png = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!png) throw new Error('PNG creation failed');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(png);
    link.download = 'little-frame.png';
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    window.alert('Could not export this frame. Please try again.');
    console.error(error);
  } finally {
    exportButton.disabled = false;
    exportButton.firstChild.textContent = 'Export transparent PNG ';
  }
}

function drawCoverImage(context, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawWrappedRightText(context, text, rightX, firstY, maxWidth, lineHeight) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.slice(0, 2).forEach((item, index) => context.fillText(item, rightX, firstY + index * lineHeight));
}

renderQuote();
renderEmojis();
