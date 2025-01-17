/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  type DataFrameAnalyticsConfig,
  FEATURE_INFLUENCE,
  OUTLIER_SCORE,
} from '@kbn/ml-data-frame-analytics-utils';

import { DataGridItem } from '../../../../../components/data_grid';

export const getOutlierScoreFieldName = (jobConfig: DataFrameAnalyticsConfig) =>
  `${jobConfig.dest.results_field}.${OUTLIER_SCORE}`;

export const getFeatureCount = (resultsField: string, tableItems: DataGridItem[] = []) => {
  return tableItems.reduce((featureCount, fullItem) => {
    if (Array.isArray(fullItem[`${resultsField}.${FEATURE_INFLUENCE}`])) {
      return Math.max(featureCount, fullItem[`${resultsField}.${FEATURE_INFLUENCE}`].length);
    }
    return featureCount;
  }, 0);
};
