/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FC, MouseEvent, useEffect } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiListGroup,
  EuiListGroupItem,
  EuiPageTemplate,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  useEuiTheme,
} from '@elastic/eui';
import { KibanaPageTemplate } from '@kbn/shared-ux-page-kibana-template';
import { i18n } from '@kbn/i18n';
import { METRIC_TYPE } from '@kbn/analytics';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from '@kbn/i18n-react';
import { css } from '@emotion/react';
import { getServices } from '../../kibana_services';

const homeBreadcrumb = i18n.translate('home.breadcrumbs.homeTitle', { defaultMessage: 'Home' });
const cloudMigrationBreadcrumb = i18n.translate('home.breadcrumbs.cloudMigrationTitle', {
  defaultMessage: 'cloud migration',
});
const listItemProps = {
  iconType: 'checkInCircleFilled',
  iconProps: { color: 'success' },
  wrapText: true,
};

export const CloudMigration: FC = () => {
  const { addBasePath, chrome, cloud, trackUiMetric } = getServices();
  const isDarkMode = getServices().uiSettings?.get('theme:darkMode') || false;
  const history = useHistory();
  const { euiTheme } = useEuiTheme();
  const paddingCss = css`
    padding: calc(${euiTheme.size.base} * 6);
  `;

  useEffect(() => {
    chrome.setBreadcrumbs([
      {
        // using # prevents a reloading of the whole app when clicking the breadcrumb
        href: '#',
        text: homeBreadcrumb,
        onClick: () => {
          trackUiMetric(METRIC_TYPE.CLICK, 'cloud_migratio__home_breadcrumb');
        },
      },
      {
        text: cloudMigrationBreadcrumb,
      },
    ]);
  }, [chrome, trackUiMetric]);

  useEffect(() => {
    if (cloud?.isCloudEnabled === false) {
      return history.push('/');
    }
  }, [cloud, history]);

  return (
    <KibanaPageTemplate panelled={false} grow paddingSize="xl">
      <EuiPageTemplate.Section alignment="center" grow paddingSize="xl" restrictWidth={false}>
        <EuiPanel hasShadow css={paddingCss}>
          <EuiFlexGroup
            className="cloudMigration__panel"
            alignItems="center"
            gutterSize="xl"
            justifyContent="spaceBetween"
          >
            <EuiFlexItem>
              <EuiImage
                alt="Illustration of Elastic data integrations"
                className="cloudMigration__illustration"
                src={
                  addBasePath('/plugins/kibanaReact/assets/') +
                  (isDarkMode
                    ? 'illustration-cloud-migration.svg'
                    : 'illustration-cloud-migration.svg')
                }
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiTitle size="s">
                <h3>
                  <FormattedMessage
                    id="cloudMigration.migrateToCloudTitle"
                    defaultMessage="Save time & money by moving your deployment to Elastic Cloud."
                  />
                </h3>
              </EuiTitle>

              <EuiSpacer size="xl" />

              <EuiListGroup maxWidth={700}>
                <EuiListGroupItem
                  {...listItemProps}
                  label={
                    <FormattedMessage
                      id="cloudMigration.deployInSeconds.text"
                      defaultMessage="Deploy in seconds and scale with a click."
                    />
                  }
                />

                <EuiSpacer size="s" />

                <EuiListGroupItem
                  {...listItemProps}
                  label={
                    <FormattedMessage
                      id="cloudMigration.freeUpEngineering.text"
                      defaultMessage="Free up your engineering teams from managing the stack."
                    />
                  }
                />

                <EuiSpacer size="s" />

                <EuiListGroupItem
                  {...listItemProps}
                  label={
                    <FormattedMessage
                      id="cloudMigration.getHelpFromCreators.text"
                      defaultMessage="Get help from the creators of the stack to help you set up your workload, tune for performance, or scale up to petabytes of data."
                    />
                  }
                />

                <EuiSpacer size="s" />

                <EuiListGroupItem
                  {...listItemProps}
                  label={
                    <FormattedMessage
                      id="cloudMigration.getInstantAccess.text"
                      defaultMessage="Get instant access to the latest version of the Elastic Stack with premium features like anomaly detection, searchable snapshots, advanced prevent and protection capabilities, and more."
                    />
                  }
                />
              </EuiListGroup>

              <EuiSpacer size="l" />

              <div>
                {/* eslint-disable-next-line @elastic/eui/href-or-on-click */}
                <EuiButton
                  fill={true}
                  fullWidth={false}
                  href={addBasePath('#/cloud_migration')}
                  onClick={(event: MouseEvent) => {
                    trackUiMetric(METRIC_TYPE.CLICK, 'migrate_to_elastic_cloud');
                  }}
                >
                  <FormattedMessage
                    id="cloudMigration.readInstructionsButtonLabel"
                    defaultMessage="Read migration instructions"
                  />
                </EuiButton>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </EuiPageTemplate.Section>
    </KibanaPageTemplate>
  );
};
