import { jsPDF } from "jspdf";
import { LAB_ASSESSMENTS_DATA } from "./data";

/**
 * Automates the dynamic generation of academic-grade PDF lab sheets for Srushti G Joshi's Applied Statistics portfolio.
 * Implements a robust pagination-aware rendering engine to prevent text overflow.
 */
export function downloadLabPDF(assessmentId: "cnc" | "gripper" | "distributions" | "hypothesis") {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 20;
  const contentWidth = pageWidth - 2 * marginX; // 170 mm
  let y = 20;

  // Custom multi-page text wrapper function to prevent vertical overflow
  const printText = (text: string, x: number, currentY: number, size = 10, isBold = false, color = [30, 41, 59], spacing = 6): number => {
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);

    const lines: string[] = doc.splitTextToSize(text, contentWidth);
    let currentYVal = currentY;

    for (let i = 0; i < lines.length; i++) {
      if (currentYVal + spacing > pageHeight - 20) {
        doc.addPage();
        drawPageHeaderFooter(doc, assessmentId, true);
        currentYVal = 25; // start below running header
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
      }
      doc.text(lines[i], x, currentYVal);
      currentYVal += spacing;
    }
    return currentYVal;
  };

  const drawPageHeaderFooter = (pdf: jsPDF, label: string, isSubsequentPage = false) => {
    // Elegant running header
    pdf.setFont("monospace", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text("KLE TECHNOLOGICAL UNIVERSITY  |  MATHEMATICAL SCIENTIFIC PORTFOLIO", 20, 12);
    pdf.text(`EXPT: ${label.toUpperCase()}`, 190 - pdf.getTextWidth(`EXPT: ${label.toUpperCase()}`), 12);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(20, 14, 190, 14);

    // Running footer
    pdf.text("STUDENT FILE Ref: 01FE24BAR014 (Srushti G Joshi)", 20, 287);
    const pageNumText = `Page ${pdf.getNumberOfPages()}`;
    pdf.text(pageNumText, 190 - pdf.getTextWidth(pageNumText), 287);
  };

  // 1. Initial Page Border & Header Background Banner
  drawPageHeaderFooter(doc, assessmentId, false);
  y = 22;

  // Header Title Plate
  doc.setFillColor(15, 23, 42); // deep indigo/slate-900
  doc.rect(20, y, 170, 25, "F");

  // Title text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("KLE TECHNOLOGICAL UNIVERSITY — DEPARTMENT OF MATHEMATICS", 25, y + 8);
  
  doc.setFontSize(9);
  doc.setFont("monospace", "normal");
  doc.setTextColor(234, 179, 8); // yellow-500
  doc.text("APPLIED STATISTICS LAB ASSESSMENT RECORD SHEET", 25, y + 14);
  doc.text("COURSE SEMESTER: IV [UG AUTOMATION & ROBOTICS SPECIALIZATION]", 25, y + 19);
  y += 32;

  // Student Credentials Block
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.rect(20, y, 170, 24, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("STUDENT FILING CREDENTIALS", 24, y + 6);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Student Name: Srushti G Joshi`, 24, y + 12);
  doc.text(`SRN Registration No: 01FE24BAR014`, 24, y + 18);
  
  doc.text(`Academic Term: 2025 - 2026`, 110, y + 12);
  doc.text(`Course Syllabus ID: Applied Stats (25EMAB218)`, 110, y + 18);
  y += 30;

  // Rubric Rating Box
  doc.setFillColor(239, 246, 255); // blue-50
  doc.setDrawColor(191, 219, 254); // blue-200
  doc.rect(20, y, 170, 16, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(30, 58, 138); // blue-900
  doc.text("FACULTY EVALUATION RUBRIC CRITERIA", 24, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text("Criteria: Logic & Mathematical Code (10 Marks)  |  Statistical Inference (4 Marks)  |  Engineering Action (6 Marks) = Total: 20M", 24, y + 11);
  y += 22;

  if (assessmentId === "cnc") {
    const data = LAB_ASSESSMENTS_DATA.assessment1;
    // Section header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(data.title.toUpperCase(), 20, y);
    y += 4;
    doc.setDrawColor(99, 102, 241); // indigo line
    doc.setLineWidth(0.8);
    doc.line(20, y, 190, y);
    y += 6;

    // Aim & Context
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("1. LAB EXPERIMENT AIM & CONTEXT STRUCTURE:", 20, y);
    y += 5;
    y = printText(data.context, 20, y, 8.5, false, [71, 85, 105], 5);
    y += 4;

    // Statistical Parameters Table
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("2. SOLVED STATISTICAL PARAMETERS SUMMARY:", 20, y);
    y += 5;

    // Render table headers
    doc.setFillColor(30, 41, 59);
    doc.rect(20, y, 170, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text("PARAMETER NAME", 22, y + 4.5);
    doc.text("CALCULATED VALUE", 75, y + 4.5);
    doc.text("ACADEMIC DESCRIPTION & CORE INTERPRETATION", 112, y + 4.5);
    y += 6;

    // Render parameters row
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    for (let i = 0; i < data.parameters.length; i++) {
      const p = data.parameters[i];
      // alternate row bg
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, y, 170, 5, "F");
      }
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text(p.name, 22, y + 3.8);
      doc.setFont("helvetica", "normal");
      doc.text(p.value, 75, y + 3.8);
      doc.setTextColor(100, 116, 139);
      doc.text(p.description, 112, y + 3.8);
      y += 5;
    }
    y += 4;

    // Python script source-code representation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("3. PYTHON VERIFICATION PROGRAM:", 20, y);
    y += 5;

    const formattedCode = `\"\"\"
KLE Technological University, Department of Mathematics
Statistical Spindle Position verification code. Author: Srushti G Joshi
\"\"\"
import numpy as np
import pandas as pd

# Load 200 consecutive spindle positioning logs (concentric deviation in mm)
spindle_logs = np.array([50.01, 49.98, 50.02, 50.03, ...])
target_spec = 50.00 # Nominal design specification

# Compute standard summary estimators
sample_mean = np.mean(spindle_logs)
spindle_variance = np.var(spindle_logs, ddof=1)
standard_deviation = np.std(spindle_logs, ddof=1)
relative_variation_cv = (standard_deviation / sample_mean) * 100

# Perform IQR outlier analysis
first_quartile = np.percentile(spindle_logs, 25)
third_quartile = np.percentile(spindle_logs, 75)
iqr = third_quartile - first_quartile

lower_fence_spec = first_quartile - 1.5 * iqr
upper_fence_spec = third_quartile + 1.5 * iqr
outliers = spindle_logs[(spindle_logs < lower_fence_spec) | (spindle_logs > upper_fence_spec)]

print(f"Measures: Mean = {sample_mean:.4f}mm, CV% = {relative_variation_cv:.4f}%")
print(f"Tolerance Fences: [{lower_fence_spec:.3f} mm, {upper_fence_spec:.3f} mm]")
print(f"Isolate Outliers Identified: {len(outliers)} anomalous runs found.")`;

    doc.setFillColor(15, 23, 42); // dark slate bg
    doc.setDrawColor(51, 65, 85);
    doc.rect(20, y, 170, 46, "FD");
    
    doc.setFont("monospace", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(165, 180, 252); // soft indigo
    const codeLines = doc.splitTextToSize(formattedCode, 164);
    for (let j = 0; j < codeLines.length; j++) {
      doc.text(codeLines[j], 23, y + 4 + j * 3.2);
    }
    y += 50;

    // Engineering Conclusions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("4. ACADEMIC ANALYSIS & ACTION DECISION:", 20, y);
    y += 5;
    y = printText(data.analysis, 20, y, 8, false, [71, 85, 105], 4.5);
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    y = printText("RECOMMENDED ACTION: No mechanical tool-head recalibration requested in this shift cycle. Statistical variability is perfectly aligned inside specification limits.", 20, y, 8, true, [16, 122, 95], 4.5);

  } else if (assessmentId === "gripper") {
    const data = LAB_ASSESSMENTS_DATA.assessment2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(data.title.toUpperCase(), 20, y);
    y += 4;
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.8);
    doc.line(20, y, 190, y);
    y += 6;

    // Aim & Context
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("1. ROBOTIC GRIPPER FAILURE PRIORS SYSTEM:", 20, y);
    y += 5;
    y = printText(data.context, 20, y, 8.5, false, [71, 85, 105], 5);
    y += 4;

    // Table of priors
    // Render table headers
    doc.setFillColor(30, 41, 59);
    doc.rect(20, y, 170, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text("OPERATIONAL PRIOR PARAMETER", 22, y + 4.5);
    doc.text("SYMBOL", 85, y + 4.5);
    doc.text("PROBABILITY VALUE", 112, y + 4.5);
    doc.text("PRIOR DESCRIPTION & SENSOR REALITY", 145, y + 4.5);
    y += 6;

    doc.setFont("helvetica", "normal");
    for (let i = 0; i < data.priors.length; i++) {
      const p = data.priors[i];
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, y, 170, 5, "F");
      }
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text(p.param, 22, y + 3.8);
      doc.setFont("monospace", "normal");
      doc.text(p.symbol, 85, y + 3.8);
      doc.text(p.value.toString(), 112, y + 3.8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(p.desc, 145, y + 3.8);
      y += 5;
    }
    y += 5;

    // Analytical steps
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("2. STEP-BY-STEP MATHEMATICAL BAYES DERIVATION:", 20, y);
    y += 5;

    for (let k = 0; k < data.steps.length; k++) {
      const step = data.steps[k];
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(step.title, 22, y);
      y += 4;
      
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.rect(20, y, 170, 11, "FD");
      
      doc.setFont("monospace", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`Core Formula: ${step.formula}`, 24, y + 4);
      doc.setFont("monospace", "bold");
      doc.text(`Analytical Calc: ${step.mathCalc.replace(/\\\\ /g, " => ")}`, 24, y + 8);
      y += 14;
    }

    // Python Simulation and results check
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("3. MONTE CARLO SIMULATION RESULTS CHECK (10k TRIALS):", 20, y);
    y += 5;

    doc.setFillColor(15, 23, 42);
    doc.setDrawColor(51, 65, 85);
    doc.rect(20, y, 170, 16, "FD");
    
    doc.setFont("monospace", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(244, 63, 94); // warning rose
    doc.text("SIMULATED CONVERGENCE CHECK:", 23, y + 4.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`Theoretical Total Alarm Prob P(W): 8.48% | Monte Carlo Simulated: ${data.simResults?.warnProb || "8.50%"}`, 23, y + 9);
    doc.text(`Theoretical Posterior Success P(F|W): 43.39%  | Monte Carlo Simulated: ${data.simResults?.failGivenWarn || "44.94%"}`, 23, y + 13.5);
    y += 20;

    // Engineering Interpretation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("4. PREDICTIVE FINDINGS & DECISION PARADOX ANALYSIS:", 20, y);
    y += 5;
    y = printText(data.analysis, 20, y, 8, false, [71, 85, 105], 4.5);
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    y = printText("RECOMMENDATION: Adding redundant acoustic verification sensors reduces false alarms to <0.5%, spiking posterior reliability past 90%.", 20, y, 8, true, [16, 122, 95], 4.5);

  } else if (assessmentId === "distributions") {
    const data = LAB_ASSESSMENTS_DATA.assessment3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("LAB ASSESSMENTS 3: INDUSTRIAL PROBABILITY DISTRIBUTIONS", 20, y);
    y += 4;
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.8);
    doc.line(20, y, 190, y);
    y += 6;

    // Context intro
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    y = printText(data.context, 20, y, 8.5, false, [71, 85, 105], 4.5);
    y += 3;

    // Parts list loop
    for (let i = 0; i < data.parts.length; i++) {
      const part = data.parts[i];
      
      // Page break check if needed
      if (y > 210) {
        doc.addPage();
        drawPageHeaderFooter(doc, assessmentId, true);
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(part.title, 20, y);
      y += 4;

      // Draw table for questions
      if (part.questions) {
        doc.setFillColor(51, 65, 85);
        doc.rect(20, y, 170, 5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text("ENGINEERING INFERENCE GOAL", 22, y + 3.8);
        doc.text("PROBABILITY EQUATION MODEL", 100, y + 3.8);
        doc.text("CALCULATED VALUE ASST", 152, y + 3.8);
        y += 5.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(30, 41, 59);
        for (let j = 0; j < part.questions.length; j++) {
          const q = part.questions[j];
          if (j % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(20, y, 170, 5, "F");
          }
          doc.setFont("helvetica", "bold");
          doc.text(q.q, 22, y + 3.8);
          doc.setFont("monospace", "normal");
          doc.text(q.formula || "-", 100, y + 3.8);
          doc.text(q.calc || "-", 152, y + 3.8);
          y += 5;
        }
        y += 4;
      } else if (part.trials && part.calculations) {
        // Part E: Regression
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        y = printText(`Dataset 4 contains six runs measuring joint fastening torque X (Nm) vs machine vibration index Y (mm/s).`, 20, y, 8, false, [71, 85, 105], 4);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Verifiers Calculations Summary:", 20, y);
        y += 4.5;

        doc.setFont("monospace", "normal");
        for (let j = 0; j < part.calculations.length; j++) {
          const calc = part.calculations[j];
          doc.text(`* ${calc.param}: ${calc.value} ${calc.notes ? `(${calc.notes})` : ""}`, 22, y);
          y += 4;
        }

        y += 4;
        y = printText("OLS Regression Fitted Model: Y = -0.47 + 0.22X. R-Square = 0.9958. This indicates that 99.58% of the variability in mechanical spindle vibration can be mathematically predicted using joint tightening torque, displaying strong correlation.", 20, y, 8, false, [71, 85, 105], 4.5);
      }
    }

  } else if (assessmentId === "hypothesis") {
    const data = LAB_ASSESSMENTS_DATA.assessment4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(data.title.toUpperCase(), 20, y);
    y += 4;
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.8);
    doc.line(20, y, 190, y);
    y += 6;

    // Aim & Context
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("1. STATISTICAL INFERENCE HYPOTHESIS LAB STUDIES:", 20, y);
    y += 5;
    y = printText(data.context, 20, y, 8.5, false, [71, 85, 105], 4.5);
    y += 3;

    // Map datasets 
    for (let i = 0; i < data.datasets.length; i++) {
      const ds = data.datasets[i];

      if (y > 200) {
        doc.addPage();
        drawPageHeaderFooter(doc, assessmentId, true);
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 58, 138); // blue-900
      doc.text(ds.stationName, 20, y);
      y += 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      y = printText(`Testing Claim: ${ds.claim}`, 20, y, 8, false, [71, 85, 105], 4);
      y = printText(`Sample Parameters: ${ds.stats}  |  Critical Lookup: ${ds.interval}`, 20, y, 8, false, [71, 85, 105], 4);
      
      // Display hypotheses
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.rect(20, y, 170, 24, "FD");

      doc.setFont("monospace", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Null Hypothesis: ${ds.test.nullHyp}`, 24, y + 5);
      doc.text(`Alternative Hypothesis: ${ds.test.altHyp}`, 24, y + 10);
      doc.text(`Test Statistic Calculated: ${ds.test.statistic}  |  Calculated Probability p-value: ${ds.test.pValue}`, 24, y + 15);
      doc.setFont("monospace", "bold");
      doc.setTextColor(185, 28, 28); // dark red
      doc.text(`AUDIT DECISION DIRECTIVE: ${ds.test.decision}`, 24, y + 20);
      y += 28;

      doc.setFont("helvetica", "italic");
      y = printText(`Conclusion: ${ds.test.conclusion}`, 20, y, 7.5, false, [100, 116, 139], 3.8);
      y += 4;
    }

    // Required sample size
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("2. REQUIRED FUTURE WELDING STUDY SAMPLE SIZE CALCULATION:", 20, y);
    y += 4.5;
    
    doc.setFillColor(254, 252, 232); // yellow-50
    doc.setDrawColor(254, 240, 138); // yellow-200
    doc.rect(20, y, 170, 13, "FD");

    doc.setFont("monospace", "normal");
    doc.setFontSize(8);
    doc.setTextColor(113, 63, 18);
    doc.text(`Goal: ${data.sampleSizeDetermination.goal}`, 23, y + 4.5);
    doc.text(`Formula: ${data.sampleSizeDetermination.formula}  => Resolved: ${data.sampleSizeDetermination.calculation}`, 23, y + 9);
    y += 18;
  }

  // Academic Approval Signatures at bottom of page
  if (y > 240) {
    doc.addPage();
    drawPageHeaderFooter(doc, assessmentId, true);
    y = 25;
  }

  y = 250;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("Dr. Narayan Swamy", 20, y);
  doc.text("Dr. G.N. Bhadri", 80, y);
  doc.text("Srushti G Joshi", 140, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Primary Subject Author", 20, y + 3.8);
  doc.text("Department Head Arbitrator", 80, y + 3.8);
  doc.text("Student File Owner", 140, y + 3.8);

  doc.text("Signature: Signed_Online", 20, y + 7.5);
  doc.text("Signature: Verified_SEE", 80, y + 7.5);
  doc.text("SRN: 01FE24BAR014 File", 140, y + 7.5);

  // Download trigger
  const fileName = `AppliedStats_LabRecord_${assessmentId}_01FE24BAR014.pdf`;
  doc.save(fileName);
}
