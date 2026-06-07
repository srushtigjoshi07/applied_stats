/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit, CourseOutcome, LabExperiment, WeekPlan, ResourceItem } from './types';

export const UNIVERSITY_INFO = {
  name: "KLE Technological University",
  logoText: "KLE TECH",
  tagline: "Creating Value, Leveraging Knowledge",
  department: "DEPARTMENT OF MATHEMATICS",
  courseTitle: "Applied Statistics",
  courseCode: "25EMAB218",
  semester: "IV Semester",
  academicYear: "2025-26",
  syllabusVersion: "FMTH0306/Rev.1.0",
  totalHours: "30 Theory + 24 Lab",
  examDuration: "2 Hours (SEE)",
  marksDistribution: {
    isa1: 30, // In semester 1
    isa2: 30, // In semester 2
    lab: 20,
    see: 60,
    isaWeightage: 33, // 33% weightage (conducted for 30+30, scaled)
    labWeightage: 17, // 17% weightage
    seeWeightage: 50, // 50% weightage
    total: 100
  },
  authors: [
    { title: "Lesson Plan Author", name: "Dr. Narayan Swamy", role: "Professor of Mathematics" },
    { title: "Checked By", name: "Dr. G.N. Bhadri", role: "Associate Professor & Head" },
    { title: "Portfolio Student", name: "Srushti G Joshi", srn: "01FE24BAR014", date: "June 2026" }
  ]
};

export const COURSE_OVERVIEW_TEXT = `
Applied Statistics (25EMAB218) is a core mathematical and engineering modeling course designed specifically for IV Semester UG students in Automation, Robotics, and Systems Engineering at KLE Technological University. The course equips students with statistical methods, probabilistic models, and inference tools critical for designing, analyzing, and optimizing high-precision automated manufacturing processes. 

Integrating mathematical theory with heavy Python statistical programming, this course empowers engineers to quantify system reliability, perform automated inspections, evaluate machine positioning accuracy, detect anomalies, set alarm safety thresholds, and build predictive regression algorithms.
`;

export const COURSE_OBJECTIVES = [
  "Equip students with the ability to summarize, visualize and interpret high-volume manufacturing and process datasets using robust statistical metrics.",
  "Develop probabilistic reasoning frameworks to model and update uncertainty state in robotic actuation, sensor measurements, and defect detection cycles.",
  "Instill mastery over continuous and discrete probability distributions to model and analyze systemic tool wear and high-volume product defects.",
  "Introduce mathematical statistical inference, hypothesis testing, and confidence intervals to validate if processes operate within nominal tolerance zones.",
  "Enable predictive tracking through covariance analysis, linear, multivariate, and logistic regression models to support predictive maintenance decision-making."
];

export const COURSE_OUTCOMES: CourseOutcome[] = [
  {
    id: 1,
    code: "CO-1",
    description: "Explain and Apply measures of central tendency and dispersion to summarize, visualize, and interpret data generated from automated system processes.",
    weightage: "20%",
    poMapping: { "PO1": "H", "PO2": "M", "PO3": "L", "PO4": "H", "PO5": "H", "PO6": "-", "PO7": "-", "PO8": "-", "PO9": "L", "PO10": "-", "PO11": "-", "PO12": "M" }
  },
  {
    id: 2,
    code: "CO-2",
    description: "Apply conditional probability concepts, law of total probability, and Bayes' theorem to model uncertainty and calculate diagnostic helper states in automation and robotics.",
    weightage: "20%",
    poMapping: { "PO1": "H", "PO2": "H", "PO3": "M", "PO4": "M", "PO5": "H", "PO6": "-", "PO7": "-", "PO8": "-", "PO9": "L", "PO10": "-", "PO11": "-", "PO12": "M" }
  },
  {
    id: 3,
    code: "CO-3",
    description: "Apply appropriate discrete (Binomial, Poisson) and continuous (Normal) distribution models, standardization, and Central Limit Theorem to predict variability in high-volume production.",
    weightage: "20%",
    poMapping: { "PO1": "H", "PO2": "H", "PO3": "H", "PO4": "H", "PO5": "H", "PO6": "-", "PO7": "-", "PO8": "-", "PO9": "M", "PO10": "-", "PO11": "-", "PO12": "M" }
  },
  {
    id: 4,
    code: "CO-4",
    description: "Explain and Apply statistical inference methods, including parameter estimation, confidence intervals, and hypothesis testing (t-test, Z-test), to evaluate system performance and safety margins.",
    weightage: "20%",
    poMapping: { "PO1": "H", "PO2": "H", "PO3": "H", "PO4": "H", "PO5": "H", "PO6": "M", "PO7": "-", "PO8": "L", "PO9": "M", "PO10": "M", "PO11": "-", "PO12": "H" }
  },
  {
    id: 5,
    code: "CO-5",
    description: "Explain and Apply associations, covariance, and regression models (simple linear, multiple, and binary logistic regression) for making reliable predictions in robotic systems.",
    weightage: "20%",
    poMapping: { "PO1": "H", "PO2": "H", "PO3": "H", "PO4": "H", "PO5": "H", "PO6": "L", "PO7": "-", "PO8": "-", "PO9": "M", "PO10": "L", "PO11": "-", "PO12": "M" }
  }
];

