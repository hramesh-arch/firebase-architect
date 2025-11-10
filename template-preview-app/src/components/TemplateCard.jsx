import { Monitor } from 'lucide-react';

export default function TemplateCard({ template, onCustomize }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Monitor className="w-16 h-16 text-gray-400" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {template.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{template.framework}</p>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{template.description}</p>

        {/* Components Count */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <span>{template.components.length} components</span>
          <span>{template.layouts.length} layouts</span>
        </div>

        {/* Color Preview */}
        <div className="flex gap-1 mb-4">
          {Object.values(template.defaultConfig.colors).slice(0, 6).map((color, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={() => onCustomize(template)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Customize & Use
        </button>
      </div>
    </div>
  );
}
