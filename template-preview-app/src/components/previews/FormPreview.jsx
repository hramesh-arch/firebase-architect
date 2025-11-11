import { Save, X, Upload, Calendar } from 'lucide-react';

export default function FormPreview({ config }) {
  const { colors, typography, borderRadius, spacing } = config;

  return (
    <div
      className="bg-white p-8 shadow-lg"
      style={{
        borderRadius: `${borderRadius}px`,
        fontFamily: typography.fontFamily,
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <div className="mb-6">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: colors.primary }}
        >
          Create New Project
        </h2>
        <p
          className="text-gray-600"
          style={{ fontSize: `${typography.fontSize}px` }}
        >
          Fill out the form below to create a new project
        </p>
      </div>

      <form className="space-y-6">
        {/* Project Name */}
        <div>
          <label
            className="block font-medium mb-2"
            style={{ fontSize: `${typography.fontSize}px` }}
          >
            Project Name *
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
            style={{
              borderRadius: `${borderRadius}px`,
              fontSize: `${typography.fontSize}px`,
              borderColor: colors.primary + '30'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.primary + '30';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block font-medium mb-2"
            style={{ fontSize: `${typography.fontSize}px` }}
          >
            Description
          </label>
          <textarea
            placeholder="Enter project description"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
            style={{
              borderRadius: `${borderRadius}px`,
              fontSize: `${typography.fontSize}px`,
              borderColor: colors.primary + '30'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.primary + '30';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Grid Layout: Category and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block font-medium mb-2"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              Category *
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
              style={{
                borderRadius: `${borderRadius}px`,
                fontSize: `${typography.fontSize}px`,
                borderColor: colors.primary + '30'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.primary + '30';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option>Select category</option>
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>

          <div>
            <label
              className="block font-medium mb-2"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              Priority *
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
              style={{
                borderRadius: `${borderRadius}px`,
                fontSize: `${typography.fontSize}px`,
                borderColor: colors.primary + '30'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.primary + '30';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option>Select priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block font-medium mb-2"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                style={{
                  borderRadius: `${borderRadius}px`,
                  fontSize: `${typography.fontSize}px`,
                  borderColor: colors.primary + '30'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.primary + '30';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block font-medium mb-2"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                style={{
                  borderRadius: `${borderRadius}px`,
                  fontSize: `${typography.fontSize}px`,
                  borderColor: colors.primary + '30'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.primary + '30';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label
            className="block font-medium mb-2"
            style={{ fontSize: `${typography.fontSize}px` }}
          >
            Attachments
          </label>
          <div
            className="border-2 border-dashed p-8 text-center cursor-pointer transition-colors hover:border-gray-400"
            style={{
              borderRadius: `${borderRadius}px`,
              borderColor: colors.primary + '40'
            }}
          >
            <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: colors.primary }} />
            <p
              className="font-medium mb-1"
              style={{ fontSize: `${typography.fontSize}px`, color: colors.primary }}
            >
              Click to upload or drag and drop
            </p>
            <p
              className="text-gray-500 text-sm"
              style={{ fontSize: `${typography.fontSize - 2}px` }}
            >
              PDF, DOC, DOCX, or images (max. 10MB)
            </p>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notifications"
              className="w-5 h-5 cursor-pointer"
              style={{
                accentColor: colors.primary,
                borderRadius: `${borderRadius / 2}px`
              }}
            />
            <label
              htmlFor="notifications"
              className="cursor-pointer"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              Send email notifications to team members
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="public"
              className="w-5 h-5 cursor-pointer"
              style={{
                accentColor: colors.primary,
                borderRadius: `${borderRadius / 2}px`
              }}
            />
            <label
              htmlFor="public"
              className="cursor-pointer"
              style={{ fontSize: `${typography.fontSize}px` }}
            >
              Make this project publicly visible
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: colors.primary,
              borderRadius: `${borderRadius}px`,
              fontSize: `${typography.fontSize}px`
            }}
          >
            <Save className="w-5 h-5" />
            Create Project
          </button>
          <button
            type="button"
            className="px-6 py-3 border-2 font-medium transition-all hover:bg-gray-50"
            style={{
              borderColor: colors.primary + '40',
              color: colors.primary,
              borderRadius: `${borderRadius}px`,
              fontSize: `${typography.fontSize}px`
            }}
          >
            <X className="w-5 h-5 inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
