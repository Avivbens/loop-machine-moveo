<template>
	<section class="loop-machine">
		<h1 class="title">Loop Machine</h1>
		<tap-pad />
		<div class="control-panel">
			<button class="play-btn" :disabled="playingRec" @click="playSounds">
				Play
			</button>
			<button class="stop-btn" :disabled="playingRec" @click="stopSounds">
				Stop
			</button>

			<button class="rec-btn" :disabled="playingRec" @click="handleRec">
				{{ recTitle }}
			</button>

			<button
				class="stop-btn"
				:disabled="!rec || playingRec"
				@click="playRec"
			>
				Play Last Rec
			</button>
		</div>
	</section>
</template>

<script>
import tapPad from '../cmps/tap-pad.vue'
export default {
	name: 'loop-machine',

	methods: {
		playSounds() {
			this.$store.dispatch({ type: 'startPlay' })
		},
		stopSounds() {
			this.$store.dispatch({ type: 'stopPlay' })
			this.$store.commit({
				type: 'addAction', action: { use: 'dispatch', payload: { type: 'stopPlay' } }
			})
		},


		handleRec() {
			if (!this.$store.state.startRecTime && !this.$store.state.stopRecTime ||
				this.$store.state.startRecTime && this.$store.state.stopRecTime) {
				this.$store.commit({ type: 'startRec' })
				return
			}
			this.$store.commit({ type: 'stopRec' })
		},
		playRec() {
			this.$store.dispatch({ type: 'playRec' })
		}
	},
	computed: {
		recTitle() {
			if (!this.$store.state.startRecTime && !this.$store.state.stopRecTime) return 'Start Rec'
			if (this.$store.state.startRecTime && this.$store.state.stopRecTime) return 'Start Rec'
			return 'Stop Rec'
		},
		rec() {
			return this.$store.getters.rec
		},
		playingRec() {
			return this.$store.state.isPlayingRec
		}
	},

	components: {
		tapPad,
	},
}
</script>