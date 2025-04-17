<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  quiz: String,
});
const emit = defineEmits(["quiz-completed"]);

const questions = ref([]);

const parseQuiz = (quizText) => {
  if (!quizText) {
    console.error("Empty or undefined quiz text.");
    return;
  }

  const lines = quizText.split("\n").filter((line) => line.trim() !== "");
  let currentQuestion = null;

  lines.forEach((line) => {
    if (/^\d+\./.test(line)) {
      if (currentQuestion) questions.value.push(currentQuestion);
      currentQuestion = {
        question: line,
        options: [],
        answer: null,
        selected: null,
      };
    } else if (/^[A-D]\)/.test(line)) {
      currentQuestion?.options.push(line);
    }
  });

  if (currentQuestion) questions.value.push(currentQuestion);
};

onMounted(() => {
  parseQuiz(props.quiz);
});

// rest of Quiz.vue logic…
</script>
