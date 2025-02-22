<script setup lang='ts'>
	import { computed, onMounted, ref, watch } from 'vue'
	import { GallowsFigure, GallowsHeader, GallowsNotification, GallowsPopup, GallowsWord, GallowsWrongLetters } from '../components'
	import { fetchWord } from '../api/api'

	const word = ref('')
	const letters = ref<string[]>([])
	const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)))
	const wrongLetters = computed(() => letters.value.filter(x => !word.value.includes(x)))
	const notific = ref<InstanceType<typeof GallowsNotification> | null>(null)
	const popup = ref<InstanceType<typeof GallowsPopup> | null>(null)
	const isStatusLose = computed(() => wrongLetters.value.length === 6)
	const isStatusWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)))

	const loadNewWord = async () => {
		word.value = await fetchWord()
		letters.value = []
	}

	watch(wrongLetters, () => {
		if (isStatusLose.value) {
			popup.value?.open('lose')
		}
	})
	watch(correctLetters, () => {
		if (isStatusWin.value) {
			popup.value?.open('win')
		}
	})
	// Загружаем слово при старте игры
	onMounted(loadNewWord)

	window.addEventListener('keydown', ({ key }) => {
		const lowerKey = key.toLowerCase()
		if (isStatusLose.value || isStatusWin.value) {
			return
		}
		if (letters.value.includes(lowerKey)) {
			notific.value?.open()
			setTimeout(() => notific.value?.close(), 2000)
			return
		}
		if (/[а-яА-ЯёЁ]/.test(lowerKey)) {
			letters.value.push(lowerKey)
		}
	})

	const restart = async () => {
		await loadNewWord()
		popup.value?.close()
	}
</script>

<template>
	<GallowsHeader />
	<div class="game-container">
		<GallowsFigure :wrong-letters-count="wrongLetters.length" />
		<GallowsWrongLetters :wrong-letters="wrongLetters" />
		<GallowsWord :word="word" :correct-letters="correctLetters" />
	</div>
	<GallowsPopup @restart="restart" ref="popup" :word="word" />
	<GallowsNotification ref="notific" />
</template>

<style></style>
