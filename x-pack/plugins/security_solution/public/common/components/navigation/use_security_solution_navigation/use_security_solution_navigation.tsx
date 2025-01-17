/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import { i18n } from '@kbn/i18n';
import type { KibanaPageTemplateProps } from '@kbn/shared-ux-page-kibana-template';
import { useKibana } from '../../../lib/kibana';
import { useBreadcrumbs } from '../breadcrumbs';
import { SecuritySideNav } from '../security_side_nav';

const translatedNavTitle = i18n.translate('xpack.securitySolution.navigation.mainLabel', {
  defaultMessage: 'Security',
});

export const useSecuritySolutionNavigation = (): KibanaPageTemplateProps['solutionNav'] => {
  const { isSidebarEnabled$ } = useKibana().services;
  const isSidebarEnabled = useObservable(isSidebarEnabled$);

  useBreadcrumbs({
    isEnabled: true, // TODO: use isSidebarEnabled$ when serverless breadcrumb is ready
  });

  if (!isSidebarEnabled) {
    return undefined;
  }

  return {
    canBeCollapsed: true,
    name: translatedNavTitle,
    icon: 'logoSecurity',
    children: <SecuritySideNav />,
    closeFlyoutButtonPosition: 'inside',
  };
};
