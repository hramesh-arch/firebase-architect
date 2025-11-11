// TemplateGallery: Choose your design system foundation
// After selection, go to Customizer to configure everything else

import { useState } from 'react';
import { DESIGN_SYSTEM_LIST, TEMPLATE_PRESETS, buildTemplateConfig } from '../config/templateConfig';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function TemplateGallery({ onSelectTemplate }) {
  const [selectedDesignSystem, setSelectedDesignSystem] = useState(null);

  // Handle preset selection - goes straight to customizer with preset config
  const handlePresetSelect = (preset) => {
    const config = buildTemplateConfig({
      designSystemId: preset.designSystem,
      layoutId: preset.layout,
      themeId: preset.theme,
      typographyId: preset.typography,
      navigationStyle: preset.navigationStyle
    });
    onSelectTemplate(config);
  };

  // Handle design system selection - goes to customizer with default config
  const handleDesignSystemSelect = () => {
    if (selectedDesignSystem) {
      const config = buildTemplateConfig({
        designSystemId: selectedDesignSystem,
        layoutId: 'dashboardGrid', // default layout
        themeId: 'blue', // default theme
        typographyId: 'system', // default typography
        navigationStyle: 'side' // default navigation
      });
      onSelectTemplate(config);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">UI Template Library</h1>
              <p className="mt-1 text-sm text-gray-600">
                Choose your design system foundation, then customize everything
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Firebase Architect</div>
              <div className="text-xs text-gray-400">Design System Powered</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Start Presets */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Quick Start Presets</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Jump right in with a pre-configured template (you can customize everything afterwards)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {TEMPLATE_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
              >
                <div className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {preset.name}
                </div>
                <div className="text-xs text-gray-600 mb-2">{preset.description}</div>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  Customize <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Design System Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Or Choose Your Design System</h2>
            <p className="text-gray-600">
              Select the aesthetic foundation, then customize layouts, colors, typography, and more in the next screen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {DESIGN_SYSTEM_LIST.map(system => (
              <button
                key={system.id}
                onClick={() => setSelectedDesignSystem(system.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedDesignSystem === system.id
                    ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{system.name}</h3>
                  {selectedDesignSystem === system.id && (
                    <div className="bg-blue-600 rounded-full p-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>• Spacing: {system.foundations.spacing.unit}px grid</div>
                  <div>• Border radius: {system.foundations.borderRadius.md}px</div>
                  <div>• Button style: {system.patterns.button.variant}</div>
                  <div>• Card style: {system.patterns.card.variant}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button
              onClick={handleDesignSystemSelect}
              disabled={!selectedDesignSystem}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                !selectedDesignSystem
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              Continue to Customization
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">What's Next?</h3>
          <p className="text-gray-600 mb-4">
            After selecting a design system, you'll be able to customize:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 rounded p-1 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Layout Structure</div>
                <div className="text-gray-600">Dashboard grid, spreadsheet, kanban board, timeline, etc.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 rounded p-1 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Color Palette</div>
                <div className="text-gray-600">Primary, secondary, success, error, and all theme colors</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 rounded p-1 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Typography</div>
                <div className="text-gray-600">Font families, sizes, and weights</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 rounded p-1 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Navigation Style</div>
                <div className="text-gray-600">Side nav, top nav, compact, or combined layouts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
