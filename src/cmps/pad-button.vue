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

	data() {
		return {
			isActive: false
		}
	},
	methods: {
		toggleActive() {
			this.$store.commit({ type: 'toggleSoundToPlay', button: this.button })
			this.isActive = !this.isActive
		}
	},
}
</script>
