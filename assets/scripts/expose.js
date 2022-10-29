// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  let hornSelection = document.getElementById('horn-select');
  let audioElement = document.querySelector('audio');
  let playButton = document.querySelector('button');
  let hornImage = document.querySelector("img[src=\"assets/images/no-image.png\"]")
  let volumeSlider = document.getElementById('volume-controls').getElementsByTagName('input')[0]
  let volumeImage = document.querySelector("img[src=\"assets/icons/volume-level-2.svg\"]")
  let selectedOption;
  const jsConfetti = new JSConfetti();

  hornSelection.addEventListener('change', (e) => {
    selectedOption = e.target.value;
    audioElement.src = `./assets/audio/${selectedOption}.mp3`
    hornImage.src = `./assets/images/${selectedOption}.svg`
  })
  
  playButton.onclick = (e) => {
    audioElement.play()

    if (selectedOption === 'party-horn')
      jsConfetti.addConfetti()
  }

  volumeSlider.onchange = (e) => {
    let level
    if (volumeSlider.value == 0)
      level = 0      
    else if (volumeSlider.value < 33)
      level = 1
    else if (volumeSlider.value < 67)
      level = 2
    else
      level = 3

    volumeImage.src = `./assets/icons/volume-level-${level}.svg`
    audioElement.volume = (volumeSlider.value / 100)
  }
}
