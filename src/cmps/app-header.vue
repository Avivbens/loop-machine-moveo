<template>
	<section class="app-header">
		<img
			class="logo"
			@click="$router.push('/')"
			src="@/assets/logo.png"
			alt=""
		/>
		<router-link to="/">Home</router-link>
		<router-link to="/app">App</router-link>
	</section>
</template>
