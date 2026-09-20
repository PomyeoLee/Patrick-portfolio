import Link from "next/link"
import { ArrowLeft, BarChart2, Database, Layers, Network, Settings2, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EcommerceRepresentationProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            Customer Behavioral Representation Learning
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
            Multi-task &amp; contrastive Transformers for churn and purchase propensity
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "PyTorch",
              "Transformers",
              "Multi-Task Learning (MTL)",
              "Contrastive Learning",
              "Neural Network Stacking",
              "Feature Engineering",
              "Representation Learning",
            ].map((tag) => (
              <Badge key={tag} variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Built a multi-task e-commerce prediction pipeline combining{" "}
            <strong>
              behavioral feature engineering, intent-aware Multi-Task Learning (MTL) Transformer,
              contrastive-learning Transformer, and a neural stacking model
            </strong>{" "}
            to predict customer churn and purchase propensity. Trained on{" "}
            <strong>853K users and 136M behavioral events</strong>, achieving{" "}
            <strong>0.792 SKU and 0.789 category propensity AUC</strong> on held-out users.
          </p>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Dataset Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            An e-commerce dataset capturing customer behavioral events across a multi-month time
            span, split into three consecutive periods: a ~5-month pre-training window, followed by
            two sequential two-week windows used for training and evaluation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: "Pre-training", detail: "~5 months", role: "History & features" },
              { label: "Training", detail: "2 weeks", role: "Label window" },
              { label: "Evaluation", detail: "2 weeks", role: "Held-out labels" },
            ].map((period, i) => (
              <div
                key={period.label}
                className="relative rounded-lg border border-purple-200/80 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-1">
                  {i + 1}. {period.label}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{period.detail}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{period.role}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-400">
            Data Files
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Item attributes
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Product metadata covering items active during the pre-training period.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Customer interactions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Event logs for ~1M customers across five behavior types:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Purchases", "Add-to-cart", "Remove-from-cart", "Page visits", "Search queries"].map(
                  (event) => (
                    <Badge
                      key={event}
                      variant="outline"
                      className="text-xs bg-gray-50 dark:bg-gray-700/50"
                    >
                      {event}
                    </Badge>
                  )
                )}
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Target labels
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Derived from purchase events in the training and evaluation windows:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Churn</strong> — whether a previously active customer made any purchase
                </li>
                <li>
                  <strong>Propensity</strong> — likelihood of purchasing specific products,
                  categories, or price ranges (including cold-start products)
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-400">
            Historical Features
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            From pre-training purchase history, per-customer features are computed:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Average price",
              "Max price",
              "Price variability",
              "High-value purchase rate",
            ].map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-600" />
            Architecture
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
            Three complementary user representations fused by concatenation (~934d) and fed into a
            final stacking MLP:
          </p>
          <div className="space-y-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">
                Feature Engineering (FE, ~166d)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Hand-crafted behavioral aggregates: event counts, top-N SKU/category/URL patterns,
                price-bin stats; no neural net, strong tabular baseline.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">
                MTL Transformer (256d)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                2-layer Transformer encoder trained jointly on 8 tasks (binary churn/add-to-cart +
                100-way multi-label buy/add × SKU/category/price) via BCE loss; PLE (Progressive
                Layered Extraction) shared + per-task experts to reduce task conflict; best
                validation sum-AUROC (churn + buy-SKU + buy-category){" "}
                <strong>1.848</strong> at epoch 15 of 25.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">
                CL Transformer (512d)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                2-layer Transformer (embed_dim=512, 8 heads) trained with contrastive loss
                (temperature=0.02) + auxiliary BCE heads; SVD-based sparse CF side features
                (SKU/URL, 64d each); adversarial relevant-client upweighting classifier (val AUC
                0.870); RAdam Schedule-Free optimizer.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-purple-600" />
            Key Engineering
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed list-disc list-outside ml-5">
            <li>
              Strict temporal split: features from pre-cutoff history only; labels from future
              target windows — no leakage
            </li>
            <li>
              Three-block representation diversity: explicit behavioral counts (FE), intent-optimized
              sequential state (MTL), journey-similarity geometry (CL)
            </li>
            <li>
              Mixed-precision training throughout (fp16/bf16 per GPU); BCE losses forced fp32 under
              autocast for numerical stability
            </li>
            <li>
              853K-user embedding exports (FE: 166d, MTL: 256d, CL: 512d) fused at inference via early
              concatenation
            </li>
          </ul>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                stat: "0.792 / 0.789",
                label: "SKU and category propensity AUC on held-out users (0.769 churn AUC)",
              },
              {
                stat: "+11.5%",
                label: "MTL sum-AUROC improved from 1.658 to 1.848 across 683K training users",
              },
              {
                stat: "853K / 136M",
                label: "Users and behavioral events in the end-to-end GPU pipeline (~35 hours)",
              },
              {
                stat: "934d",
                label: "Fused representation: 166d FE + 256d MTL + 512d CL for multi-task stacking",
              },
            ].map((item) => (
              <div key={item.stat} className="border-l-4 border-purple-600 pl-4 py-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed list-disc list-outside ml-5">
            <li>
              Achieved <strong>0.792 SKU and 0.789 category propensity AUC</strong>, with{" "}
              <strong>0.769 churn AUC</strong> on held-out users using a single multi-task stacking
              model
            </li>
            <li>
              Improved MTL Transformer validation <strong>sum-AUROC from 1.658 to 1.848 (+11.5%)</strong>,
              jointly optimizing churn and purchase-intent objectives across 683K training users
            </li>
            <li>
              Scaled end-to-end training and inference to{" "}
              <strong>853K users and 136M behavioral events</strong>, completing the multi-stage GPU
              pipeline in <strong>~35 hours</strong>
            </li>
            <li>
              Fused <strong>166d behavioral features, 256d intent-aware MTL embeddings, and 512d
              contrastive embeddings</strong> into a unified <strong>934d representation</strong> for
              downstream multi-task prediction
            </li>
          </ul>
        </section>

        <section className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow p-7">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Stack
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            PyTorch, Transformers, Multi-Task Learning (MTL), Contrastive Learning, Neural Network
            Stacking, Feature Engineering, Representation Learning
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/#projects"
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
