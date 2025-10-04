// Core data types for ExoVision
export interface Exoplanet {
  id: string;
  name: string;
  orbitalPeriod: number;
  transitDuration: number;
  planetaryRadius: number;
  stellarRadius: number;
  stellarMass: number;
  effectiveTemperature: number;
  stellarMetallicity: number;
  stellarSurfaceGravity: number;
  classification: Classification;
  confidence: number;
  discoveryYear: number;
  discoveryMethod: string;
  rightAscension: number;
  declination: number;
  distance: number;
}

export type Classification = 'Confirmed' | 'Candidate' | 'False Positive';

export interface ModelStats {
  f1Score: number;
  precision: number;
  recall: number;
  accuracy: number;
  totalPredictions: number;
  modelVersion: string;
  lastTrained: string;
  trainingDataSize: number;
}

export interface Prediction {
  id: string;
  input: Partial<Exoplanet>;
  classification: Classification;
  confidence: number;
  timestamp: string;
  modelVersion: string;
}

export interface TrainingConfig {
  modelType: 'random_forest' | 'xgboost' | 'neural_network';
  hyperparameters: {
    learningRate?: number;
    nEstimators?: number;
    maxDepth?: number;
    batchSize?: number;
    epochs?: number;
  };
  validationSplit: number;
  testSplit: number;
}

export interface TrainingProgress {
  epoch: number;
  totalEpochs: number;
  accuracy: number;
  loss: number;
  validationAccuracy: number;
  validationLoss: number;
  eta: string;
}

export interface Dataset {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  format: 'csv' | 'json' | 'fits';
  status: 'processing' | 'ready' | 'error';
  preview: Exoplanet[];
}

export interface PerformanceMetrics {
  timestamp: string;
  f1Score: number;
  precision: number;
  recall: number;
  accuracy: number;
  modelVersion: string;
}

export interface ConfusionMatrix {
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  labels: Classification[];
}

export interface LightCurve {
  time: number[];
  flux: number[];
  error: number[];
  period: number;
  depth: number;
  duration: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface UploadResponse {
  datasetId: string;
  filename: string;
  size: number;
  status: 'uploaded' | 'processing' | 'ready' | 'error';
  message?: string;
}

export interface BatchClassificationResult {
  results: Prediction[];
  totalProcessed: number;
  successCount: number;
  errorCount: number;
  processingTime: number;
}
