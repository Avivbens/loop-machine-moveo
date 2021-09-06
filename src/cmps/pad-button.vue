<template>
	<section
		class="pad-button"
		v-if="button"
		:class="{ active: isActive }"
		@click="toggleActive"
	>
		<span>
			{{ button.name }}
		</span>
	</section>
</template>

<script>
export default {
	name: 'pad-button',
	props: {
		button: {
			type: Object,
			default: null
		},
	},

	methods: {
		toggleActive() {
			const payload = { type: 'toggleSoundToPlay', button: this.button }
			this.$store.commit(payload)
			this.$store.commit({ type: 'addAction', action: { use: 'commit', payload } })
		}
	},
	computed: {
		isActive() {
			return this.$store.state.soundsToPlay.find(sound => sound.name === this.button.name)
		}
	},
}
</script>
