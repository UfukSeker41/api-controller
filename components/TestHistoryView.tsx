import { useState, useEffect } from 'react';
import { TestResult, TestReport } from '@/types/testing';
import TestHistoryService from '@/services/TestHistoryService';
import { ApiDetails, ApiEndpoint } from '@/types/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface TestHistoryViewProps {
  api: ApiDetails;
  endpoint?: ApiEndpoint;
}

export default function TestHistoryView({ api, endpoint }: TestHistoryViewProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [reports, setReports] = useState<TestReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Son 30 gün
    end: new Date()
  });

  useEffect(() => {
    loadTestHistory();
  }, [api.id, endpoint?.id]);

  const loadTestHistory = () => {
    const testResults = TestHistoryService.getTestResults(
      api.id,
      endpoint?.id
    );
    setResults(testResults);

    const testReports = TestHistoryService.getReports(api.id);
    setReports(testReports);
  };

  const generateNewReport = () => {
    const report = TestHistoryService.generateReport(
      api.id,
      dateRange.start,
      dateRange.end
    );
    TestHistoryService.saveReport(report);
    setReports([...reports, report]);
    setSelectedReport(report);
  };

  const deleteReport = (reportId: string) => {
    TestHistoryService.deleteReport(reportId);
    setReports(reports.filter(r => r.id !== reportId));
    if (selectedReport?.id === reportId) {
      setSelectedReport(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tarih Aralığı Seçimi */}
      <div className="flex items-center space-x-4">
        <div>
          <label className="block text-sm font-medium mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({
              ...dateRange,
              start: new Date(e.target.value)
            })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({
              ...dateRange,
              end: new Date(e.target.value)
            })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          onClick={generateNewReport}
          className="btn btn-primary mt-6"
        >
          Rapor Oluştur
        </button>
      </div>

      {/* Test Sonuçları Özeti */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Toplam Test</div>
          <div className="stat-value">{results.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Başarılı</div>
          <div className="stat-value text-success">
            {results.filter(r => r.success).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Başarısız</div>
          <div className="stat-value text-error">
            {results.filter(r => !r.success).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title">Ortalama Süre</div>
          <div className="stat-value">
            {Math.round(
              results.reduce((sum, r) => sum + r.duration, 0) / results.length || 0
            )}ms
          </div>
        </div>
      </div>

      {/* Raporlar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test Raporları</h3>
          <div className="space-y-2">
            {reports.map(report => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="btn btn-sm btn-ghost"
                  >
                    Görüntüle
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seçili Rapor Detayları */}
        {selectedReport && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Rapor Detayları</h3>
            
            {/* Başarı Oranı Grafiği */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedReport.charts.successRateOverTime.labels.map((label, i) => ({
                  date: label,
                  rate: selectedReport.charts.successRateOverTime.data[i]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name="Başarı Oranı (%)"
                    stroke="#4CAF50"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Yanıt Süresi Dağılımı */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedReport.charts.responseTimeDistribution.labels.map((label, i) => ({
                  range: label,
                  count: selectedReport.charts.responseTimeDistribution.data[i]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Test Sayısı"
                    fill="#2196F3"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* HTTP Durum Kodu Dağılımı */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedReport.charts.statusCodeDistribution.labels.map((label, i) => ({
                  code: label,
                  count: selectedReport.charts.statusCodeDistribution.data[i]
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Durum Kodu Sayısı"
                    fill="#FF9800"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}