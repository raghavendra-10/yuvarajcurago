"use client";

export default function BookingFormConfig({ config, onChange, slug }) {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">Note:</p>
        <p>The booking form is always included at the end of the page. You can optionally customize the title and subtitle.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Title (optional)
        </label>
        <input
          type="text"
          value={config.customTitle || ""}
          onChange={(e) => handleChange("customTitle", e.target.value)}
          placeholder="Leave blank for default"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Subtitle (optional)
        </label>
        <textarea
          value={config.customSubtitle || ""}
          onChange={(e) => handleChange("customSubtitle", e.target.value)}
          rows={2}
          placeholder="Leave blank for default"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
