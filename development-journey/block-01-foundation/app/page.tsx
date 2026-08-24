import { ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { getPersonalInfo } from "@/lib/information"

/**
 * Block 1 milestone page
 * Scope: scaffold + hero + about + experience
 * Not yet: projects, skills, certifications, contact form, animations, deploy
 */
export default function Home() {
  const info = getPersonalInfo()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar info={info} />
      <HeroSection info={info} />

      {/* About */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300">{info.aboutIntro}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300">{info.aboutBackground}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">{info.aboutSkills}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Expertise</h3>
              <ul className="space-y-2">
                {info.keyExpertise.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Master of Science in Information Science</h3>
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
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Quantitative Research Assistant</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    Beijing University of Technology
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Aug 2020 - Jun 2024</p>
              </div>
              <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Collected and maintained experimental datasets for quantitative research studies.</li>
                <li>Performed data preprocessing, cleaning, and transformation for statistical analysis.</li>
                <li>Developed visualizations and summarized findings in research reports.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600">
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
          </div>
        </div>
      </section>

      <footer className="py-4 px-4 bg-gray-800 dark:bg-gray-950 text-white">
        <div className="container mx-auto max-w-6xl text-center text-gray-400 text-sm">
          <p>© 2025 {info.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
