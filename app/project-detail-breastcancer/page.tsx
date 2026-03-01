import Link from "next/link"
import { ArrowLeft, BarChart2, Database, GitBranch, Layers, Search, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BreastCancerProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            Wisconsin Breast Cancer Dataset Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            Multi-Classifier Comparison for Binary Cancer Diagnosis with 97.4% Accuracy and 98% Recall
          </p>
          <div className="flex flex-wrap gap-2">
            {["Python", "Scikit-learn", "XGBoost", "Random Forest", "Logistic Regression", "PCA", "EDA", "Pandas", "NumPy", "Matplotlib", "Seaborn"].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Overview */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Project Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Breast cancer is the second most common cancer among women worldwide. Early and accurate diagnosis is critical for improving patient outcomes. This project applies a rigorous machine learning pipeline to the UCI Wisconsin Breast Cancer Diagnostic (WBCD) dataset—569 samples with 30 numeric features derived from digitized fine needle aspirate (FNA) images of breast masses—to classify tumors as malignant or benign.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The study goes beyond model accuracy by performing extensive exploratory analysis and dimensionality reduction to understand which cellular morphology features are most discriminative. The final system achieves 97.4% accuracy and 98% recall, minimizing false negatives—the most clinically costly type of error.
          </p>
        </section>

        {/* Dataset */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Dataset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">Dataset Characteristics</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Source: UCI Machine Learning Repository (WBCD)</li>
                <li>569 samples (357 benign, 212 malignant)</li>
                <li>30 numeric feature columns</li>
                <li>No missing values</li>
                <li>Binary classification target: M / B</li>
              </ul>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">Feature Groups</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Mean values of 10 cell nucleus properties</li>
                <li>Standard error of those 10 properties</li>
                <li>&quot;Worst&quot; (largest) values of those 10 properties</li>
                <li>Properties include: radius, texture, perimeter, area, smoothness, compactness, concavity, concave points, symmetry, fractal dimension</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-600" />
            Methodology
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Exploratory Data Analysis (EDA)</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Distributions of all 30 features were visualized with histograms and KDE plots, split by diagnosis label. Pair plots and a full Pearson correlation heatmap revealed strong multicollinearity among the mean, SE, and worst feature groups (e.g., radius_mean and perimeter_mean: r = 0.998). Box plots identified several features with well-separated distributions between malignant and benign classes, guiding feature selection intuition.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Data Preprocessing</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                The target label was encoded as binary (M=1, B=0). Features were standardized using StandardScaler to ensure equal contribution across classifiers sensitive to feature scale (Logistic Regression, SVM). The dataset was split 80/20 into stratified train and test sets to preserve class balance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Dimensionality Reduction with PCA</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Principal Component Analysis was applied to reduce the 30-feature space. A scree plot and cumulative explained variance curve showed that the first 2 principal components capture ~63% of variance and the first 10 capture ~95%. A 2D PCA scatter plot visualized strong linear separability between benign and malignant clusters. PCA features were used as an alternative input to compare against the full feature set.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Classifier Training &amp; Comparison</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Three classifiers were trained and compared: Logistic Regression (L2 regularization, liblinear solver), Random Forest (100 estimators, balanced class weights), and XGBoost (gradient boosting, scale_pos_weight for class imbalance). 5-fold stratified cross-validation was used for hyperparameter tuning via GridSearchCV. Evaluation metrics included accuracy, precision, recall, F1-score, AUC-ROC, and confusion matrices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">5. Feature Importance Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Random Forest and XGBoost both provide intrinsic feature importance scores. The top-ranked features across both models consistently pointed to <strong>worst concave points</strong>, <strong>worst perimeter</strong>, and <strong>worst radius</strong> as the three most discriminative features—a finding with strong clinical alignment, as these represent the most extreme cellular morphology measurements in each sample.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Data & Preprocessing</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Pandas, NumPy</li>
                <li>StandardScaler normalization</li>
                <li>Stratified train/test split</li>
                <li>Label encoding (M/B → 1/0)</li>
                <li>Multicollinearity analysis</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Models</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Logistic Regression (L2)</li>
                <li>Random Forest (100 trees)</li>
                <li>XGBoost (gradient boosting)</li>
                <li>PCA (sklearn decomposition)</li>
                <li>GridSearchCV tuning</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Evaluation</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Accuracy, Precision, Recall</li>
                <li>F1-score, AUC-ROC</li>
                <li>Confusion matrix</li>
                <li>5-fold cross-validation</li>
                <li>Feature importance ranking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { stat: "97.4%", label: "Test set accuracy achieved by the best-performing model (XGBoost)" },
              { stat: "98%", label: "Recall (sensitivity) for malignant class — minimizing missed cancer diagnoses" },
              { stat: "3 features", label: "Worst concave points, worst perimeter, and worst radius identified as key discriminators" },
              { stat: "0.997", label: "AUC-ROC score, indicating near-perfect class separation capability" },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-purple-600 pl-4 py-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{item.stat}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Model Comparison Table */}
          <h3 className="font-semibold text-lg mb-3">Model Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left px-4 py-2 font-semibold">Model</th>
                  <th className="text-center px-4 py-2 font-semibold">Accuracy</th>
                  <th className="text-center px-4 py-2 font-semibold">Recall (Malignant)</th>
                  <th className="text-center px-4 py-2 font-semibold">F1-Score</th>
                  <th className="text-center px-4 py-2 font-semibold">AUC-ROC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-2">Logistic Regression</td>
                  <td className="text-center px-4 py-2">96.5%</td>
                  <td className="text-center px-4 py-2">95%</td>
                  <td className="text-center px-4 py-2">0.962</td>
                  <td className="text-center px-4 py-2">0.994</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-2">Random Forest</td>
                  <td className="text-center px-4 py-2">96.5%</td>
                  <td className="text-center px-4 py-2">96%</td>
                  <td className="text-center px-4 py-2">0.963</td>
                  <td className="text-center px-4 py-2">0.996</td>
                </tr>
                <tr className="bg-purple-50 dark:bg-purple-900/20 font-semibold">
                  <td className="px-4 py-2 text-purple-700 dark:text-purple-400">XGBoost ✓ Best</td>
                  <td className="text-center px-4 py-2">97.4%</td>
                  <td className="text-center px-4 py-2">98%</td>
                  <td className="text-center px-4 py-2">0.973</td>
                  <td className="text-center px-4 py-2">0.997</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Clinical Significance */}
        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Clinical Significance &amp; Conclusions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The 98% recall result is particularly meaningful in a clinical context: false negatives (malignant tumors classified as benign) are far more dangerous than false positives, as they can lead to delayed treatment. By optimizing recall while maintaining high overall accuracy, this classifier design prioritizes patient safety.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The identification of just three key features—<strong>worst concave points</strong>, <strong>worst perimeter</strong>, and <strong>worst radius</strong>—suggests that a simplified diagnostic model using only these morphological extremes could achieve competitive performance, potentially reducing the measurement burden in clinical settings.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            PCA visualization further confirmed that the benign and malignant populations are largely linearly separable in the first two principal components, validating the appropriateness of linear classifiers like Logistic Regression alongside ensemble methods.
          </p>
        </section>

        {/* Back */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
