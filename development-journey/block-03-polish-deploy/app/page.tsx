/**
 * Block 3 milestone page — Block 2 + transcript link polish, certification hover polish, ready for deploy.
 */
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
import { ContactForm } from "@/components/contact-form"

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
                <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">{info.aboutSkills}</p>
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
              <Link
                href="/transcript"
                className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-900"
                aria-label="View transcript"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      Master of Science in Information Science{" "}
                      <span className="inline-flex align-middle ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 dark:border-purple-900/70 bg-purple-50/90 dark:bg-purple-900/30 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                          View transcript
                        </span>
                      </span>
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">University of Pittsburgh</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Sep 2024 - May 2026</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Relevant Coursework: Machine Learning, Deep Learning, Data Mining, AI, Database Management,
                    Information Retrieval, Data Visualization, Cloud Computing, Human-Centered Systems.
                  </li>
                </ul>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 dark:focus-within:ring-offset-gray-900">
                <a
                  href="https://oversea.cnki.net/kcms2/article/abstract?v=kn2pS460sOM5ocRj4HRZbCuiQYhIsji3l0T6dPlT3y1goK8njDhsnWnjTrRCDyHfboWAq_fl-0ZjNjtzvuge1NBRiWGu9-vUJ60CBmp9zT35ST-ReaolGpTwFJfpShO1mLIRgGvQYO6KOlSKqMKpkY8LR79dZW_O1dP-XMx16UP0pFD3aPIkug==&uniplatform=OVERSEA&language=EN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0 rounded-lg"
                  aria-label="Open publication"
                />
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      Quantitative Research Assistant{" "}
                      <span className="inline-flex align-middle ml-2 gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                        <a
                          href="https://oversea.cnki.net/kcms2/article/abstract?v=kn2pS460sONV6d_pY9hUpYVEuJy6TzNJMxw2EMP-u6oedLHQsBiXq-W2PzChrIBf4UEyg8EZjaX8a3KA09TS74PxidsNJE1HLN44JEGqKu8mccBPvxOgNHBCo0oNNauIs8cM65dqhcbW2ekDt3fciffrLNPIkOsFLZDZeK0h_C0FFlSr0zqRog==&uniplatform=OVERSEA&language=EN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 dark:border-purple-900/70 bg-purple-50/90 dark:bg-purple-900/30 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          View Publication (2023)
                        </a>

                        <a
                          href="https://oversea.cnki.net/kcms2/article/abstract?v=kn2pS460sOPZE42VkR7pGNFbh6dHClXhBG8q0r_lr_BBpCS0WsV2DrEs6WuJ8-ZN0v74sXypAViplQ0wBgkxgVKyPQB0HsrrFqk7ezcLTZ5C_brY0xLbI0ErjozkVGvrwgl8BF4f-wQWOiMKbp7JaXlpqCkfJIPzFgwwzbKNjG-EWxeb9AoGLg==&uniplatform=OVERSEA&language=EN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 dark:border-purple-900/70 bg-purple-50/90 dark:bg-purple-900/30 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          View Publication (2022)
                        </a>
                      </span>
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      Key Laboratory of Beijing Water Quality Science and Water Environment Recovery Engineering,
                      <br />
                      Beijing University of Technology
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Aug 2020 - Jun 2024</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Collected, structured, and maintained experimental and operational datasets to support quantitative
                    research studies.
                  </li>
                  <li>
                    Performed data preprocessing, cleaning, and transformation to ensure statistical validity and
                    analytical readiness.
                  </li>
                  <li>
                    Applied quantitative and statistical methods to analyze relationships, test hypotheses, and evaluate
                    system or process performance.
                  </li>
                  <li>
                    Developed data visualizations and summarized statistical findings in structured research reports for
                    academic and technical audiences.
                  </li>
                  <li>
                    Collaborated with research teams to interpret results and translate quantitative findings into
                    evidence-based conclusions and improvements.
                  </li>
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
              <Link href="https://github.com/PomyeoLee" className="block w-full">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle>Market Intelligence MCP</CardTitle>
                    <CardDescription>FastMCP Server for Pharma Competitive Landscape Analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image
                        src="/images/market-intelligence.gif?height=240&width=400"
                        alt="Market Intelligence MCP"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Built a FastMCP server that accepts a therapeutic indication and drug list, automatically resolves targets and search parameters, orchestrates queries across six public pharma data APIs, and generates structured market-intelligence prompts for AI agents to produce competitive landscape reports without manual API integration or configuration.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">FastMCP</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">MCP</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">API Integration</Badge>
                      <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300">Pharma Data</Badge>
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

            <AnimatedCard delay={0.3}>
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

            <AnimatedCard delay={0.4}>
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

            <AnimatedCard delay={0.5}>
              <Link href="https://github.com/PomyeoLee" className="block w-full">
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

            <AnimatedCard delay={0.6}>
              <Link href="https://github.com/PomyeoLee" className="block w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                      <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">AI</span>
                    </span>
                    Core ML / AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Machine Learning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Deep Learning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      NLP
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      LLMs
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      RAG
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Transfer Learning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Fine-tuning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      SHAP & Grad-CAM
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      XGBoost
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.25}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">LIB</span>
                    </span>
                    Frameworks & Libraries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
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
                      TensorFlow
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
                      Keras
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Pandas
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      NumPy
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Matplotlib
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Seaborn
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Plotly
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                      <span className="text-green-600 dark:text-green-300 text-sm font-bold">DATA</span>
                    </span>
                    Data Engineering & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
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
                      ETL Pipelines
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      PySpark
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Databricks
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Data Preprocessing
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Feature Engineering
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
                      Tableau
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      Dash
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.35}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-2">
                      <span className="text-teal-600 dark:text-teal-300 text-sm font-bold">OPS</span>
                    </span>
                    MLOps & Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      MLflow
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      Docker
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      CI/CD
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      Flask
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      FastAPI
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                      Serverless Deployment
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-2">
                      <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">CLOUD</span>
                    </span>
                    Cloud & Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-center hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      AWS (S3, Glue, Athena)
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      BigQuery
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      Vertex AI
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      Cloud Run
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      Pinecone
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      Spark
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      PostgreSQL
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      MySQL
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.45}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mr-2">
                      <span className="text-slate-600 dark:text-slate-300 text-sm font-bold">SWE</span>
                    </span>
                    Software Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      R
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      Bash
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      Git
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      Next.js
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
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded-md bg-white/70 dark:bg-gray-800/70 p-2 border border-gray-200/60 dark:border-gray-600/60">
                      <img
                        src="https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/180124187"
                        alt="Databricks Certified Data Engineer Associate badge"
                        className="h-14 w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold">Databricks Certified Data Engineer Associate</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Validates data engineering skills on the Databricks Lakehouse Platform—building ETL pipelines with Spark SQL/Python and deploying production-ready workflows.
                      </p>
                    </div>
                  </div>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://credentials.databricks.com/d7ab06ed-93c9-4b30-a3b7-346f88b524ef"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded-md bg-white/70 dark:bg-gray-800/70 p-2 border border-gray-200/60 dark:border-gray-600/60">
                      <img
                        src="https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/181841332"
                        alt="Databricks Certified Data Analyst Associate badge"
                        className="h-14 w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold">Databricks Certified Data Analyst Associate</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Validates data analytics skills on the Databricks Data Intelligence Platform, including data querying, transformation, visualization, dashboard development, and business intelligence workflows.
                      </p>
                    </div>
                  </div>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://coursera.org/verify/WQVFWNKAV47K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold">R Programming</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, teaches programming in R for data analysis and statistical computing.
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://coursera.org/verify/FDHY6NB4SWPJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold">Getting and Cleaning Data</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, covers techniques for acquiring, cleaning, and preparing data for analysis.
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://coursera.org/verify/HMCRLTJWVUX3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold">Exploratory Data Analysis</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Johns Hopkins University, focuses on summarizing and visualizing data to uncover patterns and insights.
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://coursera.org/verify/AQEZXSFYK3KE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold">Advanced Learning Algorithms</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Stanford University and DeepLearning.AI via Coursera, covers advanced machine learning techniques beyond basic models.
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://coursera.org/verify/3PDQRY8PMKC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden block h-full bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pb-12 shadow-md border-l-4 border-purple-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold">Unsupervised Learning, Recommenders, Reinforcement Learning</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This course, offered by Stanford University and DeepLearning.AI via Coursera, introduces clustering, recommendation systems, and reinforcement learning algorithms.
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-purple-700 transition-colors duration-300 group-hover:bg-gray-50/90 dark:bg-gray-700 dark:text-purple-300 dark:group-hover:bg-gray-700/90"
                  >
                    <span className="sr-only">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {info.contactMessage}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection direction="left" delay={0.2}>
              <ContactForm />
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="space-y-6">
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
