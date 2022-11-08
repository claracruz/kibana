/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { I18nStart } from '@kbn/core-i18n-browser';
import { ApplicationStart, ScopedHistory } from '@kbn/core-application-browser';
import { BreadcrumbService } from '@kbn/index-lifecycle-management-plugin/public/application/services/breadcrumbs';
import { ILicense } from '@kbn/licensing-plugin/common/types';
import { Observable } from 'rxjs';
import { CoreTheme } from '@kbn/core-theme-browser';
import { DocLinksStart } from '@kbn/core-doc-links-browser';
import { ExecutionContextStart } from '@kbn/core-execution-context-browser';
import { CloudSetup } from '@kbn/cloud-plugin/public';
import { UnmountCallback } from '@kbn/core-mount-utils-browser';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  KibanaContextProvider,
  KibanaThemeProvider,
  RedirectAppLinks,
} from '@kbn/kibana-react-plugin/public';
import { APP_WRAPPER_CLASS } from '@kbn/core-application-common';
import { App } from '@kbn/index-lifecycle-management-plugin/public/application/app';
import React from 'react';

export const renderApp = (
  element: Element,
  I18nContext: I18nStart['Context'],
  history: ScopedHistory,
  application: ApplicationStart,
  breadcrumbService: BreadcrumbService,
  license: ILicense,
  theme$: Observable<CoreTheme>,
  docLinks: DocLinksStart,
  executionContext: ExecutionContextStart,
  cloud?: CloudSetup
): UnmountCallback => {
  const { getUrlForApp } = application;
  render(
    <RedirectAppLinks application={application} className={APP_WRAPPER_CLASS}>
      <I18nContext>
        <KibanaThemeProvider theme$={theme$}>
          <KibanaContextProvider
            services={{
              cloud,
              breadcrumbService,
              license,
              getUrlForApp,
              docLinks,
              executionContext,
            }}
          >
            <App history={history} />
          </KibanaContextProvider>
        </KibanaThemeProvider>
      </I18nContext>
    </RedirectAppLinks>,
    element
  );

  return () => unmountComponentAtNode(element);
};
