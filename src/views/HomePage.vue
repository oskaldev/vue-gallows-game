<script setup lang='ts'>
	import { computed, ref } from 'vue'
	import { GallowsFigure, GallowsHeader, GallowsNotification, GallowsPopup, GallowsWord, GallowsWrongLetters } from '../components'

	const word = ref('василий')
	const letters = ref<string[]>([])
	const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)))
	const wrongLetters = computed(() => letters.value.filter(x => !word.value.includes(x)))

	window.addEventListener('keydown', ({ key }) => {
		if (letters.value.includes(key)) {
			return
		}
		if (/[а-яА-ЯёЁ]/.test(key)) {
			letters.value.push(key.toLowerCase())
		}
	})
</script>

<template>
	<GallowsHeader />
	<div class="game-container">
		<GallowsFigure />
		<GallowsWrongLetters :wrong-letters="wrongLetters" />
		<GallowsWord :word="word" :correct-letters="correctLetters" />
	</div>
	<GallowsPopup v-if="false" />
	<GallowsNotification />
</template>

<style></style>