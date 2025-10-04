import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Exoplanet, Dataset, Prediction } from '../../types';

interface DataState {
  currentDataset: Dataset | null;
  exoplanets: Exoplanet[];
  predictions: Prediction[];
  selectedExoplanet: Exoplanet | null;
  filters: {
    classification: string[];
    confidenceMin: number;
    confidenceMax: number;
    discoveryYearMin: number;
    discoveryYearMax: number;
  };
  sortBy: {
    field: keyof Exoplanet;
    direction: 'asc' | 'desc';
  };
  searchQuery: string;
}

const initialState: DataState = {
  currentDataset: null,
  exoplanets: [],
  predictions: [],
  selectedExoplanet: null,
  filters: {
    classification: [],
    confidenceMin: 0,
    confidenceMax: 1,
    discoveryYearMin: 1990,
    discoveryYearMax: new Date().getFullYear(),
  },
  sortBy: {
    field: 'name',
    direction: 'asc',
  },
  searchQuery: '',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentDataset: (state, action: PayloadAction<Dataset | null>) => {
      state.currentDataset = action.payload;
    },
    setExoplanets: (state, action: PayloadAction<Exoplanet[]>) => {
      state.exoplanets = action.payload;
    },
    addExoplanet: (state, action: PayloadAction<Exoplanet>) => {
      state.exoplanets.push(action.payload);
    },
    updateExoplanet: (state, action: PayloadAction<{ id: string; updates: Partial<Exoplanet> }>) => {
      const index = state.exoplanets.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.exoplanets[index] = { ...state.exoplanets[index], ...action.payload.updates };
      }
    },
    removeExoplanet: (state, action: PayloadAction<string>) => {
      state.exoplanets = state.exoplanets.filter(e => e.id !== action.payload);
    },
    setPredictions: (state, action: PayloadAction<Prediction[]>) => {
      state.predictions = action.payload;
    },
    addPrediction: (state, action: PayloadAction<Prediction>) => {
      state.predictions.unshift(action.payload);
    },
    setSelectedExoplanet: (state, action: PayloadAction<Exoplanet | null>) => {
      state.selectedExoplanet = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<DataState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action: PayloadAction<DataState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetData: (state) => {
      state.exoplanets = [];
      state.predictions = [];
      state.selectedExoplanet = null;
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
      state.searchQuery = '';
    },
  },
});

export const {
  setCurrentDataset,
  setExoplanets,
  addExoplanet,
  updateExoplanet,
  removeExoplanet,
  setPredictions,
  addPrediction,
  setSelectedExoplanet,
  setFilters,
  setSortBy,
  setSearchQuery,
  clearFilters,
  resetData,
} = dataSlice.actions;

export default dataSlice.reducer;
