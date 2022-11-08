/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { CoreSetup, Plugin, CoreStart, PluginInitializerContext } from '@kbn/core/public';

import { CloudSetup, CloudStart } from '@kbn/cloud-plugin/public';
import { BreadcrumbService } from '@kbn/index-lifecycle-management-plugin/public/application/services/breadcrumbs';
import {
  SetupDependencies,
  StartDependencies,
} from '@kbn/index-lifecycle-management-plugin/public/types';
import { firstValueFrom } from 'rxjs';
import { PLUGIN } from '../common/constants';
import { MIN_PLUGIN_LICENSE } from '@kbn/index-lifecycle-management-plugin/common/constants'
import { i18n } from '@kbn/i18n'

interface CloudDataMigrationDepsSetup {
  cloud?: CloudSetup;
}

interface CloudDataMigrationDepsStart {
  cloud?: CloudStart;
}

const PLUGIN = {
  ID: 'cloud_data_migration',
  minimumLicenseType: MIN_PLUGIN_LICENSE,
  TITLE: i18n.translate('xpack.clodDataMigration.appTitle', {
    defaultMessage: 'Cloud Migration',
  }),
};

export class CloudDataMigrationPlugin
  implements Plugin<void, void, CloudDataMigrationDepsSetup, CloudDataMigrationDepsStart>
{
  constructor(private readonly initializerContext: PluginInitializerContext) {}

  private breadcrumbService = new BreadcrumbService();

  public setup(coreSetup: CoreSetup<StartDependencies>, plugins: SetupDependencies) {
    const { usageCollection, management, indexManagement, home, cloud } = plugins;

    if (true) {// TODO: isCloudEnabled?
      const {
        http,
        notifications: { toasts },
        fatalErrors,
        getStartServices,
      } = coreSetup;

      const { usageCollection, management, indexManagement, home, cloud } = plugins;

      management.sections.section.data.registerApp({
        id: PLUGIN.ID,
        title: PLUGIN.TITLE,
        order: 5,
        mount: async ({ element, history, setBreadcrumbs, theme$ }) => {
          const [coreStart, { licensing }] = await getStartServices();
          const {
            chrome: { docTitle },
            i18n: { Context: I18nContext },
            application,
            docLinks,
            executionContext,
          } = coreStart;

          const license = await firstValueFrom(licensing.license$);

          docTitle.change(PLUGIN.TITLE);
          this.breadcrumbService.setup(setBreadcrumbs);

          const { renderApp } = await import('./application');

          const unmountAppCallback = renderApp(
            element,
            I18nContext,
            history,
            application,
            this.breadcrumbService,
            license,
            theme$,
            docLinks,
            executionContext,
            cloud
          );

          return () => {
            docTitle.reset();
            unmountAppCallback();
          };
        },
      });
    }
  }

  public start(core: CoreStart, { cloud }: CloudDataMigrationDepsStart) {
    if (cloud?.isCloudEnabled) {
      console.log('to be continued');
    }
  }

  public stop() {}
}
