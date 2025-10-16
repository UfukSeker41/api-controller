import { TestResult, TestReport, TestRun } from '@/types/testing';

class TestHistoryService {
  private static readonly STORAGE_KEYS = {
    RESULTS: 'test_results',
    REPORTS: 'test_reports',
    RUNS: 'test_runs'
  };

  // Test Sonuçları
  static saveTestResult(result: TestResult): void {
    const results = this.getTestResults();
    results.push(result);
    localStorage.setItem(this.STORAGE_KEYS.RESULTS, JSON.stringify(results));
  }

  static getTestResults(apiId?: string, endpointId?: string): TestResult[] {
    const results: TestResult[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEYS.RESULTS) || '[]'
    );

    if (apiId && endpointId) {
      return results.filter(
        (r) => r.apiId === apiId && r.endpointId === endpointId
      );
    } else if (apiId) {
      return results.filter((r) => r.apiId === apiId);
    }

    return results;
  }

  static deleteTestResult(id: string): void {
    const results = this.getTestResults();
    const filteredResults = results.filter((r) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.RESULTS, JSON.stringify(filteredResults));
  }

  // Test Raporları
  static generateReport(apiId: string, startDate: Date, endDate: Date): TestReport {
    const results = this.getTestResults(apiId).filter(
      (r) => {
        const timestamp = new Date(r.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      }
    );

    const successCount = results.filter((r) => r.success).length;
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

    // Zaman serisi verileri için tarihleri grupla
    const timeSeriesData = this.groupByDate(results, startDate, endDate);
    
    // Durum kodu dağılımını hesapla
    const statusCodes = this.groupByStatusCode(results);

    // Yanıt süresi dağılımını hesapla
    const responseTimes = this.calculateResponseTimeDistribution(results);

    return {
      id: crypto.randomUUID(),
      name: `API Report - ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      apiId,
      endpointId: results[0]?.endpointId || '',
      results,
      summary: {
        totalTests: results.length,
        successCount,
        failureCount: results.length - successCount,
        averageDuration: totalDuration / results.length || 0,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString()
      },
      charts: {
        responseTimeDistribution: responseTimes,
        successRateOverTime: {
          labels: timeSeriesData.labels,
          data: timeSeriesData.successRates
        },
        statusCodeDistribution: {
          labels: Object.keys(statusCodes),
          data: Object.values(statusCodes)
        }
      }
    };
  }

  static saveReport(report: TestReport): void {
    const reports = this.getReports();
    reports.push(report);
    localStorage.setItem(this.STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }

  static getReports(apiId?: string): TestReport[] {
    const reports: TestReport[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEYS.REPORTS) || '[]'
    );

    if (apiId) {
      return reports.filter((r) => r.apiId === apiId);
    }

    return reports;
  }

  static deleteReport(id: string): void {
    const reports = this.getReports();
    const filteredReports = reports.filter((r) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.REPORTS, JSON.stringify(filteredReports));
  }

  // Test Çalıştırmaları
  static saveTestRun(run: TestRun): void {
    const runs = this.getTestRuns();
    runs.push(run);
    localStorage.setItem(this.STORAGE_KEYS.RUNS, JSON.stringify(runs));
  }

  static getTestRuns(): TestRun[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.RUNS) || '[]');
  }

  static updateTestRun(run: TestRun): void {
    const runs = this.getTestRuns();
    const index = runs.findIndex((r) => r.id === run.id);
    if (index !== -1) {
      runs[index] = run;
      localStorage.setItem(this.STORAGE_KEYS.RUNS, JSON.stringify(runs));
    }
  }

  static deleteTestRun(id: string): void {
    const runs = this.getTestRuns();
    const filteredRuns = runs.filter((r) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.RUNS, JSON.stringify(filteredRuns));
  }

  // Yardımcı Metodlar
  private static groupByDate(
    results: TestResult[],
    startDate: Date,
    endDate: Date
  ): { labels: string[]; successRates: number[] } {
    const dates: string[] = [];
    const successRates: number[] = [];
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayResults = results.filter(
        (r) => new Date(r.timestamp).toDateString() === currentDate.toDateString()
      );
      
      dates.push(currentDate.toLocaleDateString());
      successRates.push(
        dayResults.length > 0
          ? (dayResults.filter((r) => r.success).length / dayResults.length) * 100
          : 0
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { labels: dates, successRates };
  }

  private static groupByStatusCode(results: TestResult[]): Record<string, number> {
    return results.reduce((acc, result) => {
      const statusCode = result.statusCode.toString();
      acc[statusCode] = (acc[statusCode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private static calculateResponseTimeDistribution(
    results: TestResult[]
  ): { labels: string[]; data: number[] } {
    const ranges = [
      '0-100ms',
      '100-300ms',
      '300-500ms',
      '500ms-1s',
      '1s-2s',
      '2s+'
    ];
    
    const distribution = new Array(ranges.length).fill(0);

    results.forEach((result) => {
      const duration = result.duration;
      if (duration <= 100) distribution[0]++;
      else if (duration <= 300) distribution[1]++;
      else if (duration <= 500) distribution[2]++;
      else if (duration <= 1000) distribution[3]++;
      else if (duration <= 2000) distribution[4]++;
      else distribution[5]++;
    });

    return {
      labels: ranges,
      data: distribution
    };
  }
}

export default TestHistoryService;