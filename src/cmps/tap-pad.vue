<template>
	<section class="tap-pad" v-if="buttons">
		<pad-button
			v-for="(button, idx) in buttons"
			:key="idx"
			:button="button"
		/>
	</section>
</template>

<script>
import padButton from './pad-button.vue'

export default {
	name: 'tap-pad',
	data() {
		return {
			buttons: null
		}
	},

	created() {
		this.buttons = this.$store.getters.sounds
	},

	components: {
		padButton,
	},
}
</script>