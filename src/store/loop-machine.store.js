import Vue from 'vue'
import Vuex from 'vuex'
import { tapPadService } from '../services/tap-pad.service'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        soundsToPlay: [],
        sounds: tapPadService.getButtons(),

        playInterval: null
    },
    getters: {
        sounds(state) {
            return state.sounds
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
        startPlay({ soundsToPlay }) {
            soundsToPlay.forEach(sound => {
                tapPadService.playSound(sound.audio)
            })
        },

        stopPlay({ soundsToPlay }) {
            soundsToPlay.forEach(sound => {
                tapPadService.stopSound(sound.audio)
            })
        },

        setPlayInterval(state, { interval }) {
            clearInterval(state.playInterval)

            state.playInterval = interval
        }
    },
    actions: {
        startPlay({ commit, dispatch }, payload) {
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
        }
    },
})
