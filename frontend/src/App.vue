<template>
  <div class="app">
    <h1>📝 Quiz Generator Web App</h1>
    <FileUpload v-if="step === 1" @quiz-generated="startQuiz" />
    <Quiz
      v-else-if="step === 2"
      :quizText="quizText"
      @quiz-submitted="showResult"
    />
    <Result v-else-if="step === 3" v-bind="resultData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileUpload from "./components/FileUpload.vue";
import Quiz from "./components/Quiz.vue";
import Result from "./components/Result.vue";

const step = ref(1);
const quizText = ref("");
const resultData = ref({});

const startQuiz = (text) => {
  quizText.value = text;
  step.value = 2;
};

const showResult = (data) => {
  resultData.value = data;
  step.value = 3;
};
</script>

<style scoped>
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  text-align: center;
}
</style>
