import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const fetchWord = async (): Promise<string> => {
	try {
		const response = await axios.get<{ word: string }>(`${API_URL}/random-word`, {
			headers: {
				'Cache-Control': 'no-cache'
			},
			params: {
				timestamp: Date.now() // Чтобы избежать кэширования
			}
		})

		return response.data.word
	} catch (error) {
		console.error('Ошибка при получении слова:', error)
		return ''
	}
}