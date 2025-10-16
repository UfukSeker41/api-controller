import { useState } from 'react';
import { ApiDocumentManager } from '../utils/apiDocumentManager';
import { ApiDocumentFormat, ImportOptions, ExportOptions } from '../types/importExport';
import { ApiDetails } from '../types/api';

interface ApiImportExportProps {
  apis: ApiDetails[];
  onImport: (apis: ApiDetails[]) => void;
}

export default function ApiImportExport({ apis, onImport }: ApiImportExportProps) {
  const [importFormat, setImportFormat] = useState<ApiDocumentFormat>('json');
  const [exportFormat, setExportFormat] = useState<ApiDocumentFormat>('json');
  const [includeTests, setIncludeTests] = useState(false);
  const [includeHistory, setIncludeHistory] = useState(false);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const options: ImportOptions = {
        format: importFormat,
        includeTests,
        includeHistory
      };

      const importedApis = await ApiDocumentManager.importApis(file, options);
      onImport(importedApis);
    } catch (error) {
      console.error('Import failed:', error);
      // Hata mesajını göster
    }
  };

  const handleExport = async () => {
    try {
      const options: ExportOptions = {
        format: exportFormat,
        includeTests,
        includeHistory,
        fileName: `api-documentation-${new Date().toISOString()}.${exportFormat}`
      };

      await ApiDocumentManager.exportApis(apis, options);
    } catch (error) {
      console.error('Export failed:', error);
      // Hata mesajını göster
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow">
      <h2 className="text-xl font-semibold">Import/Export API Documentation</h2>
      
      {/* Import Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Import APIs</h3>
        <div className="flex items-center space-x-4">
          <select
            value={importFormat}
            onChange={(e) => setImportFormat(e.target.value as ApiDocumentFormat)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="swagger">Swagger/OpenAPI</option>
            <option value="postman">Postman Collection</option>
          </select>
          <input
            type="file"
            accept=".json,.yaml,.yml"
            onChange={handleImport}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      {/* Export Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Export APIs</h3>
        <div className="space-y-4">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ApiDocumentFormat)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="swagger">Swagger/OpenAPI</option>
            <option value="postman">Postman Collection</option>
          </select>
          
          <div className="flex items-center space-x-4">
            <label className="label cursor-pointer">
              <span className="label-text">Include Tests</span>
              <input
                type="checkbox"
                checked={includeTests}
                onChange={(e) => setIncludeTests(e.target.checked)}
                className="checkbox"
              />
            </label>
            
            <label className="label cursor-pointer">
              <span className="label-text">Include History</span>
              <input
                type="checkbox"
                checked={includeHistory}
                onChange={(e) => setIncludeHistory(e.target.checked)}
                className="checkbox"
              />
            </label>
          </div>

          <button
            onClick={handleExport}
            className="btn btn-primary"
          >
            Export APIs
          </button>
        </div>
      </div>
    </div>
  );
}