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
        "Speech Synthesis (TTS) & Multi-speaker Audio Pipeline Engineering",
        "Data Engineering & ETL Pipeline Design",
        "Big Data Processing with PySpark & Databricks",
        "Google Cloud Platform (Cloud Run, Cloud Scheduler, GCS, BigQuery)",
        "Statistical Modeling, Causal Inference & Interpretability (SHAP, Grad-CAM)",
        "Data Visualization & Dashboard Development (Tableau, Plotly, Streamlit)",
        "AI-assisted Full-stack MVP Prototyping (Cursor, Claude Code)",
      ],
      contactMessage:
        extractValue("Contact Message") ||
        "I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!",
    }
  } catch (error) {
    // Fallback data if file reading fails
    return {
      name: "Pengyao Li",
      title: "AI & Data Engineer",
      email: "pitafimurad99@gmail.com",
      linkedin: "https://www.linkedin.com/in/pengyao-li/",
      github: "https://github.com/PomyeoLee",
      kaggle: "https://kaggle.com",
      mainDescription:
        "Specializing in data engineering, machine learning, analytics, and AI-driven solutions with expertise in building scalable data systems, deploying AI applications, integrating LLM technologies, and applying data-driven methods to scientific, engineering, and business problems.",
      aboutIntro:
        "I’m a data scientist and AI systems engineer with an M.S. in Information Science from the University of Pittsburgh. My work spans the full machine learning lifecycle — from data engineering and predictive modeling to LLM-powered applications and cloud deployment.",
      aboutBackground:
        "I specialize in Python-based ML systems using TensorFlow, PyTorch, and scikit-learn, with experience building production-grade AI applications, including LLM-integrated systems deployed on Google Cloud Run. I’ve worked extensively with large-scale data processing using PySpark and Databricks, and with cloud platforms such as GCP and AWS.",
      aboutSkills:
        "Core ML / AI\nMachine Learning (supervised, unsupervised) · Deep Learning (CNNs, Transformers) · NLP · LLMs · RAG · Transfer Learning · Fine-tuning · Model Explainability (SHAP, Grad-CAM) · XGBoost\n\nFrameworks & Libraries\nPyTorch · TensorFlow · Scikit-learn · Keras · Pandas · NumPy · Matplotlib · Seaborn · Plotly\n\nData Engineering & Analytics\nSQL · ETL Pipelines · PySpark · Databricks · Data preprocessing · Feature engineering · Data visualization · Tableau · Dash\n\nMLOps & Deployment\nMLflow · Docker · CI/CD · Flask · FastAPI · Serverless deployment\n\nCloud & Infrastructure\nAWS (S3, Glue, Athena) · GCP (BigQuery, Vertex AI, Cloud Run) · Vector DBs (Pinecone) · Spark · PostgreSQL · MySQL\n\nSoftware Engineering\nPython · R · Bash · Git · Next.js",

      contactMessage:
        "I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!",
    }
  }
}
