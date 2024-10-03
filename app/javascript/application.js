// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

const words = [
    "Apple", "Galaxy", "Whisper", "Dancer", "Horizon",
    "Velvet", "Lantern", "Puzzle", "Ocean", "Falcon",
    "Echo", "Thunder", "Mosaic", "Journey", "Scribe",
    "Compass", "Shadow", "Ember", "Willow", "Quasar",
    "Cascade", "Nimbus", "Twilight", "Voyage", "Serendipity",
    "Mirage", "Tapestry", "Ember", "Labyrinth", "Harmony",
    "Vortex", "Radiance", "Solstice", "Enigma", "Aurora",
    "Chroma", "Zenith", "Driftwood", "Ember", "Prism",
    "Reverie", "Paradox", "Oasis", "Starlight", "Whimsy",
    "Elysium", "Quantum", "Ethereal", "Soliloquy", "Kaleidoscope",
    "YoYo"
];

function submit(selected) {
  if(selected) {
    document.getElementById("input").value = selected;
  }
  document.getElementById("suggestions").innerHTML = '';
  document.getElementById("result").style.display = "none";
  document.getElementById("characters_error").style.display = "none";
  let value = document.getElementById("input").value;
  let normalised = value.trim().toLowerCase();
  if((/[^a-z]/).test(normalised)){
    document.getElementById("characters_error").style.display = "block";
  } else {
    document.getElementById("result").innerText = normalised;
    document.getElementById("result").style.display = "block";
    document.getElementById("result").href = `/${selected}`;
  }
}

globalThis.submit = submit

document.getElementById("form").addEventListener('submit', function(e) {
  e.preventDefault();
  submit();
})

function autocomplete(e) {
  document.getElementById("result").style.display = 'none';
  document.getElementById("suggestions").innerHTML = '';
  let input = e.target.value.toLowerCase()
  if(!input) {
    return
  }
  let scored = words.map(word => ({
    word,
    score: word.toLowerCase().includes(input) ? (1 - (word.indexOf(input) / word.length)) : 0
  }))
  let sorted = scored.sort((a, b) => {
    return b.score - a.score
  })
  let filtered = sorted.filter(word => word.score != 0)
  let ranked = filtered.map(word => word.word)
  document.getElementById("suggestions").innerHTML = ranked.slice(0, 3).map(word => (
    `<div class="infobox suggestion" onclick="globalThis.submit('${word}')">${word}</div>`
  )).join('')
}

document.getElementById("input").addEventListener('keyup', autocomplete)