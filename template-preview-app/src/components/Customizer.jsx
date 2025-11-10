import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Copy, Check, ArrowLeft, Palette, Type, Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react';
import { COLOR_PALETTES, FONT_COMBINATIONS } from '../data/templates';

export default function Customizer({ template, onClose }) {
  const [config, setConfig] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem(`template-${template.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return JSON.parse(JSON.stringify(template.defaultConfig));
      }
    }
    return JSON.parse(JSON.stringify(template.defaultConfig));
  });
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop, tablet, mobile

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(`template-${template.id}`, JSON.stringify(config));
  }, [config, template.id]);

  // Device preview widths
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

  const applyColorPalette = (paletteKey) => {
    const palette = COLOR_PALETTES[paletteKey];
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, ...palette }
    }));
  };

  const applyFontCombination = (fontKey) => {
    const font = FONT_COMBINATIONS[fontKey];
    setConfig(prev => ({
      ...prev,
      typography: { ...prev.typography, fontFamily: font.fontFamily }
    }));
  };

  const generateConfig = () => {
    return {
      uiTemplate: {
        templateId: template.id,
        templateName: template.name,
        framework: template.framework,
        customization: config,
        components: template.components,
        layouts: template.layouts
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
      const defaultConfig = JSON.parse(JSON.stringify(template.defaultConfig));
      setConfig(defaultConfig);
      localStorage.removeItem(`template-${template.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
                <p className="text-sm text-gray-600">{template.framework}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefault}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  copied
                    ? 'bg-green-600 text-white scale-105'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? <Check className="w-4 h-4 animate-bounce" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>

                {/* Device Selector */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded transition-colors ${
                      previewDevice === 'desktop'
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Desktop (1920px)"
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
                    title="Tablet (768px)"
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
                    title="Mobile (375px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Content with Responsive Width */}
              <div className="flex justify-center">
                <div
                  className="space-y-4 transition-all duration-300"
                  style={{
                    width: deviceWidths[previewDevice],
                    maxWidth: '100%'
                  }}
                >
                {/* Color Preview */}
                <div className="p-6 rounded-lg" style={{ backgroundColor: config.colors.primary }}>
                  <div className="text-white">
                    <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: config.typography.fontFamily }}>
                      {template.name}
                    </h4>
                    <p style={{ fontFamily: config.typography.fontFamily, fontSize: `${config.typography.fontSize}px` }}>
                      This is how your application will look with these colors and typography.
                    </p>
                  </div>
                </div>

                {/* Button Samples */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(config.colors).slice(0, 6).map(([name, color]) => (
                    <button
                      key={name}
                      className="px-4 py-2 rounded text-white font-medium capitalize"
                      style={{
                        backgroundColor: color,
                        fontFamily: config.typography.fontFamily,
                        borderRadius: `${config.borderRadius}px`
                      }}
                    >
                      {name} Button
                    </button>
                  ))}
                </div>

                {/* Card Sample */}
                <div
                  className="border p-4"
                  style={{
                    borderRadius: `${config.borderRadius}px`,
                    fontFamily: config.typography.fontFamily
                  }}
                >
                  <h5 className="font-semibold mb-2" style={{ fontSize: `${config.typography.fontSize + 2}px` }}>
                    Card Component
                  </h5>
                  <p className="text-gray-600" style={{ fontSize: `${config.typography.fontSize}px` }}>
                    This is a sample card showing how your content will appear.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Colors */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Colors</h3>
              </div>

              {/* Color Presets */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
                    <button
                      key={key}
                      onClick={() => applyColorPalette(key)}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:border-blue-500 transition-colors text-sm"
                    >
                      <div className="flex gap-1">
                        {Object.values(palette).slice(0, 3).map((color, i) => (
                          <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className="text-xs capitalize">{key.split('-').join(' ')}</span>
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

            {/* Typography */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold">Typography</h3>
              </div>

              <div className="space-y-4">
                {/* Font Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Combinations
                  </label>
                  <select
                    onChange={(e) => applyFontCombination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a preset...</option>
                    {Object.entries(FONT_COMBINATIONS).map(([key, font]) => (
                      <option key={key} value={key}>
                        {key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - {font.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Font Size: {config.typography.fontSize}px
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

                {/* Spacing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spacing Scale: {config.spacing}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    step="2"
                    value={config.spacing}
                    onChange={(e) => setConfig(prev => ({ ...prev, spacing: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                {/* Border Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius: {config.borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={config.borderRadius}
                    onChange={(e) => setConfig(prev => ({ ...prev, borderRadius: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Configuration Code</h3>
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{JSON.stringify(generateConfig(), null, 2)}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How to Use:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Copy the configuration code above</li>
              <li>Open Claude Code in VS Code</li>
              <li>Type <code className="px-2 py-1 bg-blue-100 rounded">/new-firebase-app</code></li>
              <li>When asked about UI template, paste this configuration</li>
              <li>Claude Code will set up your project with this template!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
