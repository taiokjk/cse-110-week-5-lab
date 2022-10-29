// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select')
  let selectedLanguage

  const textElement = document.getElementById('text-to-speak')
  let textToSpeechValue = ''

  const talkButton = document.querySelector('button')

  const smileImage = document.querySelector("img[alt=\"Smiling face\"]")
  const smileyFace = 'assets/images/smiling.png'
  const smileyFaceOpen = 'assets/images/smiling-open.png'

  let voices = []
  synth.addEventListener('voiceschanged', () => {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option')
      option.textContent = `${voices[i].name} (${voices[i].lang})`

      if (voices[i].default) {
        option.textContent += ' - DEFAULT'
      }

      option.setAttribute('data-lang', voices[i].lang)
      option.setAttribute('data-name', voices[i].name)
      voiceSelect.appendChild(option)
    }
  })

  textElement.onchange = (e) => {
    textToSpeechValue = textElement.value
  }

  voiceSelect.onchange = (e) => {
    selectedLanguage = e.target.options[e.target.selectedIndex].getAttribute('data-name')
  }

  talkButton.onclick = (e) => {
    e.preventDefault()

    const utterThis = new SpeechSynthesisUtterance(textToSpeechValue)

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedLanguage) {
        utterThis.voice = voices[i]
      }
    }

    utterThis.onstart = () => {
      smileImage.src = smileyFaceOpen
    }
    utterThis.onend = () => {
      smileImage.src = smileyFace
    }
    synth.speak(utterThis)
  }
}