export const UNITS: Unit[] = [
  {
    id: 1,
    name: "Unit I: Descriptive Statistics and Probability Theory",
    description: "Focuses on the foundational disciplines of summarizing large engineering datasets, identifying process trends and anomalies, and developing basic laws of probability to handle uncertainty in automated systems.",
    chapters: [
      {
        id: 1,
        number: 1,
        title: "Data Characterization in Automation Systems",
        hours: 6,
        anchorProblem: "Performance Monitoring of an Intelligent Automated Assembly Cell",
        learningObjectives: [
          "Classify qualitative vs quantitative process variables in automated pipelines",
          "Synthesize summary metrics including central tendencies (mean, median) and dispersions (variance, SD, CV, IQR)",
          "Detect data anomalies and outliers using IQR mathematical algorithms",
          "Characterize data behavior via histograms and box plots to visual-isolate machine error from sensor noise"
        ],
        keyConcepts: [
          "Continuous vs Discrete Variables in manufacturing",
          "Relative dispersion via Coefficient of Variation (CV%)",
          "Robust stats (Median, IQR, Outlier rejection range)",
          "Skewness, Kurtosis, and Measurement limits"
        ],
        practicalApplications: [
          "Tracking a 6-DOF robotic arm's positioning deviations to calibrate alignment",
          "Analyzing consistency of CNC milling spindle cutter diameter across 200 cycles",
          "Validating material thickness sensor logs to preemptively warn of feed mechanical drift"
        ],
        iconName: "BarChart3"
      },
      {
        id: 2,
        number: 2,
        title: "Probabilistic Modeling of Uncertainty",
        hours: 6,
        anchorProblem: "Risk Assessment in an Automated Production Process",
        learningObjectives: [
          "Formulate sample spaces for multivariable actuation outcomes",
          "Incorporate and solve probability bounds using Addition and Multiplication rules",
          "Structure complex dependency events using Law of Total Probability",
          "Deploy Bayes' Theorem to perform real-time probability updates based on sensor cues"
        ],
        keyConcepts: [
          "Axiomatic Probability of joint/independent hardware failures",
          "Conditional Probability in diagnostic trees",
          "Uncertainty updating based on true-positive and false-positive alarm properties",
          "Probabilistic discrete event simulation"
        ],
        practicalApplications: [
          "Evaluating automated optical inspection (AOI) reliability: determining if flagged bad solder is actually defective",
          "Predicting backup controller engagement success in redundant safety circuits during actuation pressure drops",
          "Fusing multi-sensor alarms (vibration, heat, sound) to check bearing risk"
        ],
        iconName: "ShieldAlert"
      }
    ]
  },
  {
    id: 2,
    name: "Unit II: Distribution Models, Inference, and Regression Analysis",
    description: "Examines mathematical distribution models (Binomial, Poisson, Normal), statistical inference methodologies to evaluate production conformity, and predictive machine learning relationships using regression models.",
    chapters: [
      {
        id: 3,
        number: 3,
        title: "Statistical Distribution Models",
        hours: 6,
        anchorProblem: "Variability Modeling in High-Volume Production Systems",
        learningObjectives: [
          "Represent defect counts using the discrete Binomial probability distribution",
          "Apply Poisson distribution to model rates of random process faults and sensor failures",
          "Standardize engineering tolerances using the Z-score under a continuous Normal curve",
          "Conceptualize and apply the Central Limit Theorem to relate sample means to population averages"
        ],
        keyConcepts: [
          "Probability Mass Function (PMF) and Cumulative Distribution Function (CDF)",
          "Gaussian Density Function, Mean and Standard Deviation parameters",
          "Empirical Rule (68-95-99.7% confidence ranges) for warning/alarm boundaries",
          "Sample covariance, Joint distributions, and Correlation coefficients ($r$)"
        ],
        practicalApplications: [
          "Calculating the expected number of defective solder joint pins on high-density PCBs (Binomial PMF)",
          "Modeling pneumatic weld cell compressor pressure faults during a 12-hour shift (Poisson)",
          "Determining process capability ratio by measuring shaft placement deviation (Normal standardization)"
        ],
        iconName: "Binary"
      },
      {
        id: 4,
        number: 4,
        title: "Statistical Inference for Decision-Making in Automation",
        hours: 6,
        anchorProblem: "System Performance Validation and Decision Risk",
        learningObjectives: [
          "Differentiate populations from sample distributions under constraint conditions",
          "Construct 95% Confidence Intervals for system average outputs based on limited runs",
          "Conduct formal Hypothesis Testing: formulating Null (H0) and Alternative (H1) parameters",
          "Discriminate Type I errors (False Alarm / Producer's risk) from Type II errors (Missed fault / Consumer's risk)",
          "Calculate minimal required sample sizes to guarantee desisted margins"
        ],
        keyConcepts: [
          "Standard Error of the Mean (SE)",
          "Degrees of Freedom ($df$) and critical value lookup ($t$-critical, $Z$-critical)",
          "Calculating $p$-values and establishing significance levels ($\\alpha = 0.05$)",
          "Power of a test ($1-\\beta$) and practical vs statistical significance"
        ],
        practicalApplications: [
          "Conducting a two-sided $t$-test to verify if robotic welder average cycle times exceed 12.0s",
          "Performing a one-sided $t$-test to check if automated bottle fillers exceed the labeled 500mL volume",
          "Running a two-sided $Z$-test to confirm if CNC boring diameters drift from 25.0mm specifications"
        ],
        iconName: "Scale"
      },
      {
        id: 5,
        number: 5,
        title: "Data Relationship Modeling in Automation and Robotic Systems",
        hours: 6,
        anchorProblem: "Modeling and Predicting Performance in a Robotic Production System",
        learningObjectives: [
          "Quantify the strength of linear association using Pearson's Correlation Coefficient",
          "Formulate simple linear regression equations ($Y = \\beta_0 + \\beta_1 X$) to project continuous variables",
          "Deconstruct model variances using the Analysis of Variance (ANOVA / F-test) approach",
          "Expand projections to multi-variable regimes containing several feedback sensors",
          "Incorporate logistic regression to calculate binary machine status (Active/Failed) probabilities"
        ],
        keyConcepts: [
          "Correlation vs Causation in robotic actuator feedback",
          "Ordinary Least Squares (OLS) estimation, residuals, and $R^2$ determination",
          "Assumptions of regression: homoscedasticity, linearity, norm residuals",
          "Logistic Log-Odds functions and decision boundary thresholds"
        ],
        practicalApplications: [
          "Modeling the relationship between assembly tightening torque ($X$) and joint vibration index ($Y$)",
          "Predicting robotic pick cycle speed as a function of servo temp and payload mass",
          "Using logistic regression parameters to calculate failure probabilities based on hours in service"
        ],
        iconName: "LineChart"
      }
    ]
  }
];

