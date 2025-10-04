import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  Exoplanet, 
  ModelStats, 
  Prediction, 
  TrainingConfig, 
  Dataset, 
  PerformanceMetrics,
  ConfusionMatrix,
  UploadResponse,
  BatchClassificationResult,
  ApiResponse
} from '../../types';

export const exoplanetApi = createApi({
  reducerPath: 'exoplanetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['ModelStats', 'Predictions', 'Datasets', 'Performance'],
  endpoints: (builder) => ({
    // Model Statistics
    getModelStats: builder.query<ModelStats, void>({
      query: () => 'stats',
      providesTags: ['ModelStats'],
    }),
    
    // Predictions
    classifySingle: builder.mutation<Prediction, Partial<Exoplanet>>({
      query: (data) => ({
        url: 'predict',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Predictions'],
    }),
    
    classifyBatch: builder.mutation<BatchClassificationResult, FormData>({
      query: (formData) => ({
        url: 'predict/batch',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Predictions'],
    }),
    
    // Data Management
    uploadDataset: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Datasets'],
    }),
    
    getDatasets: builder.query<Dataset[], void>({
      query: () => 'data',
      providesTags: ['Datasets'],
    }),
    
    getDatasetPreview: builder.query<Exoplanet[], string>({
      query: (id) => `data/${id}/preview`,
    }),
    
    // Model Training
    trainModel: builder.mutation<void, TrainingConfig>({
      query: (config) => ({
        url: 'train',
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['ModelStats', 'Performance'],
    }),
    
    getTrainingProgress: builder.query<number, void>({
      query: () => 'train/progress',
    }),
    
    // Analytics
    getPerformanceHistory: builder.query<PerformanceMetrics[], void>({
      query: () => 'analytics/performance',
      providesTags: ['Performance'],
    }),
    
    getConfusionMatrix: builder.query<ConfusionMatrix, void>({
      query: () => 'analytics/confusion-matrix',
    }),
    
    // Sample Data
    getSampleData: builder.query<Exoplanet[], void>({
      query: () => 'data/sample',
    }),
  }),
});

export const {
  useGetModelStatsQuery,
  useClassifySingleMutation,
  useClassifyBatchMutation,
  useUploadDatasetMutation,
  useGetDatasetsQuery,
  useGetDatasetPreviewQuery,
  useTrainModelMutation,
  useGetTrainingProgressQuery,
  useGetPerformanceHistoryQuery,
  useGetConfusionMatrixQuery,
  useGetSampleDataQuery,
} = exoplanetApi;
