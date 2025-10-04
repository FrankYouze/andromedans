import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModelStats, TrainingConfig, TrainingProgress } from '../../types';

interface ModelState {
  stats: ModelStats | null;
  trainingConfig: TrainingConfig;
  trainingProgress: TrainingProgress | null;
  isTraining: boolean;
  selectedModel: string;
  hyperparameters: {
    learningRate: number;
    nEstimators: number;
    maxDepth: number;
    batchSize: number;
    epochs: number;
  };
}

const initialState: ModelState = {
  stats: null,
  trainingConfig: {
    modelType: 'random_forest',
    hyperparameters: {
      learningRate: 0.01,
      nEstimators: 100,
      maxDepth: 10,
      batchSize: 32,
      epochs: 50,
    },
    validationSplit: 0.2,
    testSplit: 0.1,
  },
  trainingProgress: null,
  isTraining: false,
  selectedModel: 'random_forest',
  hyperparameters: {
    learningRate: 0.01,
    nEstimators: 100,
    maxDepth: 10,
    batchSize: 32,
    epochs: 50,
  },
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setModelStats: (state, action: PayloadAction<ModelStats>) => {
      state.stats = action.payload;
    },
    setTrainingConfig: (state, action: PayloadAction<Partial<TrainingConfig>>) => {
      state.trainingConfig = { ...state.trainingConfig, ...action.payload };
    },
    setTrainingProgress: (state, action: PayloadAction<TrainingProgress | null>) => {
      state.trainingProgress = action.payload;
    },
    setIsTraining: (state, action: PayloadAction<boolean>) => {
      state.isTraining = action.payload;
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
    updateHyperparameter: (state, action: PayloadAction<{ key: keyof ModelState['hyperparameters']; value: number }>) => {
      state.hyperparameters[action.payload.key] = action.payload.value;
    },
    resetTrainingConfig: (state) => {
      state.trainingConfig = initialState.trainingConfig;
      state.hyperparameters = initialState.hyperparameters;
    },
  },
});

export const {
  setModelStats,
  setTrainingConfig,
  setTrainingProgress,
  setIsTraining,
  setSelectedModel,
  updateHyperparameter,
  resetTrainingConfig,
} = modelSlice.actions;

export default modelSlice.reducer;
