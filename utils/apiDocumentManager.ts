import { ApiDetails } from '../types/api';
import { 
  ApiDocumentFormat, 
  ImportOptions, 
  ExportOptions, 
  ApiExportDocument,
  ApiDocumentMetadata 
} from '../types/importExport';
import { saveAs } from 'file-saver';
import yaml from 'js-yaml';

export class ApiDocumentManager {
  private static convertToSwagger(apis: ApiDetails[]): any {
    // Swagger/OpenAPI dönüşüm mantığı
    return {
      swagger: '2.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0'
      },
      paths: apis.reduce((acc: { [key: string]: any }, api) => {
        api.endpoints.forEach(endpoint => {
          acc[endpoint.path] = {
            [endpoint.method.toLowerCase()]: {
              summary: endpoint.name,
              description: endpoint.description,
              parameters: endpoint.parameters,
              responses: endpoint.responses
            }
          };
        });
        return acc;
      }, {})
    };
  }

  private static convertToPostman(apis: ApiDetails[]): any {
    // Postman koleksiyon dönüşüm mantığı
    return {
      info: {
        name: 'API Collection',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
      },
      item: apis.flatMap(api => 
        api.endpoints.map(endpoint => ({
          name: endpoint.name,
          request: {
            method: endpoint.method,
            url: {
              raw: api.baseUrl + endpoint.path,
              host: [api.baseUrl],
              path: endpoint.path.split('/').filter(p => p)
            },
            description: endpoint.description,
            header: [],
            body: endpoint.examples[0]?.request || {}
          }
        }))
      )
    };
  }

  static async importApis(file: File, options: ImportOptions): Promise<ApiDetails[]> {
    const content = await file.text();
    let data: any;

    try {
      switch (options.format) {
        case 'json':
          data = JSON.parse(content);
          break;
        case 'yaml':
          data = yaml.load(content);
          break;
        case 'swagger':
        case 'openapi':
          data = JSON.parse(content);
          // Swagger/OpenAPI'den API formatına dönüştür
          const paths = Object.entries(data.paths);
          return paths.map(([path, methods]: [string, any]) => {
            const endpoints = Object.entries(methods).map(([method, spec]: [string, any]) => ({
              id: `${path}-${method}`.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
              name: spec.summary || path,
              method: method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
              path,
              description: spec.description || '',
              parameters: spec.parameters || [],
              responses: spec.responses || {},
              examples: []
            }));

            return {
              id: path,
              name: data.info.title || path,
              version: data.info.version || '1.0.0',
              baseUrl: data.host || '',
              description: data.info.description || '',
              categories: [],
              provider: {
                name: data.info.contact?.name || '',
                website: data.info.contact?.url || '',
                email: data.info.contact?.email || ''
              },
              authentication: {
                type: 'none'
              },
              endpoints,
              pricing: {
                type: 'free'
              },
              status: {
                isActive: true,
                uptime: 100,
                lastChecked: new Date().toISOString(),
                responseTime: 0,
                incidents: []
              },
              stats: {
                totalCalls: 0,
                failureRate: 0,
                avgResponseTime: 0
              },
              documentation: {
                overview: data.info.description || '',
                gettingStarted: [
                  {
                    title: 'Introduction',
                    content: data.info.description || '',
                  }
                ],
                authentication: [
                  {
                    title: 'Authentication',
                    content: data.securityDefinitions ? JSON.stringify(data.securityDefinitions, null, 2) : 'No authentication required',
                  }
                ],
                examples: [
                {
                  title: 'Sample Request',
                  content: 'Example request using this API',
                  code: '// No sample code available',
                  language: 'javascript'
                }
              ],
                errors: Object.entries(data.responses || {})
                  .filter(([code]) => parseInt(code) >= 400)
                  .map(([code, spec]: [string, any]) => ({
                    code: parseInt(code),
                    message: spec.description || '',
                    description: spec.schema ? JSON.stringify(spec.schema, null, 2) : ''
                  })),
                changelog: []
              },
              rateLimit: {
                requests: 0,
                period: 'day',
                cost: 0
              },
              tags: [],
              lastUpdated: new Date().toISOString(),
              popularity: 0,
              rating: {
                score: 0,
                count: 0,
                reviews: []
              }
            };
          });
        case 'postman':
          data = JSON.parse(content);
          // Postman koleksiyonundan API formatına dönüştür
          return data.item.map((item: any) => ({
            id: item.id || item.name,
            name: item.name,
            version: '1.0.0',
            baseUrl: item.request.url.host?.[0] || '',
            description: item.request.description || '',
            categories: [],
            provider: {
              name: data.info.name || '',
              website: ''
            },
            authentication: {
              type: 'none'
            },
            endpoints: [{
              name: item.name,
              method: item.request.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
              path: item.request.url.path?.join('/') || '',
              description: item.request.description || '',
              parameters: item.request.url.query || [],
              responses: {},
              examples: []
            }],
            pricing: {
              type: 'free'
            },
            status: {
              isActive: true,
              uptime: 100,
              lastChecked: new Date().toISOString(),
              responseTime: 0,
              incidents: []
            },
            stats: {
              totalCalls: 0,
              failureRate: 0,
              avgResponseTime: 0
            },
            documentation: {
              swagger: null,
              markdown: ''
            },
            rateLimit: {
              requests: 0,
              period: 'unlimited'
            },
            tags: [],
            lastUpdated: new Date().toISOString(),
            popularity: 0,
            rating: {
              score: 0,
              count: 0,
              reviews: []
            }
          }));
        default:
          throw new Error('Unsupported format');
      }
    } catch (error) {
      console.error('Import error:', error);
      throw new Error('Failed to parse imported file');
    }

    return data.apis || [];
  }

  static async exportApis(apis: ApiDetails[], options: ExportOptions): Promise<void> {
    const metadata: ApiDocumentMetadata = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      format: options.format,
      apiCount: apis.length
    };

    let content: any = {
      metadata,
      apis
    };

    if (options.includeTests) {
      content.tests = []; // Test verilerini ekle
    }

    if (options.includeHistory) {
      content.history = []; // Test geçmişini ekle
    }

    let output: string;
    let fileName = options.fileName || `api-documentation.${options.format}`;

    switch (options.format) {
      case 'json':
        output = JSON.stringify(content, null, 2);
        break;
      case 'yaml':
        output = yaml.dump(content);
        break;
      case 'swagger':
      case 'openapi':
        output = JSON.stringify(this.convertToSwagger(apis), null, 2);
        break;
      case 'postman':
        output = JSON.stringify(this.convertToPostman(apis), null, 2);
        break;
      default:
        throw new Error('Unsupported format');
    }

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  }
}