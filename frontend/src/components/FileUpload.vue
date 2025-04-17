<template>
  <div class="upload-section">
    <h2>Upload PDF or Word File 📄</h2>
    <input type="file" @change="uploadFile" />
    <p v-if="loading">⏳ Generating quiz...</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["quiz-generated"]);
const loading = ref(false);

const uploadFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  loading.value = true;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    emit("quiz-generated", data.quiz);
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Failed to upload file.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.upload-section {
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
