import Link from "next/link";

import Image from "next/image"
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import {
  AnimatedSection,
  AnimatedCard,
  ParticleBackground,
  AnimatedGradientBackground,
} from "@/components/client-animations"
import { getPersonalInfo } from "@/lib/information"

export default function Home() {
  const info = getPersonalInfo()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Background Effects */}
      <AnimatedGradientBackground />
      <ParticleBackground />
      <ScrollIndicator />
      <SmoothScroll />

      {/* Navigation */}
      <Navbar info={info} />

      {/* Hero Section */}
      <HeroSection info={info} />

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">{info.aboutIntro}</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">{info.aboutBackground}</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">{info.aboutSkills}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Expertise</h3>
                <ul className="space-y-2">
                  {info.keyExpertise.map((skill, index) => (
                    <li key={index} className="flex items-start group">
                      <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Master of Science in Information Science</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">University of Pittsburgh</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Sep 2024 - Present</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Relevant Coursework: Machine Learning, Deep Learning, Data Mining, AI, Database Management,
                    Information Retrieval, Data Visualization, Cloud Computing, Human-Centered Systems.
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Graduate Research Assistant</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Beijing University of Technology</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Sep 2020 - Jun 2024</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Contributed to the design and analysis of experiments to optimize phosphorus removal using
                    data-driven methods
                  </li>
                  <li>Managed and monitored data from four SBRs to evaluate water purification performance</li>
                  <li>
                    Applied data transformation, modeling, and statistical analysis to explore relationships between
                    multiple factors
                  </li>
                  <li>Created detailed reports and dashboards with data visualizations to communicate research insights</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Bachelor</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      North China University of Science and Technology
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Sep 2015 - Jun 2019</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Bachelor of Engineering in Water Supply & Drainage Science.</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard delay={0.2}>
              <a href="https://nextjs-blog-post-card-202278901138.us-central1.run.app" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle> AI-Podcast </CardTitle>
                    <CardDescription>AI-driven Daily News Podcast</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image
                        src="/images/aipodcast_sample.gif?height=400&width=400"
                        alt="AI-Podcast"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Built an end-to-end AI workflow that fetches articles and images from APIs, generates podcast scripts and summaries using large language models, converts them into natural-sounding audio, and displays episodes with audio, summaries, and images. Designed with responsive, accessible UI and optimized for fast performance.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge
                        variant="outline"
                        className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                      >
                        NLP
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                      >
                        TTS
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                      >
                        Web Development
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                      >
                        API Integration
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full relative overflow-hidden group bg-transparent pointer-events-auto"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </a>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <a
                href="https://xray-interpreter-202278901138.us-west1.run.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle>Chest X-rays AI Interpreter</CardTitle>
                    <CardDescription>Pneumonia Classification Using Chest X-Ray Images</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image src="/images/xray.gif?height=400&width=400" alt="Chest X-rays AI Interpreter" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Developed and fine-tuned CNNs, including DenseNet, achieving 80% pneumonia classification accuracy. Implemented Keras data augmentation (+4% accuracy) and Grad-CAM for interpretability. Used t-SNE to analyze feature separations and validate model performance.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Classification</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">CNN</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">DenseNet</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Data Augmentation</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full relative overflow-hidden group bg-transparent pointer-events-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </a>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Link href="/project-detail-covid" className="block w-full">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle>Impact of Population Mobility on COVID-19 Incidence</CardTitle>
                    <CardDescription>Investigating the Relationship Between Population Mobility and COVID-19 Incidence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image src="/images/covid.gif?height=240&width=400" alt="Impact of Population Mobility on COVID-19 Incidence" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Using Google mobility and CDC case data, this study analyzes how movement affected COVID-19 dynamics, evaluates policy effectiveness, and identifies key geographical factors with Python and XGBoost.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Databricks</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Data Analysis</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Correlation Analysis</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">XGBoost</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full relative overflow-hidden group bg-transparent pointer-events-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <Link href="/project-detail-breastcancer" className="block w-full">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle>Wisconsin Breast Cancer Dataset Analysis</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image src="/images/breastcancer.png?height=240&width=400" alt="Wisconsin Breast Cancer Dataset Analysis" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Performed EDA and PCA in Python, evaluated classifiers (Logistic Regression, Random Forest, XGBoost), achieved 97.4% accuracy/98% recall, and identified three key features for efficient breast cancer diagnosis.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">EDA</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">PCA</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">RandomForest</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">XGBoost</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Logistic Regression</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full relative overflow-hidden group bg-transparent pointer-events-auto">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">View Project</span>
                      <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </AnimatedCard>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection direction="up" delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                      <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">AI</span>
                    </span>
                    Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Deep Learning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Neural Networks
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"              
                    >
                      NLP
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Model Fine-Tuning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Feature Engineering
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Pretrained Models
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">DEV</span>
                    </span>
                    Programming & Frameworks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      TensorFlow
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      PyTorch
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Scikit-learn
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Flask/FastAPI
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Databricks
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <AnimatedSection direction="up" delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                      <span className="text-green-600 dark:text-green-300 text-sm font-bold">DATA</span>
                    </span>
                    Data Science & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Data Analysis
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Pandas & NumPy
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Data Visualization
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Statistical Analysis
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      SQL
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Jupyter Notebooks
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Matplotlib/Seaborn
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Data Preprocessing
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="education" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>
          </AnimatedSection>
          <div>
            <AnimatedSection direction="right" delay={0.3}>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <a
                  href="https://credentials.databricks.com/185bb37c-6a20-473b-81d2-2021731fc30c#acc.7hfsLv49"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">Databricks Certified Data Engineer Associate</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Validates foundational data engineering skills on the Databricks Lakehouse Platform—building ETL pipelines with Spark SQL/Python and deploying production-ready workflows.
                  </p>
                </a>

                <a
                  href="https://coursera.org/verify/WQVFWNKAV47K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">R Programming</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, teaches programming in R for data analysis and statistical computing.
                  </p>
                </a>

                <a
                  href="https://coursera.org/verify/FDHY6NB4SWPJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">Getting and Cleaning Data</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, covers techniques for acquiring, cleaning, and preparing data for analysis.
                  </p>
                </a>

                <a
                  href="https://coursera.org/verify/HMCRLTJWVUX3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">Exploratory Data Analysis</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, focuses on summarizing and visualizing data to uncover patterns and insights.
                  </p>
                </a>

                <a
                  href="https://coursera.org/verify/AQEZXSFYK3KE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">Advanced Learning Algorithms</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Stanford University and DeepLearning.AI via Coursera, covers advanced machine learning techniques beyond basic models.
                  </p>
                </a>

                <a
                  href="https://coursera.org/verify/3PDQRY8PMKC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <h4 className="font-semibold">Unsupervised Learning, Recommenders, Reinforcement Learning</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Stanford University and DeepLearning.AI via Coursera, introduces clustering, recommendation systems, and reinforcement learning algorithms.
                  </p>
                </a>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          </AnimatedSection>

          <div className="flex justify-center">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="flex gap-8 items-center">
                <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <a
                    href={`mailto:${info.email}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {info.email}
                  </a>
                </div>
                <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                  <Linkedin className="w-5 h-5 text-purple-600 mr-3" />
                  <a
                    href={info.linkedin}
                    target="_blank"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    rel="noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                  <Github className="w-5 h-5 text-purple-600 mr-3" />
                  <a
                    href={info.github}
                    target="_blank"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    rel="noreferrer"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 bg-gray-800 dark:bg-gray-950 text-white relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 {info.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
