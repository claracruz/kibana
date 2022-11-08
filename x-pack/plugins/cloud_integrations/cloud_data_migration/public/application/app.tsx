/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ScopedHistory } from '@kbn/core/public';

import { useKibana, useExecutionContext } from '@kbn/kibana-react-plugin/public';
import { CloudMigration } from '@kbn/home-plugin/public/application/components/cloud_migration';
// import { PLUGIN_ID } from '@kbn/ml-plugin/common/constants/app';

export const App = ({ history }: { history: ScopedHistory }) => {
  const {
    services: { executionContext },
  } = useKibana();

  useExecutionContext(executionContext!, {
    name: 'cloud_data_migration',
    type: 'application',
    page: 'cloudDataMigrationewtreyte',
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={[`/cloud_migration`]} component={CloudMigration} />
      </Switch>
    </Router>
  );
};
