import "server-only"
import fs from "fs"
import path from "path"

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

    const extractValue = (key: string): string => {
      const regex = new RegExp(`\\*\\*${key}\\*\\*:\\s*(.+)`, "i")
      const match = content.match(regex)
      return match ? match[1].trim() : ""
    }

    const extractBlockValue = (key: string): string => {
      const regex = new RegExp(
        `-\\s*\\*\\*${key}\\*\\*:\\s*([\\s\\S]*?)(?=\\n-\\s*\\*\\*|\\n##\\s|\\n#\\s|$)`,
        "i"
      )
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
      mainDescription: extractBlockValue("Main Description") || extractValue("Main Description"),
      aboutIntro: extractBlockValue("Intro") || extractValue("Intro"),
      aboutBackground: extractBlockValue("Background") || extractValue("Background"),
      aboutSkills: extractBlockValue("Skills") || extractValue("Skills"),
      keyExpertise: [
        "Machine Learning & Deep Learning Model Development",
        "LLM Integration, Prompt Engineering & API Orchestration",
        "RAG Pipelines & Vector Database Integration",
        "Model Deployment, Containerization & CI/CD Pipelines",
        "Computer Vision & NLP Applications",
        "Data Engineering & ETL Pipeline Design",
        "Big Data Processing with PySpark & Databricks",
        "Google Cloud Platform (Cloud Run, Cloud Scheduler, GCS, BigQuery)",
      ],
      contactMessage:
        extractValue("Contact Message") ||
        "I'm always open to discussing new projects, opportunities, or partnerships.",
    }
  } catch {
    return {
      name: "Patrick Li",
      title: "AI & Data Engineer",
      email: "lipengyao2023@gmail.com",
      linkedin: "https://www.linkedin.com/in/pengyao-li/",
      github: "https://github.com/PomyeoLee",
      kaggle: "https://kaggle.com",
      mainDescription:
        "Specializing in data engineering, machine learning, analytics, and AI-driven solutions.",
      aboutIntro:
        "I'm a data scientist and AI systems engineer with an M.S. in Information Science from the University of Pittsburgh.",
      aboutBackground:
        "I specialize in Python-based ML systems using TensorFlow, PyTorch, and scikit-learn.",
      aboutSkills: "Core ML / AI · Data Engineering · Cloud Deployment",
      keyExpertise: [
        "Machine Learning & Deep Learning",
        "Data Engineering & ETL",
        "Cloud Deployment",
      ],
      contactMessage: "Feel free to reach out!",
    }
  }
}
