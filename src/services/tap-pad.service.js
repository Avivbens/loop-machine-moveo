const BUTTONS = [
    { name: '1', url: '../assets/sounds/120_future_funk_beats_25.mp3', audio: new Audio(require('../assets/sounds/120_future_funk_beats_25.mp3')) },
    { name: '2', url: '../assets/sounds/120_stutter_breakbeats_16.mp3', audio: new Audio(require('../assets/sounds/120_stutter_breakbeats_16.mp3')) },
    { name: '3', url: '../assets/sounds/Bass_Warwick_heavy_funk_groove_on_E_120_BPM.mp3', audio: new Audio(require('../assets/sounds/Bass_Warwick_heavy_funk_groove_on_E_120_BPM.mp3')) },
    { name: '4', url: '../assets/sounds/electric_guitar_coutry_slide_120bpm-B.mp3', audio: new Audio(require('../assets/sounds/electric_guitar_coutry_slide_120bpm-B.mp3')) },
    { name: '5', url: '../assets/sounds/FUD_120_StompySlosh.mp3', audio: new Audio(require('../assets/sounds/FUD_120_StompySlosh.mp3')) },
    { name: '6', url: '../assets/sounds/GrooveB_120bpm_Tanggu.mp3', audio: new Audio(require('../assets/sounds/GrooveB_120bpm_Tanggu.mp3')) },
    { name: '7', url: '../assets/sounds/MazePolitics_120_Perc.mp3', audio: new Audio(require('../assets/sounds/MazePolitics_120_Perc.mp3')) },
    { name: '8', url: '../assets/sounds/PAS3GROOVE1.03B.mp3', audio: new Audio(require('../assets/sounds/PAS3GROOVE1.03B.mp3')) },
    { name: '9', url: '../assets/sounds/SilentStar_120_Em_OrganSynth.mp3', audio: new Audio(require('../assets/sounds/SilentStar_120_Em_OrganSynth.mp3')) },

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
    try {
        audio.pause()
        audio.currentTime = 0
        audio.play()
    } catch (error) {
        throw error
    }
}

function stopSound(audio) {
    try {
        audio.pause()
        audio.currentTime = 0
    } catch (error) {
    }
}