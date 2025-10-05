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
    baseUrl: 'https://5314b2b30c23.ngrok-free.app/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),
  tagTypes: ['ModelStats', 'Predictions', 'Datasets', 'Performance'],
  endpoints: (builder) => ({
    // Root endpoint
    getRoot: builder.query<any, void>({
      query: () => '',
    }),
    
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
    
    // Data Management
    uploadDataset: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Datasets'],
    }),
    
    getSampleData: builder.query<Exoplanet[], void>({
      query: () => 'data',
      providesTags: ['Datasets'],
    }),
    
    // Model Training
    retrainModel: builder.mutation<void, TrainingConfig>({
      query: (config) => ({
        url: 'retrain',
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['ModelStats', 'Performance'],
    }),
    
    // Configuration
    updateConfig: builder.mutation<void, any>({
      query: (config) => ({
        url: 'config',
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['ModelStats'],
    }),
  }),
});

export const {
  useGetRootQuery,
  useGetModelStatsQuery,
  useClassifySingleMutation,
  useUploadDatasetMutation,
  useGetSampleDataQuery,
  useRetrainModelMutation,
  useUpdateConfigMutation,
} = exoplanetApi;
