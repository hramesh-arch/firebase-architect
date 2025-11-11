// Design Systems Export
// Central export for all design system definitions

import { materialDesignSystem } from './material';
import { shadcnDesignSystem } from './shadcn';
import { linearDesignSystem } from './linear';
import { fluentDesignSystem } from './fluent';
import { carbonDesignSystem } from './carbon';
import { antdDesignSystem } from './antd';
import { chakraDesignSystem } from './chakra';
import { polarisDesignSystem } from './polaris';
import { atlassianDesignSystem } from './atlassian';

export const DESIGN_SYSTEMS = {
  material: materialDesignSystem,
  fluent: fluentDesignSystem,
  carbon: carbonDesignSystem,
  antd: antdDesignSystem,
  shadcn: shadcnDesignSystem,
  chakra: chakraDesignSystem,
  polaris: polarisDesignSystem,
  atlassian: atlassianDesignSystem,
  linear: linearDesignSystem
};

export const DESIGN_SYSTEM_LIST = [
  materialDesignSystem,
  fluentDesignSystem,
  carbonDesignSystem,
  antdDesignSystem,
  shadcnDesignSystem,
  chakraDesignSystem,
  polarisDesignSystem,
  atlassianDesignSystem,
  linearDesignSystem
];

// Helper function to get design system by ID
export function getDesignSystem(id) {
  return DESIGN_SYSTEMS[id] || materialDesignSystem;
}
