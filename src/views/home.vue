<template>
	<section class="homepage">
		<h1 class="title"><span>DJ</span> Loop Machine</h1>

		<img src="@/assets/homephoto.webp" alt="" />

		<button @click="$router.push('/app')">Try now for FREE!</button>
	</section>
</template>

<script>
export default {
	name: 'Home',
}
</script>
