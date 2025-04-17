<template>
  <div>
    <h2>🎉 Quiz Results</h2>
    <p>Your Score: {{ score }} / {{ total }}</p>

    <div v-for="(q, index) in questions" :key="index" class="result-card">
      <h3>{{ index + 1 }}. {{ q.question }}</h3>
      <p><strong>Your Answer:</strong> {{ userAnswers[index] }}</p>
      <p><strong>Correct Answer:</strong> {{ q.answer }}</p>
      <p
        :style="{
          color: userAnswers[index].includes(q.answer) ? 'green' : 'red',
        }"
      >
        {{
          userAnswers[index].includes(q.answer) ? "✔️ Correct" : "❌ Incorrect"
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  score: Number,
  total: Number,
  questions: Array,
  userAnswers: Array,
});
</script>

<style scoped>
.result-card {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
}
</style>
