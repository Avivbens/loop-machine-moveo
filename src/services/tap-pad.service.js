const BUTTONS = [
    { name: '1', audio: new Audio(require('../assets/sounds/120_future_funk_beats_25.mp3')) },
    { name: '2', audio: new Audio(require('../assets/sounds/120_stutter_breakbeats_16.mp3')) },
    { name: '3', audio: new Audio(require('../assets/sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3')) },
    { name: '4', audio: new Audio(require('../assets/sounds/electric guitar coutry slide 120bpm - B.mp3')) },
    { name: '5', audio: new Audio(require('../assets/sounds/FUD_120_StompySlosh.mp3')) },
    { name: '6', audio: new Audio(require('../assets/sounds/GrooveB_120bpm_Tanggu.mp3')) },
    { name: '7', audio: new Audio(require('../assets/sounds/MazePolitics_120_Perc.mp3')) },
    { name: '8', audio: new Audio(require('../assets/sounds/PAS3GROOVE1.03B.mp3')) },
    { name: '9', audio: new Audio(require('../assets/sounds/SilentStar_120_Em_OrganSynth.mp3')) },

]

export const tapPadService = {
    getButtons,
    playSound,
    stopSound
}

function getButtons() {
    return BUTTONS
    const res = JSON.parse(localStorage.buttons || null) || BUTTONS
    localStorage.buttons = JSON.stringify(res)

    return res
}


function playSound(audio) {
    audio.pause()
    audio.currentTime = 0
    audio.play()
}

function stopSound(audio) {
    audio.pause()
    audio.currentTime = 0
}