// Customizer: Full customization interface with design system foundation
// Includes layout selection, colors, typography, navigation, and all preview options

import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Copy, Check, ArrowLeft, Palette, Type, Monitor, Tablet, Smartphone, RotateCcw, LayoutDashboard, FileText, Grid3x3, Table, ChevronLeft, ChevronRight, Layout, Layers } from 'lucide-react';
import {
  COLOR_THEME_LIST,
  TYPOGRAPHY_LIST,
  NAVIGATION_STYLES,
  LAYOUT_TEMPLATE_LIST,
  DESIGN_SYSTEM_LIST,
  getDesignSystem,
  getLayout,
  getColorTheme,
  getTypography
} from '../config/templateConfig';
import { DesignSystemProvider } from '../providers/DesignSystemProvider';

// Import adaptive dashboard that responds to design system
import AdaptiveDashboard from './previews/AdaptiveDashboard';
import Material3Dashboard from './previews/Material3Dashboard';
import Material3CardsPreview from './previews/Material3CardsPreview';
import Material3TablePreview from './previews/Material3TablePreview';
import Material3FormPreview from './previews/Material3FormPreview';
import CarbonCardsPreview from './previews/CarbonCardsPreview';
import CarbonTablePreview from './previews/CarbonTablePreview';
import CarbonFormPreview from './previews/CarbonFormPreview';
import MondayDashboard from './previews/MondayDashboard';
import TrelloDashboard from './previews/TrelloDashboard';
import FormPreview from './previews/FormPreview';
import CardsPreview from './previews/CardsPreview';
import TablePreview from './previews/TablePreview';

