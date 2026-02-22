import React from "react";
import "./PerturbDiffPage.css";

type LinkInfo = {
  label: string;
  href: string;
};

const primaryLinks: LinkInfo[] = [
  { label: "Paper (PDF)", href: "#paper" }, // TODO: 替换成真实 PDF 链接
  { label: "Code (GitHub)", href: "#code" }, // TODO: 替换成真实 code repo
  { label: "Datasets", href: "#datasets" }, // TODO: 替换成真实数据链接
  { label: "BibTeX", href: "#bibtex" }
];

const navItems = [
  { id: "motivation", label: "Motivation" },
  { id: "method", label: "Method" },
  { id: "pretraining", label: "Pretraining" },
  { id: "datasets", label: "Datasets & Benchmarks" },
  { id: "results", label: "Results" },
  { id: "impact", label: "Impact" },
  { id: "references", label: "References" }
];

export const PerturbDiffPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pd-root">
      <div className="pd-hero-bg" />

      <header className="pd-header">
        <div className="pd-header-inner">
          <div className="pd-logo-area" onClick={() => scrollToSection("top")}>
            <div className="pd-logo-circle">PD</div>
            <div className="pd-logo-text">
              <span className="pd-logo-title">PerturbDiff</span>
              <span className="pd-logo-subtitle">
                Functional Diffusion for Single-Cell Perturbation
              </span>
            </div>
          </div>

          <nav className="pd-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="pd-nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="pd-main" id="top">
        {/* Hero Section */}
        <section className="pd-hero-section">
          <div className="pd-hero-content">
            <p className="pd-hero-tag">Paper Project Page</p>
            <h1 className="pd-hero-title">PerturbDiff</h1>
            <h2 className="pd-hero-subtitle">
              Functional diffusion for single-cell perturbation modeling
            </h2>
            <p className="pd-hero-summary">
              Modeling perturbation responses over{" "}
              <strong>distributions of cells</strong>, not individual cells.
            </p>

            <div className="pd-hero-links">
              {primaryLinks.map((link) => (
                <a
                  key={link.label}
                  className="pd-btn pd-btn-primary"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pd-authors">
              <div className="pd-authors-line">
                <span className="pd-author">Author A*</span>
                <span className="pd-author">Author B*</span>
                <span className="pd-author">Author C</span>
                <span className="pd-equal">* Equal contribution</span>
              </div>
              <div className="pd-affiliations">
                <span>Institute 1</span> · <span>Institute 2</span>
              </div>
            </div>
          </div>

          <div className="pd-hero-figure">
            <div className="pd-figure-placeholder">
              <div className="pd-figure-title">
                Manifold of Perturbed Distributions
              </div>
              <div className="pd-figure-subtitle">
                Instead of a single static response
              </div>
              <div className="pd-figure-note">
                TODO: Replace with main schematic figure
              </div>
            </div>
          </div>
        </section>

        {/* Problem Motivation */}
        <section id="motivation" className="pd-section">
          <div className="pd-section-header">
            <h2>Problem Motivation</h2>
            <p>
              Why modeling perturbation responses at the level of{" "}
              <strong>cell distributions</strong> is challenging and necessary.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Destructive measurements &amp; unpaired observations</h3>
                <p>
                  Single-cell RNA-seq is fundamentally <strong>destructive</strong>:
                  once a cell is sequenced, it can no longer be observed. As a
                  result, we never see the same cell both before and after a
                  perturbation. Existing methods therefore operate on{" "}
                  <strong>unpaired control and perturbed populations</strong>,
                  typically learning a mapping between their aggregate
                  distributions.
                </p>

                <h3>Latent factors and a manifold of responses</h3>
                <p>
                  However, these distributions are not fixed. Unobserved latent
                  factors—such as microenvironment, hidden cell state, donor
                  identity, and batch-specific effects—induce a{" "}
                  <strong>manifold of possible perturbed distributions</strong>,
                  even for the same perturbation and context labels.
                  Traditional models collapse this variability into a{" "}
                  <strong>single static distribution</strong>, obscuring
                  important biological uncertainty and heterogeneity.
                </p>
              </div>

              <div>
                <h3>Beyond a single “best” distribution</h3>
                <p>
                  To faithfully capture perturbation effects, we need models
                  that treat the perturbed population as a{" "}
                  <strong>distribution-valued random variable</strong> whose
                  realizations live on a structured manifold. Instead of
                  predicting one canonical response, the model should capture
                  how perturbation outcomes vary as latent factors change.
                </p>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: Single vs. Manifold
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert figure comparing a single perturbed
                    distribution vs. a manifold of distributions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Idea / Method */}
        <section id="method" className="pd-section pd-section-alt">
          <div className="pd-section-header">
            <h2>Key Idea &amp; Method</h2>
            <p>
              PerturbDiff diffuses directly in a{" "}
              <strong>function space of distributions</strong> via kernel mean
              embeddings.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Distribution-valued random variables</h3>
                <p>
                  PerturbDiff models the perturbed population as a{" "}
                  <strong>random variable taking values in the space of cell
                  distributions</strong>. Each experimental condition—specified
                  by control context <code>c</code> and perturbation label{" "}
                  <code>τ</code>—induces a <strong>distribution over
                  distributions</strong>, capturing heterogeneity across latent
                  factors such as microenvironment and donor.
                </p>

                <h3>Kernel mean embeddings in an RKHS</h3>
                <p>
                  To make this space tractable, PerturbDiff embeds each cell
                  distribution <code>P</code> as a point{" "}
                  <code>μ_P</code> in a reproducing kernel Hilbert
                  space (RKHS) via the <strong>kernel mean embedding</strong>:
                </p>

                <pre className="pd-code-snippet">
{`μ_P = E_{x ~ P}[ϕ(x)]  // ϕ: feature map induced by kernel k
‖μ_P - μ_Q‖_H^2 = MMD^2(P, Q)`}
                </pre>

                <p>
                  The squared RKHS distance between embeddings equals the{" "}
                  <strong>maximum mean discrepancy (MMD)</strong> between the
                  underlying distributions, providing a principled geometry over
                  cell populations.
                </p>
              </div>

              <div>
                <h3>Diffusion in function space</h3>
                <p>
                  PerturbDiff defines a diffusion process directly over these
                  embeddings, mirroring DDPM but operating on{" "}
                  <strong>distribution embeddings</strong> instead of individual
                  cell states. At each time step <code>t</code>, we corrupt a
                  clean embedding <code>μ_0</code> into a noisy
                  embedding <code>μ_t</code>, and learn a network to
                  denoise back.
                </p>

                <pre className="pd-code-snippet">
{`// Conceptual denoising step in embedding space
for t = T ... 1:
  ε̂_θ(μ_t, t, c, τ)  // predict noise on embedding
  μ_{t-1} = diffusion_step(μ_t, ε̂_θ, t)`}
                </pre>

                <p>
                  Because the loss is computed in RKHS distance, the denoising
                  objective <strong>naturally matches distributions</strong> in
                  MMD, aligning the denoised embedding with the target
                  perturbed distribution.
                </p>

                <h3>Conditional reverse process &amp; CFG</h3>
                <p>
                  The reverse process is conditioned on the control distribution
                  and experimental context. We adopt{" "}
                  <strong>classifier-free guidance</strong> at the level of
                  distribution embeddings:
                </p>

                <pre className="pd-code-snippet">
{`// Conditional guidance in embedding space
ε̂_guided = ε̂_θ(μ_t, t, c, τ) 
           + s · (ε̂_θ(μ_t, t, c, τ) - ε̂_θ(μ_t, t, c, null))`}
                </pre>

                <p>
                  where <code>s</code> controls guidance strength. This allows
                  PerturbDiff to steer towards condition-specific perturbed
                  distributions while retaining diversity across latent factors.
                </p>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: RKHS Diffusion Diagram
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert schematic: cell distributions → RKHS embeddings
                    → diffusion process.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pretraining & Data Efficiency */}
        <section id="pretraining" className="pd-section">
          <div className="pd-section-header">
            <h2>Pretraining &amp; Data Efficiency</h2>
            <p>
              Marginal pretraining over large-scale unperturbed data enables{" "}
              <strong>zero-shot</strong> and{" "}
              <strong>data-efficient fine-tuning</strong>.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Marginal pretraining on single-cell distributions</h3>
                <p>
                  Perturbed experiments are typically limited in both cell
                  types and perturbation coverage. To address this, PerturbDiff
                  first performs <strong>marginal pretraining</strong>, learning
                  to model single-cell distributions from a union of perturbation
                  datasets and large-scale unperturbed RNA-seq resources.
                </p>

                <p>
                  This pretraining phase exposes the model to a{" "}
                  <strong>broad spectrum of cellular states</strong> and
                  transcriptional programs, providing a strong prior for
                  downstream perturbation modeling.
                </p>

                <h3>Unified gene vocabulary</h3>
                <p>
                  We construct a unified gene vocabulary by taking the union of
                  highly variable genes across datasets, yielding{" "}
                  <strong>≈ 12 626 genes</strong>. This shared vocabulary
                  enables seamless transfer across datasets and perturbation
                  types without re-defining the representation space.
                </p>
              </div>

              <div>
                <h3>Zero-shot and fine-tuning gains</h3>
                <p>
                  Even without task-specific fine-tuning, the pretrained model
                  demonstrates <strong>non-trivial zero-shot predictive
                  capability</strong> on perturbation benchmarks. When data is
                  scarce, fine-tuning from this pretrained initialization
                  consistently outperforms training from scratch.
                </p>

                <ul className="pd-bullet-list">
                  <li>Improved sample efficiency in low-data regimes.</li>
                  <li>Faster convergence and more stable optimization.</li>
                  <li>Better generalization to unseen cell types and contexts.</li>
                </ul>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: Pretraining vs. Scratch
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert bar plot: zero-shot, fine-tuned, scratch.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Datasets & Benchmarks */}
        <section id="datasets" className="pd-section pd-section-alt">
          <div className="pd-section-header">
            <h2>Datasets &amp; Benchmarks</h2>
            <p>
              Evaluated on three widely used single-cell perturbation
              benchmarks with diverse metrics.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Benchmarks</h3>
                <p>
                  PerturbDiff is evaluated on three representative single-cell
                  perturbation benchmarks:
                </p>
                <ul className="pd-bullet-list">
                  <li>
                    <strong>PBMC (signaling)</strong> – cytokine and signaling
                    perturbations in peripheral blood mononuclear cells.
                  </li>
                  <li>
                    <strong>Tahoe100M (drug)</strong> – large-scale drug
                    perturbation dataset with diverse compounds and doses.
                  </li>
                  <li>
                    <strong>Replogle (genetic)</strong> – CRISPR-based genetic
                    perturbations across targets and cell types.
                  </li>
                </ul>

                <p>
                  Following prior work, we report <strong>14 metrics</strong>
                  spanning distribution alignment, differential expression, and
                  cell-type–specific responses.
                </p>
              </div>

              <div>
                <h3>Problem formulation</h3>
                <p>
                  For each benchmark, we observe unpaired control and perturbed
                  populations:
                </p>

                <pre className="pd-code-snippet">
{`Given:
  P_ctrl(c)        // control distribution under context c
  P_pert(c, τ)     // perturbed distribution for perturbation τ in context c

Goal:
  Learn F such that:
  P̂_pert(c, τ) = F(P_ctrl(c), c, τ)
  and P̂_pert(c, τ) ≈ P_pert(c, τ) in distribution space`}
                </pre>

                <p>
                  PerturbDiff learns <code>F</code> implicitly via a diffusion
                  process over RKHS embeddings, allowing sampling of{" "}
                  <strong>multiple plausible perturbed distributions</strong>
                  for the same <code>(c, τ)</code> pair.
                </p>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: Dataset Overview
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert table/diagram summarizing PBMC, Tahoe100M,
                    Replogle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="pd-section">
          <div className="pd-section-header">
            <h2>Results</h2>
            <p>
              PerturbDiff achieves state-of-the-art performance across
              signaling, drug, and genetic perturbation benchmarks.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Quantitative performance</h3>
                <p>
                  Across all three benchmarks and 14 evaluation metrics,
                  PerturbDiff attains{" "}
                  <strong>state-of-the-art or competitive performance</strong>,
                  with notable gains in:
                </p>
                <ul className="pd-bullet-list">
                  <li>
                    Distribution-level alignment (e.g., MMD, Wasserstein
                    distances).
                  </li>
                  <li>
                    Recovery of perturbation-driven differential expression
                    profiles.
                  </li>
                  <li>
                    Robustness and adaptation in low-data and cross-context
                    settings.
                  </li>
                </ul>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: Radar / Bar Plot
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert radar chart or bar chart summarizing key metric
                    improvements over baselines.
                  </div>
                </div>
              </div>

              <div>
                <h3>Differential expression recovery</h3>
                <p>
                  By modeling the entire manifold of perturbed distributions,
                  PerturbDiff better captures{" "}
                  <strong>context-specific and cell-type–specific differential
                  expression</strong>. This leads to more faithful virtual
                  replication of experimental outcomes and improved prioritization
                  of candidate targets or compounds.
                </p>

                <h3>Effect of pretraining</h3>
                <p>
                  Marginal pretraining yields strong{" "}
                  <strong>zero-shot performance</strong> and significantly
                  improves the efficiency of fine-tuning:
                </p>
                <ul className="pd-bullet-list">
                  <li>Higher performance with fewer labeled perturbation cells.</li>
                  <li>Smaller performance gap between low- and high-data regimes.</li>
                </ul>

                <div className="pd-figure-placeholder pd-figure-small">
                  <div className="pd-figure-title">
                    Placeholder: DE Heatmap / Qualitative
                  </div>
                  <div className="pd-figure-note">
                    TODO: Insert qualitative figure showing improved DE recovery
                    (e.g., gene-wise effect size vs. ground truth).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Applications */}
        <section id="impact" className="pd-section pd-section-alt">
          <div className="pd-section-header">
            <h2>Impact &amp; Applications</h2>
            <p>
              A principled paradigm for virtual cell modeling and experimental
              design.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Virtual perturbation and experimental design</h3>
                <p>
                  PerturbDiff enables <strong>virtual experiments</strong>:
                  given control populations, contexts, and perturbation labels,
                  the model can synthesize plausible perturbed distributions,
                  supporting:
                </p>
                <ul className="pd-bullet-list">
                  <li>
                    Hypothesis generation for functional genomics and CRISPR
                    screens.
                  </li>
                  <li>
                    In silico evaluation of drug combinations and dosing
                    strategies.
                  </li>
                  <li>
                    Prioritization of follow-up experiments and validation
                    campaigns.
                  </li>
                </ul>
              </div>

              <div>
                <h3>Caveats and responsible use</h3>
                <p>
                  Like all data-driven models, PerturbDiff reflects the{" "}
                  <strong>biases and coverage of its training data</strong>. 
                  Over-interpreting model outputs as ground truth can lead to
                  misleading biological conclusions, especially in under-sampled
                  cell types or perturbation regimes.
                </p>

                <p>
                  We therefore advocate using PerturbDiff as a{" "}
                  <strong>decision-support tool</strong> rather than a
                  replacement for wet-lab experiments: virtual predictions
                  should be combined with domain expertise and{" "}
                  <strong>prospective experimental validation</strong> before
                  acting on them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* References / Related Work */}
        <section id="references" className="pd-section">
          <div className="pd-section-header">
            <h2>References &amp; Related Work</h2>
            <p>
              Positioning PerturbDiff among existing approaches for single-cell
              perturbation modeling.
            </p>
          </div>

          <div className="pd-section-body">
            <div className="pd-two-column">
              <div>
                <h3>Related approaches</h3>
                <ul className="pd-bullet-list">
                  <li>
                    <strong>Random pairing regression</strong> – models that
                    regress perturbed cell states on randomly paired control
                    cells, often ignoring distribution-level structure.
                  </li>
                  <li>
                    <strong>Optimal transport (OT)</strong> – methods that map
                    control to perturbed distributions via OT plans or learned
                    transport maps; typically assume a{" "}
                    <strong>single target distribution</strong> for each
                    condition.
                  </li>
                  <li>
                    <strong>Flow matching</strong> – continuous-time normalizing
                    flows modeling the mapping between control and perturbed
                    populations.
                  </li>
                  <li>
                    <strong>Diffusion models</strong> – score-based models
                    defined over cell states or latent embeddings, but usually
                    targeting a <strong>fixed perturbed distribution</strong>.
                  </li>
                </ul>

                <p>
                  In contrast, PerturbDiff is, to our knowledge, the{" "}
                  <strong>first method to explicitly model the manifold of
                  perturbed distributions</strong> as a distribution-valued
                  random variable in function space, with diffusion operating
                  directly on kernel mean embeddings.
                </p>
              </div>

              <div id="bibtex">
                <h3>BibTeX</h3>
                <p>Use the following citation for PerturbDiff (edit as needed):</p>

                <pre className="pd-code-snippet pd-code-small">
{`@article{perturbdiff,
  title   = {PerturbDiff: Functional Diffusion for Single-Cell Perturbation Modeling},
  author  = {Your, Name and Coauthor, Name and Others, Name},
  journal = {Proceedings of ...},
  year    = {2025},
  note    = {arXiv preprint arXiv:xxxx.xxxxx},
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="pd-footer" id="paper">
          <div className="pd-footer-content">
            <div>
              <span>© {new Date().getFullYear()} PerturbDiff.</span>{" "}
              <span>
                Template inspired by{" "}
                <a
                  href="https://temporalscorerescaling.github.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Temporal Score Rescaling
                </a>
                .
              </span>
            </div>
            <div>
              <a href="#top" className="pd-footer-link">
                Back to top
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

