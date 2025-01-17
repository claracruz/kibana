/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  DOCUMENT_DETAILS_FLYOUT_HISTORY_TAB,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_BUTTON_GROUP,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_ENTITIES_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_THREAT_INTELLIGENCE_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_PREVALENCE_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_CORRELATIONS_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_ENTITIES_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_THREAT_INTELLIGENCE_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_PREVALENCE_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_CORRELATIONS_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_INVESTIGATION_TAB_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_INVESTIGATION_TAB,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_BUTTON_GROUP,
  DOCUMENT_DETAILS_FLYOUT_HISTORY_TAB_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_SESSION_VIEW_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_GRAPH_ANALYZER_BUTTON,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_SESSION_VIEW_CONTENT,
  DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_GRAPH_ANALYZER_CONTENT,
} from '../../../../screens/document_expandable_flyout';
import {
  expandDocumentDetailsExpandableFlyoutLeftSection,
  expandFirstAlertExpandableFlyout,
  openGraphAnalyzer,
  openHistoryTab,
  openInsightsTab,
  openInvestigationTab,
  openSessionView,
  openVisualizeTab,
  openEntities,
  openThreatIntelligence,
  openPrevalence,
  openCorrelations,
} from '../../../../tasks/document_expandable_flyout';
import { cleanKibana } from '../../../../tasks/common';
import { login, visit } from '../../../../tasks/login';
import { createRule } from '../../../../tasks/api_calls/rules';
import { getNewRule } from '../../../../objects/rule';
import { ALERTS_URL } from '../../../../urls/navigation';
import { waitForAlertsToPopulate } from '../../../../tasks/create_new_rule';

describe(
  'Alert details expandable flyout left panel',
  { env: { ftrConfig: { enableExperimental: ['securityFlyoutEnabled'] } } },
  () => {
    before(() => {
      cleanKibana();
      createRule(getNewRule());
    });

    beforeEach(() => {
      login();
      visit(ALERTS_URL);
      waitForAlertsToPopulate();
      expandFirstAlertExpandableFlyout();
      expandDocumentDetailsExpandableFlyoutLeftSection();
    });

    it('should display 4 tabs in the header', () => {
      cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB)
        .should('be.visible')
        .and('have.text', 'Visualize');
      cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB)
        .should('be.visible')
        .and('have.text', 'Insights');
      cy.get(DOCUMENT_DETAILS_FLYOUT_INVESTIGATION_TAB)
        .should('be.visible')
        .and('have.text', 'Investigation');
      cy.get(DOCUMENT_DETAILS_FLYOUT_HISTORY_TAB).should('be.visible').and('have.text', 'History');
    });

    it.skip('should display tab content when switching tabs', () => {
      openVisualizeTab();
      cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_BUTTON_GROUP).should('be.visible');

      openInsightsTab();
      cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_BUTTON_GROUP).should('be.visible');

      openInvestigationTab();
      cy.get(DOCUMENT_DETAILS_FLYOUT_INVESTIGATION_TAB_CONTENT).should('be.visible');

      openHistoryTab();
      cy.get(DOCUMENT_DETAILS_FLYOUT_HISTORY_TAB_CONTENT).should('be.visible');
    });

    describe.skip('visualize tab', () => {
      it('should display a button group with 2 button in the visualize tab', () => {
        openVisualizeTab();
        cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_SESSION_VIEW_BUTTON)
          .should('be.visible')
          .and('have.text', 'Session View');
        cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_GRAPH_ANALYZER_BUTTON)
          .should('be.visible')
          .and('have.text', 'Analyzer Graph');
      });

      it('should display content when switching buttons', () => {
        openVisualizeTab();
        openSessionView();
        cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_SESSION_VIEW_CONTENT).should('be.visible');

        openGraphAnalyzer();
        cy.get(DOCUMENT_DETAILS_FLYOUT_VISUALIZE_TAB_GRAPH_ANALYZER_CONTENT).should('be.visible');
      });
    });

    describe.skip('insights tab', () => {
      it('should display a button group with 4 button in the insights tab', () => {
        openInsightsTab();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_ENTITIES_BUTTON)
          .should('be.visible')
          .and('have.text', 'Entities');
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_THREAT_INTELLIGENCE_BUTTON)
          .should('be.visible')
          .and('have.text', 'Threat Intelligence');
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_PREVALENCE_BUTTON)
          .should('be.visible')
          .and('have.text', 'Prevalence');
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_CORRELATIONS_BUTTON)
          .should('be.visible')
          .and('have.text', 'Correlations');
      });

      it('should display content when switching buttons', () => {
        openInsightsTab();
        openEntities();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_ENTITIES_CONTENT).should('be.visible');

        openThreatIntelligence();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_THREAT_INTELLIGENCE_CONTENT)
          .should('be.visible')
          .and('have.text', 'Threat Intelligence');

        openPrevalence();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_PREVALENCE_CONTENT)
          .should('be.visible')
          .and('have.text', 'Prevalence');

        openCorrelations();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INSIGHTS_TAB_CORRELATIONS_CONTENT)
          .should('be.visible')
          .and('have.text', 'Correlations');
      });
    });

    describe.skip('investigation tab', () => {
      it('should display investigation guide', () => {
        openInvestigationTab();
        cy.get(DOCUMENT_DETAILS_FLYOUT_INVESTIGATION_TAB_CONTENT).should('be.visible');
      });
    });
  }
);