export default function Customizer({ template, onClose }) {
  // Initialize config from the template object (which now has our new structure)
  const [designSystemId, setDesignSystemId] = useState(template.designSystem.id);
  const [layoutId, setLayoutId] = useState(template.layout.id);
  const [themeId, setThemeId] = useState(template.theme.id);
  const [typographyId, setTypographyId] = useState(template.typography.id);
  const [navigationStyle, setNavigationStyle] = useState(template.navigationStyle);

  // Get the actual objects
  const designSystem = getDesignSystem(designSystemId);
  const layout = getLayout(layoutId);
  const theme = getColorTheme(themeId);
  const typography = getTypography(typographyId);

  // Build a config object compatible with existing preview components
  const [config, setConfig] = useState({
    colors: theme.colors,
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize
    },
    navigationStyle,
    spacing: designSystem.foundations.spacing.unit,
    borderRadius: designSystem.foundations.borderRadius.md,
    density: 'normal'
  });

  // Update config when selections change
  useEffect(() => {
    const newTheme = getColorTheme(themeId);
    const newTypography = getTypography(typographyId);
    const newDesignSystem = getDesignSystem(designSystemId);

    setConfig(prev => ({
      ...prev,
      colors: newTheme.colors,
      typography: {
        fontFamily: newTypography.fontFamily,
        fontSize: newTypography.fontSize
      },
      navigationStyle,
      spacing: newDesignSystem.foundations.spacing.unit,
      borderRadius: newDesignSystem.foundations.borderRadius.md
    }));
  }, [themeId, typographyId, designSystemId, navigationStyle]);

  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [previewTab, setPreviewTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  const updateColor = (colorKey, value) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value }
    }));
  };

  const applyColorTheme = (newThemeId) => {
    setThemeId(newThemeId);
  };

  const applyTypography = (newTypographyId) => {
    setTypographyId(newTypographyId);
  };

  const generateConfig = () => {
    return {
      uiTemplate: {
        designSystem: designSystemId,
        layout: layoutId,
        theme: themeId,
        typography: typographyId,
        navigationStyle,
        customColors: config.colors,
        customTypography: config.typography,
        density: config.density
      }
    };
  };

  const copyToClipboard = () => {
    const configJson = JSON.stringify(generateConfig(), null, 2);
    navigator.clipboard.writeText(configJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetToDefault = () => {
    if (confirm('Reset all customizations to default values?')) {
      setDesignSystemId(template.designSystem.id);
      setLayoutId(template.layout.id);
      setThemeId(template.theme.id);
      setTypographyId(template.typography.id);
      setNavigationStyle(template.navigationStyle);
    }
  };

  // Legacy template mapping for existing preview components
  const legacyTemplate = {
    id: designSystemId,
    name: designSystem.name,
    framework: 'React',
    defaultConfig: config
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0 z-10">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to gallery"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{designSystem.name} Template</h2>
              <p className="text-xs text-gray-600">{layout.name} • {theme.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              title={leftSidebarOpen ? "Hide design systems" : "Show design systems"}
            >
              {leftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="hidden sm:inline text-sm">{leftSidebarOpen ? 'Hide' : 'Design Systems'}</span>
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              title={sidebarOpen ? "Hide customization" : "Show customization"}
            >
              {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span className="hidden sm:inline text-sm">{sidebarOpen ? 'Hide' : 'Customize'}</span>
            </button>
            <button
              onClick={resetToDefault}
              className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                copied
                  ? 'bg-green-600 text-white scale-105'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Config'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Design System Switcher */}
        <div
          className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-20 ${
            leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '320px', marginTop: '60px' }}
        >
          <div className="h-full overflow-y-auto p-4">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Layers className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-bold text-gray-900">Design Systems</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 px-2">
              Switch between different enterprise design systems to see how they affect your template
            </p>
            <div className="space-y-2">
              {DESIGN_SYSTEM_LIST.map(ds => (
                <button
                  key={ds.id}
                  onClick={() => setDesignSystemId(ds.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    designSystemId === ds.id
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{ds.name}</div>
                      {ds.vendor && (
                        <div className="text-xs text-gray-500 mt-0.5">{ds.vendor}</div>
                      )}
                    </div>
                    {designSystemId === ds.id && (
                      <div className="bg-blue-600 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{ds.description}</p>
                  {ds.usedBy && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ds.usedBy.slice(0, 3).map((product, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div
          className={`flex-1 overflow-hidden flex flex-col bg-white transition-all duration-300 ${
            leftSidebarOpen ? 'ml-[320px]' : 'ml-0'
          }`}
        >
          {/* Preview Controls */}
          <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            {/* Preview Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPreviewTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => setPreviewTab('form')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewTab === 'form'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                Forms
              </button>
              <button
                onClick={() => setPreviewTab('cards')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewTab === 'cards'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                Cards
              </button>
              <button
                onClick={() => setPreviewTab('table')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewTab === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Table className="w-4 h-4" />
                Table
              </button>
            </div>

            {/* Device Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded transition-colors ${
                  previewDevice === 'desktop'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Desktop"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded transition-colors ${
                  previewDevice === 'tablet'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Tablet"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded transition-colors ${
                  previewDevice === 'mobile'
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Mobile"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div
              className="transition-all duration-300 mx-auto h-full"
              style={{
                width: deviceWidths[previewDevice],
                maxWidth: '100%',
                minWidth: previewDevice === 'mobile' ? '375px' : 'auto'
              }}
            >
              <DesignSystemProvider system={designSystem} theme={theme}>
                {previewTab === 'dashboard' && (
                  <>
                    {designSystemId === 'material' ? (
                      <Material3Dashboard config={config} />
                    ) : (
                      <AdaptiveDashboard config={config} />
                    )}
                  </>
                )}
                {previewTab === 'form' && (
                  <>
                    {designSystemId === 'material' ? (
                      <Material3FormPreview config={config} />
                    ) : designSystemId === 'carbon' ? (
                      <CarbonFormPreview config={config} />
                    ) : (
                      <div className="bg-gray-50 p-8 min-h-full">
                        <FormPreview config={config} template={legacyTemplate} />
                      </div>
                    )}
                  </>
                )}
                {previewTab === 'cards' && (
                  <>
                    {designSystemId === 'material' ? (
                      <Material3CardsPreview config={config} />
                    ) : designSystemId === 'carbon' ? (
                      <CarbonCardsPreview config={config} />
                    ) : (
                      <div className="bg-gray-50 min-h-full">
                        <CardsPreview config={config} template={legacyTemplate} />
                      </div>
                    )}
                  </>
                )}
                {previewTab === 'table' && (
                  <>
                    {designSystemId === 'material' ? (
                      <Material3TablePreview config={config} />
                    ) : designSystemId === 'carbon' ? (
                      <CarbonTablePreview config={config} />
                    ) : (
                      <div className="bg-gray-50 p-8 min-h-full">
                        <TablePreview config={config} template={legacyTemplate} />
                      </div>
                    )}
                  </>
                )}
              </DesignSystemProvider>
            </div>
          </div>
        </div>

        {/* Customization Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out z-20 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ width: '400px', marginTop: '60px' }}
        >
          <div className="h-full overflow-y-auto p-6 space-y-6">
            {/* Colors */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Colors</h3>
              </div>

              {/* Color Theme Presets */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Themes
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {COLOR_THEME_LIST.map(t => (
                    <button
                      key={t.id}
                      onClick={() => applyColorTheme(t.id)}
                      className={`flex items-center gap-2 px-3 py-2 border rounded transition-colors text-sm ${
                        themeId === t.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: t.colors.primary }}
                      />
                      <span className="text-xs font-medium">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Colors */}
              <div className="space-y-3">
                {Object.entries(config.colors).map(([name, color]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {name}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveColorPicker(activeColorPicker === name ? null : name)}
                        className="w-10 h-10 rounded border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => updateColor(name, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                      />
                    </div>
                    {activeColorPicker === name && (
                      <div className="mt-2">
                        <HexColorPicker color={color} onChange={(c) => updateColor(name, c)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation & Layout */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Navigation</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navigation Style
                </label>
                <select
                  value={navigationStyle}
                  onChange={(e) => setNavigationStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {NAVIGATION_STYLES.map(nav => (
                    <option key={nav.id} value={nav.id}>
                      {nav.name} - {nav.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Typography</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={typographyId}
                    onChange={(e) => applyTypography(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {TYPOGRAPHY_LIST.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {config.typography.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="18"
                    value={config.typography.fontSize}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      typography: { ...prev.typography, fontSize: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line Height: {config.typography.lineHeight || 1.5}
                  </label>
                  <input
                    type="range"
                    min="1.2"
                    max="2.0"
                    step="0.1"
                    value={config.typography.lineHeight || 1.5}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      typography: { ...prev.typography, lineHeight: parseFloat(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Letter Spacing: {config.typography.letterSpacing || 0}px
                  </label>
                  <input
                    type="range"
                    min="-1"
                    max="2"
                    step="0.1"
                    value={config.typography.letterSpacing || 0}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      typography: { ...prev.typography, letterSpacing: parseFloat(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Design Foundations */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Design Foundations</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spacing Scale: {config.spacing}px
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    step="2"
                    value={config.spacing}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      spacing: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Base unit for all spacing in the design</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius: {config.borderRadius || 8}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="2"
                    value={config.borderRadius || 8}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      borderRadius: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Roundness of corners for cards, buttons, inputs</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shadow Intensity
                  </label>
                  <select
                    value={config.shadowIntensity || 'medium'}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      shadowIntensity: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="subtle">Subtle</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Config Code */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-3">Configuration</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs max-h-60">
                  <code>{JSON.stringify(generateConfig(), null, 2)}</code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
