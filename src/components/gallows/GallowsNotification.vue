<script setup lang='ts'>
	import { ref } from 'vue'

	const isVisibe = ref(false)
	const open = () => {
		isVisibe.value = true
	}
	const close = () => {
		isVisibe.value = false
	}
	defineExpose({
		open, close
	})
</script>

<template>
	<div class="notification-container" :class="{ show: isVisibe }">
		<p>Вы уже вводили этот символ</p>
	</div>
</template>

<style></style>