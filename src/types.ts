/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chapter {
  id: number;
  number: number;
  title: string;
  hours: number;
  anchorProblem: string;
  learningObjectives: string[];
  keyConcepts: string[];
  practicalApplications: string[];
  iconName: string;
}

export interface Unit {
  id: number;
  name: string;
  description: string;
  chapters: Chapter[];
}

export interface CourseOutcome {
  id: number;
  code: string;
  description: string;
  weightage: string;
  poMapping: { [poKey: string]: 'H' | 'M' | 'L' | '-' };
}

export interface LabExperiment {
  id: number;
  number: number;
  title: string;
  slots: number;
  engineeringContext: string;
  aim: string;
  learningObjectives: string[];
  metrics: string[];
  rubric: { [item: string]: string };
}

export interface WeekPlan {
  id: number;
  weekName: string;
  topics: string[];
  hours: number;
  isLabIncluded: boolean;
  labActivity?: string;
  deliverable: string;
}

export interface ResourceItem {
  id: number;
  title: string;
  authors: string;
  type: 'Textbook' | 'Reference Book' | 'Software Tool' | 'Online Course';
  description: string;
  badge?: string;
}
