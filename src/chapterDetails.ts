export interface FormulaDetail {
  label: string;
  expression: string;
  explanation: string;
}

export interface SolvedProblem {
  question: string;
  steps: string[];
  finalAnswer: string;
}

export interface ChapterDeepDive {
  chapterId: number;
  title: string;
  deepTheory: string;
  criticalFormula: string;
  formulas: FormulaDetail[];
  solvedProblems: SolvedProblem[];
  industrialInsight: string;
}

export const CHAPTERS_DEEP_DIVE: ChapterDeepDive[] = [
  {
    chapterId: 1,
    title: "Data Characterization in Automation Systems",
    deepTheory: "In automation engineering, data characterization serves as the vital link between raw physical measurements and machine control signals. Systems possess systematic and random variances. To inspect tool-wear drift or positioning consistency, we deploy descriptive summary metrics. Measuring central tendencies represents the process' alignment, while measuring dispersion assesses the stability. In precision manufacturing, the Standard Deviation is a direct reflection of mechanical repeatabilities. However, comparing absolute standard deviations is highly misleading when the means are in different orders of scale. To solve this, we compute the Coefficient of Variation (CV%), which normalizes variance as a percentage of the process mean. Outliers, which represent severe anomalies (e.g. workpiece slip, sensor spike, or tool fractures), are filtered mathematically using Turkey's Interquartile Range (IQR) fences. The LSL (Lower Spec Limit) and USL (Upper Spec Limit) define the customer boundaries, while the IQR fences identify internal process issues.",
    criticalFormula: "CV = (\\sigma / \\mu) \\times 100",
    formulas: [
      {
        label: "Sample Mean (Estimation of Center)",
        expression: "\\bar{X} = \\frac{1}{n} \\sum_{i=1}^{n} X_i",
        explanation: "The mid-point gravity of all industrial records. Establishes if the machine head sits centered on-spec."
      },
      {
        label: "Sample Standard Deviation",
        expression: "s = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (X_i - \\bar{X})^2}",
        explanation: "Quantifies average mechanical positioning scatter around the center. Derived with Bessel's correction (n - 1) for unbiased variance estimation."
      },
      {
        label: "Coefficient of Variation (Relative Dispersion)",
        expression: "CV = \\frac{s}{\\bar{X}} \\times 100\\%",
        explanation: "Dimensionless ratio. Represents manufacturing stability relative to mean. Highly stable lines exhibit CV < 0.1%."
      },
      {
        label: "Interquartile Range Outliers Detector (IQR)",
        expression: "Fence_{Lower} = Q_1 - 1.5 \\cdot IQR, \\quad Fence_{Upper} = Q_3 + 1.5 \\cdot IQR",
        explanation: "Standard IQR = Q3 - Q1. Fences filter technical anomalies from natural spindle vibration noise without assuming normal distribution."
      }
    ],
    solvedProblems: [
      {
        question: "A 6-DOF robotic welder arm logs physical position displacement deviations across five trials: [25.04mm, 24.98mm, 25.01mm, 25.03mm, 24.94mm]. Calculate the Sample Mean, Sample Standard Deviation, and the Coefficient of Variation.",
        steps: [
          "1. Process the Sample Mean: Mean = (25.04 + 24.98 + 25.01 + 25.03 + 24.94) / 5 = 125.00 / 5 = 25.000 mm.",
          "2. Calculate squared differences from the Mean (X_i - Mean)^2: [(0.04)^2, (-0.02)^2, (0.01)^2, (0.03)^2, (-0.06)^2] = [0.0016, 0.0004, 0.0001, 0.0009, 0.0036] mm^2.",
          "3. Sum of Squared Errors (SSE) = 0.0016 + 0.0004 + 0.0001 + 0.0009 + 0.0036 = 0.0066 mm^2.",
          "4. Compute Sample Variance: s^2 = SSE / (n - 1) = 0.0066 / 4 = 0.00165 mm^2.",
          "5. Compute Sample Standard Deviation: s = sqrt(0.00165) = 0.04062 mm (representing positioning repeatability of 40.6 micrometers).",
          "6. Solve Coefficient of Variation: CV% = (s / Mean) * 100 = (0.04062 / 25.00) * 100 = 0.1625%."
        ],
        finalAnswer: "Mean = 25.00 mm, Std Dev = 0.0406 mm, CV = 0.1625%"
      }
    ],
    industrialInsight: "Intelligent manufacturing systems use live box plot limits to monitor machine repeatability. If the IQR spans wide, it signifies friction wear or looseness in ball screws, alerting the maintenance team before product failure occurs."
  },
  {
    chapterId: 2,
    title: "Probabilistic Modeling of Uncertainty",
    deepTheory: "All automated control sequences face physical uncertainty—components fail, environment temperatures change, and optical sensors experience glitches. To handle this, we construct Axiomatic and Conditional probability models. Adding redundant channels (multi-sensor setups) protects systems because the probability of joint failures of independent elements is extremely low. However, we must deal with conditional pathways using the Law of Total Probability. Furthermore, sensors generate errors (False Alarms vs Overlooked Defect tracks). Real-time decision systems deploy Bayes' Theorem. This theorem updates our confidence of machine status based on test outputs: P(Failure | Alarm) = P(Alarm | Failure) * P(F) / P(Alarm). This explains why a high-accuracy alarm system might still output high false warning logs if the actual incidence baseline is rare.",
    criticalFormula: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}",
    formulas: [
      {
        label: "Addition Rule (Union of Events)",
        expression: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        explanation: "Derives probability of at least one system failure when multiple redundant lines work in tandem."
      },
      {
        label: "Multiplication Rule (Joint Independence)",
        expression: "P(A \\cap B) = P(A) \\cdot P(B|A) = P(A) \\cdot P(B)",
        explanation: "Models joint probability of events occurring together. In isolated electronics, redundant channels are multiplied to find safety failures."
      },
      {
        label: "Law of Total Probability",
        expression: "P(E) = \\sum_{i=1}^{k} P(E|B_i) \\cdot P(B_i)",
        explanation: "Calculates total probability by weighting conditional branches over all mutually exclusive, exhaustive partitions of sample space."
      },
      {
        label: "Bayes' Theorem (Belief Updating)",
        expression: "P(F|W) = \\frac{P(W|F) \\cdot P(F)}{P(W|F)P(F) + P(W|N)P(N)}",
        explanation: "Updates the probability of a true physical condition (Failure F) given a sensor indicator (Warning W), separating true signals from sensor noise."
      }
    ],
    solvedProblems: [
      {
        question: "An automated assembly line features an optical sensor that monitors conveyor jams. Historically, jams are rare, occurring in only 1.5% of shifts: P(J) = 0.015. The sensor has 96% sensitivity: P(W|J) = 0.96. However, normal runs trigger false alarms 3% of the time: P(W|N) = 0.03. If the alarms klaxon triggers, calculate the mathematical posterior probability that a physical jam is actually happening.",
        steps: [
          "1. Map out the given priors: P(Jam) = 0.015, P(Normal) = 1 - 0.015 = 0.985, P(Warn | Jam) = 0.96, P(Warn | Normal) = 0.03.",
          "2. Apply Law of Total Probability to compute the total probability of Warning P(W): P(W) = P(W|J)*P(J) + P(W|N)*P(N) = (0.96 * 0.015) + (0.03 * 0.985) = 0.0144 + 0.02955 = 0.04395.",
          "3. Deploy Bayes' Theorem to calculate the posterior P(Jam | Warning): P(Jam | W) = [P(Warn | Jam) * P(Jam)] / P(W) = 0.0144 / 0.04395 = 0.3276.",
          "4. Interpret the result: Even though the sensor has 96% correct detection sensitivity, if an alarm rings, there is only a 32.76% probability that a real jam is happening. 67.24% of the alarms represent simple system noise!"
        ],
        finalAnswer: "P(Warning) = 4.40%, Posterior P(Jam|Warning) = 32.76%"
      }
    ],
    industrialInsight: "This Bayesian gap is the cause of 'Alarm Fatigue' in automated control centers. When alerts represent false alarms more than true issues, human operators start ignoring them, leading to safety breaches. Smart factories resolve this by adding secondary sensor verification."
  },
  {
    chapterId: 3,
    title: "Statistical Distribution Models",
    deepTheory: "To predict behavior in large production lines without checking every single item, engineers represent manufacturing processes using standardized Probability Distribution Models. Discrete parameters like joint defects are mapped to Binomial or Poisson models. The Binomial Distribution assumes a fixed number of attempts (e.g. testing 80 solder pins) with a constant failure probability, while the Poisson is a limiting case used for random, rare incidents across continuous space or time (e.g., weld faults occurring per hour). For continuous measurements, like physical shaft diameters, we deploy the Normal (Gaussian) Distribution. By performing Normal standardization, we convert raw values into a universal standard Z-score: Z = (X - Mean) / SD. Z-scores represent standard deviations from the process target mean. This standard curve, coupled with the Central Limit Theorem, enables engineers to establish reliable 3-sigma process limits (representing 99.73% coverage).",
    criticalFormula: "Z = (X - \\mu) / \\sigma",
    formulas: [
      {
        label: "Binomial Mass Function (Defect Lots)",
        expression: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}",
        explanation: "Finds the probability of finding exactly k failed items out of n independent trials, each with success rate p."
      },
      {
        label: "Poisson Mass Function (Fault Rates)",
        expression: "P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}",
        explanation: "Models rate of rare occurrences happening inside a fixed space or interval. Used for counting random component errors."
      },
      {
        label: "Normal Gaussian Density (Continuous Dev)",
        expression: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
        explanation: "The symmetrical bell curve representing physical errors. The standard deviation shape dictates consistency."
      },
      {
        label: "Normal Standardization (Z-score)",
        expression: "Z = \\frac{X - \\mu}{\\sigma}",
        explanation: "Normalizes any continuous distribution onto the standard Normal curve N(0, 1), allowing lookups in Z-tables."
      }
    ],
    solvedProblems: [
      {
        question: "An automated picker places electronic modules. SMT placement deviations follow a Normal curve with a mean of 0.50 mm and standard deviation of 0.07 mm: N(0.50, 0.07^2). The component tolerance specification is set between 0.40 mm and 0.60 mm. Calculate the percentage of placed electronic components that will fall outside tolerance specs.",
        steps: [
          "1. State the parameters: Mean = 0.50 mm, SD = 0.07 mm. LSL = 0.40 mm, USL = 0.60 mm.",
          "2. Calculate boundary Z-scores for specs limits: Z_LSL = (0.40 - 0.50) / 0.07 = -1.43. Z_USL = (0.60 - 0.50) / 0.07 = +1.43.",
          "3. Use standard normal CDF tables: P(Z < -1.43) = 0.0764. P(Z < 1.43) = 0.9236.",
          "4. Find proportion within boundaries: P(-1.43 < Z < 1.43) = P(Z < 1.43) - P(Z < -1.43) = 0.9236 - 0.0764 = 0.8472 (or 84.72% within specs).",
          "5. Find defect percentage (outside standard bounds): P(outside) = 1 - 0.8472 = 0.1528 (or 15.28% fail rates)."
        ],
        finalAnswer: "Correct placement = 84.72%, Out-of-spec defects = 15.28%"
      }
    ],
    industrialInsight: "Six Sigma process guidelines aim to minimize standard deviations so that USL and LSL are placed 6-sigma away from the mean, resulting in a defect rate of only 3.4 defects per million opportunities."
  },
  {
    chapterId: 4,
    title: "Statistical Inference for Decision-Making in Automation",
    deepTheory: "Engineers rarely have access to complete history records; they must make decisions based on finite trial runs. For instance, testing if a new machine is faster requires observing 20 batches. Statistical Inference uses mathematics to determine if calculated sample averages represent actual process stability or just random noise. First, we construct Confidence Intervals to estimate the population parameters within bounded limits (e.g. 95% certainty of output). Second, we conduct formal Hypothesis Testing. The Null Hypothesis (H0) assumes the target holds, while the Alternative (H1) assumes a shift has occurred. To decide, we calculate a test statistic (t or Z), look up critical value flags, and compute the probability p-value. If the p-value is below our significance threshold (Typical alpha = 0.05), we reject the null hypothesis, confirming a shift has occurred. In doing so, we must manage Type I Error (False Alarm / Producer's risk) and Type II Error (Missing actual tool-slips).",
    criticalFormula: "t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}",
    formulas: [
      {
        label: "Standard Error (Sampling Dispersion)",
        expression: "SE = \\frac{s}{\\sqrt{n}}",
        explanation: "Measures statistical scatter of sample means across repeated trials. Decreases as sample size increases."
      },
      {
        label: "Confidence Interval for Mean (Sigma Unknown)",
        expression: "CI = \\bar{X} \\pm t_{\\alpha/2, df} \\cdot \\left(\\frac{s}{\\sqrt{n}}\\right)",
        explanation: "Defines the band containing the true process average with a specified confidence level (typical 95% interval)."
      },
      {
        label: "t-Statistic (One Sample t-test)",
        expression: "t = \\frac{\\bar{X} - \\mu_0}{s / \\sqrt{n}}",
        explanation: "Calculates the distance between the observed sample average bar{X} and the nominal target mu_0 in standard error units."
      },
      {
        label: "Z-Statistic (One Sample Z-test)",
        expression: "Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}}",
        explanation: "Standard test deployed instead of t-test when the historical population standard deviation sigma is known."
      }
    ],
    solvedProblems: [
      {
        question: "A beverage company filling line is set to package 500 mL of fluid. A random sample of n = 16 bottles yields an average fill of 500.80 mL with a sample standard deviation of 1.20 mL. Perform a hypothesis test to determine if the line is overfilling. Use alpha = 0.05.",
        steps: [
          "1. Formulate hypotheses: Null H0: mu = 500 mL (filling is on-target). Alternate H1: mu > 500 mL (system is overfilling, indicating a 1-sided test).",
          "2. Compile parameters: Sample mean = 500.80 mL, Standard Deviation s = 1.20 mL, sample size n = 16, df = 15.",
          "3. Calculate Standard Error (SE): SE = s / sqrt(n) = 1.20 / sqrt(16) = 1.20 / 4 = 0.30 mL.",
          "4. Calculate observed t-statistic: t_cal = (500.80 - 500.00) / 0.30 = 0.80 / 0.30 = 2.667.",
          "5. Determine t-critical bounds: For df = 15 and 1-sided alpha = 0.05, critical t_table = 1.753.",
          "6. Execute decision path: Since t_cal (2.667) is greater than t-critical (1.753), we Reject the Null Hypothesis (H0).",
          "7. Conclusion: There is statistically significant evidence at 95% confidence that the valves are overfilling (p-value < 0.05). Corrective recalibration is required."
        ],
        finalAnswer: "t-cal = 2.67 > t-critical = 1.75. Reject H0 (Overfilling confirmed)"
      }
    ],
    industrialInsight: "Hypothesis testing acts as the gatekeeper for upgrading automation equipment. An upgrade is only approved if a t-test proves that the throughput gains are statistically significant, preventing companies from investing in minor noise variation."
  },
  {
    chapterId: 5,
    title: "Data Relationship Modeling in Automation and Robotic Systems",
    deepTheory: "Modern robots are complete multi-sensor systems. For instance, a robotic pick-and-place arm adjusts its speed based on temperature, payload weight, and supply voltage. To represent these dependencies, we deploy Correlation and Regression modeling. S_xy Covariance and Pearson's r quantify the linear relationship between feedback channels. Simple Linear Regression isolates relationship trends between a predictor X (e.g. locking torque servo) and a response Y (e.g., structural joint vibration index) by deriving an Ordinary Least Squares (OLS) line: Y = slope * X + intercept. Analysis of Variance (ANOVA / F-test) evaluates the model's validity by comparing explained regression variances against unexplained residuals. When systems are complex, multiple linear regression models are deployed, while Logistic Regression is used when predicting binary outcomes (e.g., whether a machine joint is 'Healthy' (1) or 'Failed' (0)).",
    criticalFormula: "Y = \\beta_0 + \\beta_1 X + \\epsilon",
    formulas: [
      {
        label: "Pearson Correlation Coefficient (r)",
        expression: "r = \\frac{\\sum (X - \\bar{X})(Y - \\bar{Y})}{\\sqrt{\\sum(X-\\bar{X})^2 \\sum(Y-\\bar{Y})^2}}",
        explanation: "Measures strength and direction of linear association between two variables. Ranges from -1.0 to +1.0."
      },
      {
        label: "OLS Slope Estimate (Beta_1)",
        expression: "\\beta_1 = \\frac{n\\sum XY - \\sum X \\sum Y}{n\\sum X^2 - (\\sum X)^2} = \\frac{Cov(X,Y)}{Var(X)}",
        explanation: "Derives the change in response variable Y for every single unit increase in predictor variable X."
      },
      {
        label: "OLS Intercept Estimate (Beta_0)",
        expression: "\\beta_0 = \\bar{Y} - \\beta_1 \\bar{X}",
        explanation: "The predicted starting value of response Y when the predictor variable X is set to zero."
      },
      {
        label: "Coefficient of Determination (R^2)",
        expression: "R^2 = 1 - \\frac{SS_{residuals}}{SS_{total}}",
        explanation: "Measures model goodness-of-fit. Represents the percentage of total variance in Y explained by the predictor X."
      }
    ],
    solvedProblems: [
      {
        question: "An assembly line records joint fastening torque X (Nm) vs vibration logs Y (mm/s). Across three tests, we observe: (10Nm, 2mm/s), (15Nm, 3mm/s), and (20Nm, 4mm/s). Calculate Pearson's r, the OLS Regression line slope (Beta_1) and the intercept (Beta_0).",
        steps: [
          "1. Summarize: Mean X = (10+15+20)/3 = 15 Nm, Mean Y = (2+3+4)/3 = 3 mm/s.",
          "2. Calculate variances/covariance terms: Sum(X-X_bar)^2 = (10-15)^2 + (15-15)^2 + (20-15)^2 = 25 + 0 + 25 = 50. Sum(Y-Y_bar)^2 = (2-3)^2 + (3-3)^2 + (4-3)^2 = 1 + 0 + 1 = 2.",
          "3. Calculate sum of products: Sum(X-X_bar)*(Y-Y_bar) = (10-15)*(2-3) + (15-15)*(3-3) + (20-15)*(4-3) = (-5 * -1) + (0) + (5 * 1) = 5 + 5 = 10.",
          "4. Compute Pearson's r: r = 10 / sqrt(50 * 2) = 10 / sqrt(100) = 10 / 10 = 1.0 (indicating absolute positive correlation).",
          "5. Solve OLS Slope Beta_1: Beta_1 = Cov(X,Y) / Var(X) = 10 / 50 = 0.20 mm/s per Nm.",
          "6. Solve OLS Intercept Beta_0: Beta_0 = Mean Y - Beta_1 * Mean X = 3.0 - 0.20 * 15 = 3.0 - 3.0 = 0.0 mm/s.",
          "7. Formulate regression: The model is Y = 0.0 + 0.20X (or Y = 0.20X)."
        ],
        finalAnswer: "Pearson r = 1.0, Slope = 0.20, Intercept = 0.0. Line: Y = 0.20X"
      }
    ],
    industrialInsight: "Using regression models, smart sensors predict a machine's Remaining Useful Life (RUL). By comparing vibration speeds and thermo feedback against past failure curves, lines trigger auto-maintenance days in advance of failure."
  }
];
