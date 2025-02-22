<script setup lang='ts'>
	import { ref } from 'vue'
	import type { GallowsStatus } from '../../types/GallowsStatus'

	interface Props {
		word: string
	}
	defineProps<Props>()

	const gameStatus = ref<GallowsStatus | null>(null)
	const isVisibe = ref(false)

	const open = (status: GallowsStatus) => {
		gameStatus.value = status
		isVisibe.value = true
	}
	const close = () => {
		isVisibe.value = false
	}
	defineExpose({
		open, close
	})
	const emit = defineEmits<{
		(e: 'restart'): void
	}>()
</script>

<template>

	<div v-if="isVisibe" class="popup-container">
		<div class="popup">
			<h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
			<div v-else>
				<h2>Вы проиграли. 😕</h2>
				<h3>...слово: {{ word }}</h3>
			</div>
			<button @click="emit('restart')">Сыграть еще раз</button>
		</div>
	</div>
</template>

<style></style>