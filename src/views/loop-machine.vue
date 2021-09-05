<template>
	<section class="loop-machine">
		<tap-pad />
		<div class="control-panel">
			<button class="play-btn" @click="playSounds">Play</button>
			<button class="stop-btn" @click="stopSounds">Stop</button>
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
		},
	},

	components: {
		tapPad,
	},
}
</script>