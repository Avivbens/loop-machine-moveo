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

        rec: JSON.parse(localStorage.rec || null) || null
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
                    // const audio = new Audio()
                    // audio.src = (require(sound.url))
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
            console.log(`JSON.parse(JSON.stringify(state.rec))`, JSON.parse(JSON.stringify(state.rec)))
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
            context.commit({ type: 'zeroSoundToPlay' })
            context.dispatch({ type: 'stopPlay' })

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

                    if (!rec.rec.length) {
                        clearInterval(interval)
                        rec.rec = tempStack
                    }
                }
            }, 10)
        }
    },
})