export const WEEKLY_TEACHING_PLAN: WeekPlan[] = [
  {
    id: 1,
    weekName: "Week 01-02",
    topics: ["Introduction to Industrial Automation Metrics", "Continuous/Discrete Variables in Technical Contexts", "Measures of Central Tendency & Dispersion: Mean, Median, Variance, SD, CV%"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 1 - Data Characterization and Spindle Position Analysis (Python & Matplotlib)",
    deliverable: "Classify variables; compute CV and identify process precision ratios."
  },
  {
    id: 2,
    weekName: "Week 03-04",
    topics: ["Data Skewness and Robust Metrics (IQR, Median absolute deviation)", "Outliers: Detection using visual and IQR mathematical fences", "Data visualization: Histograms, Box plots, cumulative frequency"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 1 - Multi-machine comparison of manufacturing consistency using boxplots.",
    deliverable: "Perform outlier audits and interpret machine repeatability patterns."
  },
  {
    id: 3,
    weekName: "Week 05-06",
    topics: ["Nature of Uncertainty in Automated Safety Pipelines", "Axiomatic Probability, Addition, and Multiplication Rules", "Law of Total Probability in Multi-stage Control loops"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 2 - Simulating safety alarm logic and total failure probabilities.",
    deliverable: "Solve state probabilities for parallel / redundant electronics systems."
  },
  {
    id: 4,
    weekName: "Week 07-08",
    topics: ["Conditional Probability & Bayes' Theorem in Diagnostic systems", "Bayesian Reasoning for robotic perception updating", "Review for In-Semester Assessment 1 (ISA1 - Theory paper)"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 2 - Implementing a Bayesian fault diagnostics model based on sensor logs.",
    deliverable: "Determine true positive rates of automated defect vision scanners."
  },
  {
    id: 5,
    weekName: "Week 09-10",
    topics: ["Discrete distributions: Binomial (product defects) & Poisson (shift random faults)", "Continuous distribution: Normal Density and standardization Z-scores", "Empirical Standard deviation bounds (68-95-99.7% rule)"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 3 - Simulating Binomial quality charts and Poisson compressor rates.",
    deliverable: "Calculate PCB pin defects and set alarm warning/danger thresholds."
  },
  {
    id: 6,
    weekName: "Week 11-12",
    topics: ["Central Limit Theorem: Principles, Sampling averages, Standard Error", "Introduction to Statistical Inference: Estimation of Parameters", "Confidence Intervals for Means (t-critical, Z-critical distributions)"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 4 - Confidence interval plots and sampling simulation across trials.",
    deliverable: "Construct 95% Confidence Intervals for robotic throughput averages."
  },
  {
    id: 7,
    weekName: "Week 13-14",
    topics: ["Hypothesis Testing: Null and Alternative setup", "Type I and Type II decision errors inside critical tests", "Testing methods: 2-sided t-test, 1-sided t-test, and 2-sided Z-test"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 4 - Running automated t-tests and Z-tests on process quality data.",
    deliverable: "Perform decisions to Reject or Fail to Reject process conformities."
  },
  {
    id: 8,
    weekName: "Week 15-16",
    topics: ["Quantification of Association: Covariance & Pearson's Correlation (r)", "Simple Linear Regression: OLS line slope, intercept, and R^2", "Assumptions testing & ANOVA approach", "Review for SEE / Lab Assessments validation"],
    hours: 6,
    isLabIncluded: true,
    labActivity: "Lab Expt 5 - Interactive regression model for torque vs vibration (Python & Scipy stats)",
    deliverable: "Build predictive maintenance loops and validate linear/logistic fits."
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 1,
    number: 1,
    title: "Data Characterization & Spindle Deviation Analysis",
    slots: 2,
    engineeringContext: "Evaluating machining deviations in 3-axis CNC milling heads producing parts under critical tolerances.",
    aim: "Utilize descriptive statistics, IQR outlier bounds, histograms, and box plots to isolate spindle drift from normal operating tolerances across 200 consecutive cycles.",
    learningObjectives: [
      "Process 200 raw data logs using Python Numpy statistical libraries",
      "Interpret process variance and CV% relative to strict +/- 0.5mm specifications",
      "Establish box plots to demonstrate alignment consistency"
    ],
    metrics: ["Mean Spindle error", "Standard Deviation", "Coefficient of Variation %", "Median", "IQR Bounds", "Outliers Count"],
    rubric: {
      "Code & Calculations (10M)": "Reproducible, modular python logic with correct mathematical parameters and zero runtime failures.",
      "Interpretation (4M)": "Precise connections between metrics (e.g., CV% vs. Machine Precision, IQR vs. tool degradation).",
      "Decision & Justification (6M)": "Mechanically justified recommendations regarding needs for spindle recalibration or feed adjustments."
    }
  },
  {
    id: 2,
    number: 2,
    title: "Probabilistic Modeling for Sensor Alarm Systems",
    slots: 2,
    engineeringContext: "Integrating multi-sensor alarms in robotic safety zones to monitor unauthorized entry or collision hazards.",
    aim: "Develop conditional probability trees, deploy Bayes' theorem analytically to track alarm reliability, and construct a 10,000 cycle Monte Carlo simulation to verify true diagnostics rates.",
    learningObjectives: [
      "Construct probability matrices representing sensor true detections vs false alarms",
      "Formulate Bayesian update algorithms to calculate P(Failure | Warning)",
      "Assess how the defect base rate impacts the overall system reliability"
    ],
    metrics: ["Total Alarm Probability P(W)", "True Defect given Event P(D|I)", "False Alarm Rate P(W|N)", "Rejection Rate of good units"],
    rubric: {
      "Mathematical Proofs (10M)": "Analytically rigorous solutions showing step-by-step conditional probability derivation.",
      "Simulation Code (4M)": "10,000 trial cycles using Numpy Boolean masks, showing simulated vs analytical convergence.",
      "Diagnostic Reflection (6M)": "Critical engineering writeup on safety failure costs, false alarm tiredness, and logical sensor placement."
    }
  },
  {
    id: 3,
    number: 3,
    title: "Statistical Distributions in PCB Manufacturing Quality Control",
    slots: 2,
    engineeringContext: "High-volume surface-mount technology (SMT) production lines placing microscopic parts on circuit boards.",
    aim: "Model defect densities using discrete (Binomial, Poisson) and continuous (Normal Gaussian) distribution models to set process alarm zones.",
    learningObjectives: [
      "Model binomial defect counts across batch lots of size N=80 SMT parts",
      "Approximate defect distributions using Poisson models when occurrences are highly rare",
      "Establish standard Z-score boundaries based on the Normal curve to track part placement deviations"
    ],
    metrics: ["Expected Defects", "Process Standard Deviation", "CDF Probability", "95th Percentile Deviation", "Z-Score Values"],
    rubric: {
      "Model Selection (8M)": "Mathematically sound justification for mapping distinct process parameters to correct distributions.",
      "Calculations & Plots (6M)": "Plotting exact Probability Mass Functions and normal density bells with clean annotations.",
      "Operational Limits (6M)": "Detailed mapping of statistical boundaries to physical machine warning/danger zones."
    }
  },
  {
    id: 4,
    number: 4,
    title: "Statistical Inference for Bottle Filling and Cutting Systems",
    slots: 2,
    engineeringContext: "Evaluating physical drift in chemical beverage bottle fillers and high-speed CNC metal sheet cutters.",
    aim: "Conduct formal statistical inference (two-sided t-test, one-sided t-test, and two-sided Z-test) across industrial datasets to determine process capability.",
    learningObjectives: [
      "Calculate Standard Error and Margins of Error from finite sample runs",
      "Formulate null/alternate hypoparameters to statistically prove process stability",
      "Distinguish producer's risk (alpha) and consumer's risk (beta) inside active hypothesis decisions"
    ],
    metrics: ["Sample Mean & SD", "Standard Error (SE)", "t-value & Z-value", "Critical lookup values", "Calculated p-value"],
    rubric: {
      "Inference Rigor (10M)": "Explicit statement of H0/H1, correct test selection based on sigma knowledge, accurate math.",
      "Decision Validity (4M)": "Correct logical checks of p-value < alpha and accurate decisions to Reject/Fail to Reject.",
      "Engineering Action Plan (6M)": "Sound physical process correction proposals (e.g. adjust flow nozzle to decrease overfilling, re-lubricate bearings)."
    }
  },
  {
    id: 5,
    number: 5,
    title: "Torque-Vibration Predictive Regression Modeling",
    slots: 3,
    engineeringContext: "Calibrating assembly line tightening torque servos to ensure joints have minimal structural stress.",
    aim: "Quantify the linear correlation between assembly tightening torque and joint mechanical vibration using Ordinary Least Squares regression and ANOVA validation.",
    learningObjectives: [
      "Compute Pearson's correlation coefficient r to classify relationship strength",
      "Develop linear regression models Y = a + bX with predictive limits",
      "Verify model residuals to check homoscedasticity and normality assumptions"
    ],
    metrics: ["Covariance Sxy", "Correlation r", "Regression Slope & Intercept", "Coefficient of Determination R^2", "ANOVA F-Statistic"],
    rubric: {
      "Regression Fit (10M)": "Flawless computation of slope and intercept, and clean predictive equation formulation.",
      "Interpretation & R^2 (4M)": "Accurate description of variability explained ($R^2$) and correlation direction/strength.",
      "Validation Report (6M)": "Detailed predictive limits table and mechanical interpretation for predictive maintenance schedules."
    }
  }
];

export const LEARNING_RESOURCES: ResourceItem[] = [
  {
    id: 1,
    title: "Applied Statistics and Probability for Engineers",
    authors: "Douglas C. Montgomery & George C. Runger",
    type: "Textbook",
    description: "The primary reference textbook mapped to syllabus. Offers deep engineering context and hundreds of real manufacturing problems.",
    badge: "Prescribed Primary"
  },
  {
    id: 2,
    title: "Probability and Statistics for Engineers & Scientists",
    authors: "Ronald E. Walpole, Raymond H. Myers, Sharon L. Myers",
    type: "Reference Book",
    description: "Invaluable reference for continuous distributions, joint probability analysis, analysis of variance (ANOVA) and hypothesis testing structures.",
    badge: "Recommended Reference"
  },
  {
    id: 3,
    title: "Python StatsModels & SciPy Stats Libraries",
    authors: "The Python Scientific Community",
    type: "Software Tool",
    description: "Industry-standard programming framework used inside the laboratory component to process raw logs, run simulations, and execute t-tests/Z-tests.",
    badge: "Lab Technology Core"
  },
  {
    id: 4,
    title: "GeoGebra Probability Toolkit",
    authors: "GeoGebra International Association",
    type: "Software Tool",
    description: "Interactive visual workspace used in lectures to instantly inspect normal distribution tails and visually model Z-score offsets.",
    badge: "Classroom Visual Aid"
  }
];

export const LAB_ASSESSMENTS_DATA = {
  assessment1: {
    title: "Lab Assessment 1: Spindle Positioning Deviation (CNC Spindle Analysis)",
    student: { name: "Srushti G Joshi", srn: "01FE24BAR014", date: "June 1, 2026" },
    context: "A high-precision CNC milling machine at KLE Tech Department of Mathematics lab is programmed to manufacture shafts with a nominal diameter of 50.00 mm. To evaluate machining consistency, 200 consecutive production cycles are recorded using a calibrated digital micrometer.",
    target: 50.00,
    parameters: [
      { name: "Mean Diameter", value: "50.0087 mm", description: "Slight positive offset from nominal specification" },
      { name: "Mean Error", value: "+0.0087 mm", description: "Positive bias (systematic displacement) of 8.7 micrometers" },
      { name: "Median", value: "50.01 mm", description: "Half of the shafts are above 50.01 mm, robust mid-point" },
      { name: "Variance", value: "0.000469 mm²", description: "Process variance, showing tight dispersion around the mean" },
      { name: "Standard Deviation", value: "0.02166 mm", description: "Average dispersion of 21.6 micrometers from the mean" },
      { name: "Coefficient of Variation", value: "0.0433 %", description: "Extremely low relative variation (CV < 1% represents highly stable control)" },
      { name: "First Quartile (Q1)", value: "49.99 mm", description: "25th percentile boundary" },
      { name: "Second Quartile (Q2 / Median)", value: "50.01 mm", description: "50th percentile boundary" },
      { name: "Third Quartile (Q3)", value: "50.03 mm", description: "75th percentile boundary" },
      { name: "Interquartile Range (IQR)", value: "0.04 mm", description: "Middle 50% of shafts lie within a 40 micrometer range" },
      { name: "Outliers Detected", value: "None", description: "Computed via IQR filter boundaries [Q1 - 1.5*IQR, Q3 + 1.5*IQR]" }
    ],
    codeSnippet: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

data = np.array([...]) # 200 recorded spindle deviations
target = 50.00

mean_val = np.mean(data)
median_val = np.median(data)
variance_val = np.var(data, ddof=1)
std_dev_val = np.std(data, ddof=1)
cv_val = (std_dev_val / mean_val) * 100
mean_error_val = mean_val - target

q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr
outliers = data[(data < lower_fence) | (data > upper_fence)]`,
    analysis: "The histogram is highly symmetric and centers tightly around the target diameter of 50 mm, proving excellent concentric consistency. Most deviations lie in a very narrow band between 49.98 mm and 50.04 mm, which signifies an incredibly stable, repeatable manufacturing sequence. The box plot exhibits a narrow interquartile range (IQR = 0.04 mm) and a complete absence of outliers, suggesting that the CNC machine's mechanical components are operating smoothly without extreme disturbances, bearing wear, or sudden chuck slippages."
  },
  
  assessment2: {
    title: "Lab Assessment 2: Robotic Gripper Reliability Studies (Bayes' Theorem)",
    student: { name: "Srushti G Joshi", srn: "01FE24BAR014", date: "June 2, 2026" },
    context: "An automated pneumatic electronic-control assembly line uses custom robotic grippers that suffer occasional failures due to elastomer wear, contamination, or pneumatic leakages. The maintenance department records the following key operating priors:",
    priors: [
      { param: "Base probability of failure in a shift", symbol: "P(F)", value: 0.04, desc: "Only 4% of production cycles experience gripper defect states" },
      { param: "Probability of normal operation", symbol: "P(N)", value: 0.96, desc: "Complement state: 96% of grippers behave nominally" },
      { param: "Probability of warning given actual failure", symbol: "P(W|F)", value: 0.92, desc: "Sensor sensitivity: system correctly flags 92% of defects" },
      { param: "False Warning probability", symbol: "P(W|N)", value: 0.05, desc: "Sensor alarm error: 5% of good runs mistakenly trigger alerts" }
    ],
    steps: [
      {
        title: "Step 1: Calculate Probability of Warning P(W)",
        formula: "P(W) = P(W|F) \\cdot P(F) + P(W|N) \\cdot P(N)",
        mathCalc: "P(W) = (0.92 \\cdot 0.04) + (0.05 \\cdot 0.96) \\\\ P(W) = 0.0368 + 0.0480 \\\\ P(W) = 0.0848 \\text{ (or } 8.48\\%\\text{)}"
      },
      {
        title: "Step 2: Calculate Posterior Failure Given Alarm P(F|W)",
        formula: "P(F|W) = \\frac{P(W|F) \\cdot P(F)}{P(W)}",
        mathCalc: "P(F|W) = \\frac{0.92 \\cdot 0.04}{0.0848} \\\\ P(F|W) = \\frac{0.0368}{0.0848} \\\\ P(F|W) = 0.4339 \\text{ (or } 43.39\\%\\text{)}"
      }
    ],
    analyticalTable: [
      { metric: "Probability of Normal Operation P(N)", value: "0.96 (or 96%)", status: "Given Prior" },
      { metric: "Probability of Warning Alarm P(W)", value: "0.0848 (or 8.48%)", status: "Total Prob Law Solution" },
      { metric: "Probability of Failure Given Warning P(F|W)", value: "0.4339 (or 43.39%)", status: "Bayesian Posteriori" },
      { metric: "Probability of False Warning P(W|N)", value: "0.0480 (or 4.80% of total runs)", status: "False Alarm Rate" }
    ],
    codeSnippet: `import numpy as np

N = 10000 # Simulated assembly runs
failures = np.random.rand(N) < 0.04 # 4% failures
warnings = np.zeros(N, dtype=bool)

for i in range(N):
    if failures[i]:
        warnings[i] = np.random.rand() < 0.92 # Sensitivity
    else:
        warnings[i] = np.random.rand() < 0.05 # False Alarm

sim_warning_prob = np.mean(warnings)
sim_fail_given_warning = np.sum(failures & warnings) / np.sum(warnings)

print(f"Simulated Warning Prob: {sim_warning_prob:.4f}")
print(f"Simulated P(Fail | Warn): {sim_fail_given_warning:.4f}")`,
    simResults: {
      warnProb: "0.0850",
      failGivenWarn: "0.4494"
    },
    analysis: "The mathematical analysis reveals a crucial industrial quality-control paradox: while our sensor safety warning controller has an incredibly high fault detection rate (P(W|F) = 92%), its actual diagnostic precision is low. Only 43.39% of highlighted sensor alarms actually represent true gripper mechanical failures. This happens because gripper faults are highly rare (only 4% base rate), which allows false alarms generated during the 96% of normal run cycles (which total 4.80% of total production) to outnumber the genuine alarms matches (3.68%). Rejecting products immediately upon warning would lead to high waste, meaning engineers must add supplementary sensors or vibration checks to confirm fault conditions."
  },

  assessment3: {
    title: "Lab Assessment 3: Distribution Modeling in Robotics and SMT Pipelines",
    student: { name: "Srushti G Joshi", srn: "01FE24BAR014", date: "June 5, 2026" },
    context: "Applying discrete probability mass functions and continuous normal bell curves to predict defects, model component cycle times, and perform regression on structural torque joint calibrations.",
    parts: [
      {
        partId: "A",
        title: "Part A: Binomial Distribution (SMT PCB Defects)",
        context: "A high-speed pick-and-place batch consists of 80 PCBs. SMT component joint default probability $p = 0.05$.",
        questions: [
          { q: "Expected number of defective boards ($E[X]$)", formula: "\\mu = np", calc: "80 \\times 0.05 = 4.0 \\text{ boards}" },
          { q: "Standard deviation ($\\sigma$)", formula: "\\sigma = \\sqrt{np(1-p)}", calc: "\\sqrt{80 \\times 0.05 \\times 0.95} = 1.949 \\text{ boards}" },
          { q: "Probability of exactly 4 defects ($P(X=4)$)", formula: "P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}", calc: "\\binom{80}{4}(0.05)^4(0.95)^{76} = 0.1956 \\text{ (or } 19.56\\%\\text{)}" },
          { q: "Probability of more than 5 defects ($P(X > 5)$)", formula: "1 - P(X \\le 5)", calc: "1 - \\sum_{k=0}^{5} P(X=k) = 0.3842 \\text{ (or } 38.42\\%\\text{)}" }
        ]
      },
      {
        partId: "B",
        title: "Part B: Poisson Distribution (Weld Cell Compressor Faults)",
        context: "A robotic SMT welding cell experiences an average of $\\lambda = 3.2$ compressor faults per shift.",
        questions: [
          { q: "Probability of zero faults ($P(X=0)$)", formula: "P(X=k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}", calc: "e^{-3.2} = 0.0408 \\text{ (or } 4.08\\%\\text{)}" },
          { q: "Probability of exactly 2 faults ($P(X=2)$)", formula: "P(X=2) = \\frac{e^{-3.2} (3.2)^2}{2!}", calc: "\\frac{0.0408 \\times 10.24}{2} = 0.2087 \\text{ (or } 20.87\\%\\text{)}" },
          { q: "Probability of more than 5 faults ($P(X > 5)$)", formula: "1 - P(X \\le 5)", calc: "1 - \\sum_{k=0}^{5} P(X=k) = 0.1054 \\text{ (or } 10.54\\%\\text{)}" }
        ]
      },
      {
        partId: "C",
        title: "Part C: Normal Distribution (Micro-component Placement)",
        context: "Robot visual placement deviation follows $X \\sim N(0.50\\text{ mm}, 0.07^2\\text{ mm})$. Tolerance spec: $0.40$ to $0.60$ mm.",
        questions: [
          { q: "Probability that placement is within specs ($P(0.40 < X < 0.60)$)", formula: "P(Z_1 < Z < Z_2)", calc: "Z_1 = \\frac{0.40-0.50}{0.07} = -1.43, \\quad Z_2 = \\frac{0.60-0.50}{0.07} = 1.43 \\\\ P(-1.43 < Z < 1.43) = 0.8472 \\text{ (or } 84.72\\%\\text{)}" },
          { q: "Probability deviation exceeds 0.65 mm ($P(X > 0.65)$)", formula: "P(Z > \\frac{0.65-0.50}{0.07})", calc: "Z = 2.14 \\rightarrow P(Z > 2.14) = 1 - 0.9838 = 0.0162 \\text{ (or } 1.62\\%\\text{)}" },
          { q: "95th Percentile placement deviation ($X_{0.95}$)", formula: "\\mu + 1.645\\sigma", calc: "0.50 + 1.645(0.07) = 0.6152 \\text{ mm}" }
        ]
      },
      {
        partId: "D",
        title: "Part D: Central Limit Theorem (Robotic Cycle Speeds)",
        context: "Robotic cycle duration averages $\\mu = 15.0$ sec, $\\sigma = 2.4$ sec. Sample size evaluated $n=36$.",
        questions: [
          { q: "Standard Error of the mean (SE)", formula: "SE = \\sigma / \\sqrt{n}", calc: "2.4 / \\sqrt{36} = 0.40 \\text{ seconds}" },
          { q: "Probability that sample average exceeds 15.5s ($P(\\bar{X} > 15.5)$)", formula: "P(Z > \\frac{15.5-15.0}{SE})", calc: "Z = \\frac{0.5}{0.4} = 1.25 \\rightarrow P(Z > 1.25) = 1 - 0.8944 = 0.1056 \\text{ (or } 10.56\\%\\text{)}" }
        ]
      },
      {
        partId: "E",
        title: "Part E: Core Variance Regression (Torque vs Spindle Vibration)",
        context: "Calibration test records fastening torque $X$ (Nm) and mechanical vibration $Y$ (mm/s) across six trials:",
        trials: [
          { trial: 1, torque: 11, vibration: 2.0 },
          { trial: 2, torque: 14, vibration: 2.6 },
          { trial: 3, torque: 13, vibration: 2.4 },
          { trial: 4, torque: 17, vibration: 3.3 },
          { trial: 5, torque: 15, vibration: 2.9 },
          { trial: 6, torque: 18, vibration: 3.6 }
        ],
        calculations: [
          { param: "Mean Torque X_bar", value: "14.67 Nm" },
          { param: "Mean Vibration Y_bar", value: "2.80 mm/s" },
          { param: "Sample Covariance S_xy", value: "1.352" },
          { param: "Correlation Coefficient r", value: "0.9979", notes: "Extremely strong positive correlation" }
        ]
      }
    ]
  },

  assessment4: {
    title: "Lab Assessment 4: Statistical Inference Hypothesis Testing Analysis",
    student: { name: "Srushti G Joshi", srn: "01FE24BAR014", date: "June 6, 2026" },
    context: "In automated robotic smart factories, inspecting every single produced component is impractical due to high tactile cycle times and transducer costs. Hence, mathematical statistical inference is deployed under strict alpha limits (level of significance = 0.05). Let's review the testing of three key manufacturing datasets of KLE Tech Department of Mathematics:",
    datasets: [
      {
        id: 1,
        stationName: "Dataset 1: Robotic Welding Station (Two-Sided t-Test)",
        claim: "Calibrate average weld cycle speed targets to exactly mu_0 = 12.0 seconds.",
        given: "Sample size n=20, sigma is unknown. Raw recorded averages: 12.3, 11.8, 12.5, 12.1, 11.9, 12.4, 12.0, 12.2, 11.7, 12.6, 12.1, 12.3, 11.8, 12.0, 12.5, 12.2, 11.9, 12.4, 12.1, 12.3",
        stats: "Sample Mean X_bar = 12.155s, SD s = 0.255s, Standard Error SE = 0.057s",
        interval: "Degrees of freedom df=19, t-critical (0.025) = 2.093. Margin of Error E = 0.119s. 95% Confidence Interval = [12.036s, 12.274s]",
        test: {
          nullHyp: "H0: mu = 12.0 seconds (Weld head operates on-target)",
          altHyp: "H1: mu != 12.0 seconds (Weld head speed has shifted)",
          statistic: "t = (12.155 - 12.0) / 0.057 = 2.72",
          pValue: "p = 0.013",
          decision: "REJECT H0",
          conclusion: "The welding cycle average speed has statistically shifted away from the 12.0 seconds standard target. The positive offset represents a real, statistically significant process slowing (p=0.013 < 0.05), which means the servo driver needs to be recalibrated, even if the absolute drift is mechanically small (~0.15s)."
        }
      },
      {
        id: 2,
        stationName: "Dataset 2: Food & Chemical Filling Valve (1-Sided t-Test)",
        claim: "Valve filling controller target mu_0 = 500 mL (prevent underfilling to avoid regulatory violations).",
        given: "Sample size n=25 bottles, population standard deviation unknown, standard error evaluated.",
        stats: "Sample Mean X_bar = 500.96 mL, SD s = 0.74 mL, Standard Error SE = 0.148 mL",
        interval: "Degrees of freedom df=24, t-critical (0.05, 1-sided) = 1.711. Margin of Error E = 0.305 mL. 95% Confidence Interval bounds upper limits.",
        test: {
          nullHyp: "H0: mu = 500.0 mL (Filler valves behave normally)",
          altHyp: "H1: mu > 500.0 mL (Filler valves are significantly overfilling)",
          statistic: "t = (500.96 - 500.0) / 0.148 = 6.49",
          pValue: "p < 0.0001",
          decision: "REJECT H0",
          conclusion: "The chemical filling station is overfilling bottles. The result is highly statistically significant (p < 0.0001). This overdispersion causes material waste, increasing production costs. Remedial action should inspect and throttle down the pneumatic valve shut-off relay."
        }
      },
      {
        id: 3,
        stationName: "Dataset 3: CNC Precision Boring Diameter (Two-Sided Z-Test)",
        claim: "Drilling spindle diameter target mu_0 = 25.00 mm. Spindle transducer has known population sigma = 0.05 mm.",
        given: "Sample size n=30, population standard deviation is known (Z-Test is deployed).",
        stats: "Sample Mean X_bar = 25.006 mm, Population SD sigma = 0.05 mm, Standard Error SE = 0.00913 mm",
        interval: "Z-critical (0.025) = 1.96. Margin of Error E = 0.0179 mm. 95% Confidence Interval = [24.988 mm, 25.024 mm]",
        test: {
          nullHyp: "H0: mu = 25.00 mm (Boring heads operate of correct target concentricity)",
          altHyp: "H1: mu != 25.00 mm (Spindle centers have drifted)",
          statistic: "Z = (25.006 - 25.00) / 0.00913 = 0.66",
          pValue: "p = 0.51",
          decision: "FAIL TO REJECT H0",
          conclusion: "There is no statistical evidence that the drilling center has shifted away from the 25.00 mm target diameter (p = 0.51 > 0.05). The tool remains perfectly centered and process stays under statistical focus control."
        }
      }
    ],
    sampleSizeDetermination: {
      goal: "Determine required sample size for future welding studies.",
      params: "Desired Margin of Error E = 0.10, Confidence level = 95% (Z = 1.96), Past SD (from welding station s = 0.255s).",
      formula: "n = \\left( \\frac{1.96 \\cdot 0.255}{0.10} \\right)^2",
      calculation: "n = (4.998)^2 = 24.98 \\rightarrow \\text{Requires } n = 25 \\text{ welding cycle tracks.}"
    }
  }
};
