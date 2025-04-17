import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const fileText = fs.readFileSync(filePath, "utf-8");

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a quiz generator bot. Create 5 MCQs with 4 options each from the provided text. Mention the correct answer clearly.",
        },
        {
          role: "user",
          content: fileText,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const quizText = completion.choices[0].message.content;
    res.json({ quiz: quizText });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate quiz." });
  } finally {
    fs.unlinkSync(filePath);
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend running at http://localhost:3000");
});
