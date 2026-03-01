import 'server-only';

// This file is intended to be run on the server-side only.
// If you need to use this data on the client-side, you should fetch it
// from a server component or an API route.

// fs and path are Node.js built-ins and will be available in server components.
import fs from "fs";
import path from "path";

export interface PersonalInfo {
  name: string
  title: string
  email: string
  linkedin: string
  github: string
  kaggle: string
  mainDescription: string
  aboutIntro: string
  aboutBackground: string
  aboutSkills: string
  keyExpertise: string[]
  contactMessage: string
}

export function getPersonalInfo(): PersonalInfo {
  try {
    const filePath = path.join(process.cwd(), "information.md")
    const content = fs.readFileSync(filePath, "utf8")

    // Parse the markdown content (simplified parsing)
    const extractValue = (key: string): string => {
      const regex = new RegExp(`\\*\\*${key}\\*\\*:\\s*(.+)`, "i")
      const match = content.match(regex)
      return match ? match[1].trim() : ""
    }

    const extractSection = (section: string): string => {
      const regex = new RegExp(`\\*\\*${section}\\*\\*:\\s*(.+?)(?=\\n\\*\\*|\\n#|$)`, "is")
      const match = content.match(regex)
      return match ? match[1].trim() : ""
    }

    return {
      name: extractValue("Name"),
      title: extractValue("Title"),
      email: extractValue("Email"),
      linkedin: extractValue("LinkedIn"),
      github: extractValue("GitHub"),
      kaggle: extractValue("Kaggle"),
      mainDescription: extractValue("Main Description"),
      aboutIntro: extractValue("Intro"),
      aboutBackground: extractValue("Background"),
      aboutSkills: extractValue("Skills"),
      keyExpertise: [
        "Machine Learning & Deep Learning Model Development",
        "LLM Integration & Fine-tuning",
        "Model Deployment & CI/CD Pipelines",
        "Computer Vision & NLP Applications",
        "Speech Recognition & TTS Systems",
        "Google Cloud Platform (Cloud Run, Google Cloud Storage)",
        "Databricks (Spark SQL, PySpark)",
      ],
      contactMessage:
        extractValue("Contact Message") ||
        "I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!",
    }
  } catch (error) {
    // Fallback data if file reading fails
    return {
      name: "Pengyao Li",
      title: "AI Engineer",
      email: "pitafimurad99@gmail.com",
      linkedin: "https://www.linkedin.com/in/pengyao-li/",
      github: "https://github.com/PomyeoLee",
      kaggle: "https://kaggle.com",
      mainDescription:
        "Specializing in machine learning, deep learning, and data science with expertise in deploying AI solutions and integrating LLM APIs.",
      aboutIntro:
        "I'm an AI Engineer with expertise in data science, machine learning, and deep learning. My passion lies in building intelligent systems that solve real-world problems.",
      aboutBackground:
        "With a strong background in predictive modeling, classification, and data analysis, I specialize in developing and deploying AI solutions that drive business value.",
      aboutSkills:
        "I'm proficient in Python and ML frameworks like TensorFlow, scikit-learn, and OpenCV, and have experience integrating APIs like OpenAI, Gemini, and other LLMs for chatbot development and automation.",

      contactMessage:
        "I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!",
    }
  }
}
