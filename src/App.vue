<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-700"
    :style="{ backgroundColor: moodData?.backgroundColor || '#ffe4e6' }"
  >
    <Starfield />

    <DotLottieVue
      style="height: 400px; width: 400px"
      autoplay
      loop
      src="https://lottie.host/1ad6ca71-b6d1-4cac-83f5-bd292db97fc6/L4wZ2WN3Q6.lottie"
    />

    <div class="bg-white shadow-lg p-8 rounded-2xl max-w-xl w-full text-center mt-4">
      <h1 class="text-4xl font-bold mb-4 text-pink-600">Mood Muse</h1>
      <p class="mb-6 text-gray-700">Gentle reflections for whatever you're feeling today</p>

      <input
        v-model="mood"
        type="text"
        placeholder="e.g. cozy, moody, sleepy"
        class="w-full p-3 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-800 placeholder-pink-400"
      />

      <button
        @click="debouncedSubmit"
        :disabled="loading || !mood"
        class="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-50"
      >
        {{ loading ? 'Cooking....' : 'Find Muse' }}
      </button>

      <div v-if="moodData" class="text-left mt-6 space-y-3">
        <p class="text-gray-800"><strong>📖 Book:</strong> {{ moodData.bookRecommendation }}</p>
        <p class="text-gray-800"><strong>💌 Message:</strong> {{ moodData.quote }}</p>
        <p class="text-gray-800"><strong>{{ moodData.emojiWeather }} Activity:</strong> {{ moodData.activity }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Starfield from './components/Starfield.vue'
import { fetchMoodData } from './composables/useOpenAI.js'
import { debounce } from 'lodash'

const mood = ref('')
const loading = ref(false)
const moodData = ref(null)

const handleSubmit = async () => {
  loading.value = true
  moodData.value = null
  const result = await fetchMoodData(mood.value)
  moodData.value = result
  loading.value = false
}
const debouncedSubmit = debounce(handleSubmit, 1500)
</script>
