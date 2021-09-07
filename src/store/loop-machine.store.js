import Vue from 'vue'
import Vuex from 'vuex'
import { tapPadService } from '../services/tap-pad.service'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        soundsToPlay: [],
        sounds: tapPadService.getButtons(),
        playInterval: null,

        actionsQueue: null,
        startRecTime: null,
        stopRecTime: null,

        rec: null,
        // rec: JSON.parse(localStorage.rec || null) || null,
        isPlayingRec: false
    },
    getters: {
        sounds(state) {
            return state.sounds
        },
        rec(state) {
            return state.rec
        }
    },
    mutations: {
        toggleSoundToPlay({ soundsToPlay }, { button }) {
            const idx = soundsToPlay.findIndex(sound => sound.name === button.name)
            if (idx >= 0) {
                soundsToPlay.splice(idx, 1)
            } else {
                soundsToPlay.push(button)
            }
        },
        zeroSoundToPlay(state) {
            state.soundsToPlay = []
        },
        startPlay({ soundsToPlay }) {
            soundsToPlay.forEach(sound => {
                try {
                    tapPadService.playSound(sound.audio)
                } catch (error) {
                    // TODO handle save as deep copy for later
                    // console.log(`'../assets/sounds/120_future_funk_beats_25.mp3' === sound.url`, '../assets/sounds/120_future_funk_beats_25.mp3' === sound.url)
                    // console.log(`sound.url`, sound.url)
                    // const { url } = sound
                    // const audio = new Audio(`${url}`)
                    // const audio = new Audio(require(`${url}`))
                    // const audio = new Audio(require('../assets/sounds/120_future_funk_beats_25.mp3'))
                    // tapPadService.playSound(audio)
                }
            })
        },

        stopPlay({ sounds }) {
            sounds.forEach(sound => {
                tapPadService.stopSound(sound.audio)
            })
        },

        setPlayInterval(state, { interval }) {
            clearInterval(state.playInterval)

            state.playInterval = interval
        },


        startRec(state) {
            state.startRecTime = Date.now()
            state.stopRecTime = null
            state.actionsQueue = []
        },
        stopRec(state) {
            state.stopRecTime = Date.now()

            // converting time to relative rec time
            const rec = state.actionsQueue.reduce((acc, action) => {
                action.time -= state.startRecTime
                acc.push(action)

                return acc
            }, [])

            state.rec = { rec, startRecTime: state.startRecTime, stopRecTime: state.stopRecTime }

            localStorage.rec = JSON.stringify(state.rec)
            console.log(`rec`, JSON.parse(JSON.stringify(state.rec)))
        },
        playRec(state, { isPlaying }) {
            state.isPlayingRec = isPlaying
        },

        addAction(state, { action }) {
            if (!state.actionsQueue) return

            action.time = Date.now()
            state.actionsQueue.push(action)
        },
    },
    actions: {
        startPlay({ commit, dispatch }, payload) {
            commit({ type: 'addAction', action: { use: 'dispatch', payload } })

            dispatch({ type: 'stopPlay' })

            commit(payload)
            const interval = setInterval(() => {
                commit(payload)
            }, 8 * 1000)

            commit({ type: 'setPlayInterval', interval })
        },

        stopPlay({ commit }, payload) {
            commit(payload)
            commit({ type: 'setPlayInterval', interval: null })
        },


        playRec(context) {
            context.commit({ type: 'playRec', isPlaying: true })
            context.commit({ type: 'zeroSoundToPlay' })
            context.dispatch({ type: 'stopPlay' })

            // const rec = JSON.parse(JSON.stringify(context.state.rec))
            const rec = context.state.rec

            const loopTime = rec.stopRecTime - rec.startRecTime
            let counter = 0
            const startLoopTime = Date.now()

            const tempStack = []
            const interval = setInterval(() => {
                counter = Date.now() - startLoopTime
                for (let i = 0; i < rec.rec.length; i++) {
                    const action = rec.rec[i]
                    if (action.time > counter) break

                    console.log(`action`, action)

                    context[action.use](action.payload)
                    tempStack.push(rec.rec.shift())

                }

                if (loopTime < counter) {
                    clearInterval(interval)
                    rec.rec = tempStack
                    context.dispatch({ type: 'stopPlay' })
                    context.commit({ type: 'zeroSoundToPlay' })
                    context.commit({ type: 'playRec', isPlaying: false })
                }
            }, 10)
        }
    },
})
