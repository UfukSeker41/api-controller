import { ApiDetails } from '@/types/api';

export const sampleApis: ApiDetails[] = [
  {
    id: 'openweather',
    name: 'OpenWeather API',
    version: '2.5',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    description: 'Global weather data and forecasts with various weather parameters',
    categories: ['weather', 'maps'],
    authentication: {
      type: 'apiKey',
      location: 'query',
      paramName: 'appid',
      instructions: 'Sign up at openweathermap.org to get API key'
    },
    provider: {
      name: 'OpenWeather',
      website: 'https://openweathermap.org',
      email: 'support@openweathermap.org'
    },
    pricing: {
      type: 'freemium',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['60 calls/minute', 'Current weather', 'Daily forecast'],
          rateLimit: {
            requests: 60,
            period: 'minute',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.9,
      lastChecked: new Date().toISOString(),
      responseTime: 150,
      incidents: []
    },
    stats: {
      totalCalls: 1000000,
      failureRate: 0.5,
      avgResponseTime: 180,
      lastDayUsage: 5000
    },
    documentation: {
      overview: 'OpenWeather API provides comprehensive weather data access',
      gettingStarted: [
        {
          title: 'Authentication',
          content: 'Sign up and get your API key',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'API Key',
          content: 'Add your API key as appid query parameter',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Basic Request',
          content: 'curl example',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Invalid API key',
          description: 'Please check your API key'
        }
      ],
      changelog: [
        {
          version: '2.5',
          date: '2023-01-01',
          changes: ['Added new endpoints', 'Improved response time']
        }
      ]
    },
    rateLimit: {
      requests: 60,
      period: 'minute',
      cost: 0
    },
    tags: ['weather', 'forecast', 'maps', 'climate'],
    lastUpdated: new Date().toISOString(),
    popularity: 85,
    rating: {
      score: 4.5,
      count: 1200,
      reviews: [
        {
          user: 'john_dev',
          rating: 5,
          comment: 'Great API with reliable data',
          date: '2023-06-15'
        }
      ]
    },
    endpoints: [
      {
        id: 'openweather-current',
        name: 'Current Weather',
        method: 'GET',
        path: '/weather',
        description: 'Get current weather data for a specific location',
        parameters: [
          {
            name: 'q',
            type: 'string',
            required: true,
            description: 'City name'
          },
          {
            name: 'units',
            type: 'string',
            required: false,
            description: 'Units of measurement',
            options: ['standard', 'metric', 'imperial'],
            default: 'standard'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'Successful response',
            example: {
              main: {
                temp: 15.3,
                humidity: 72
              },
              weather: [{
                main: 'Rain',
                description: 'light rain'
              }]
            }
          },
          401: {
            code: 401,
            description: 'Invalid API key'
          }
        },
        examples: [
          {
            title: 'Get London Weather',
            request: {
              url: '/weather?q=London&units=metric',
              headers: {
                'Accept': 'application/json'
              }
            },
            response: {
              main: {
                temp: 15.3,
                humidity: 72
              },
              weather: [{
                main: 'Rain',
                description: 'light rain'
              }]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe API',
    version: '2020-08-27',
    baseUrl: 'https://api.stripe.com/v1',
    description: 'Process payments and manage financial products',
    categories: ['payment', 'finance'],
    authentication: {
      type: 'apiKey',
      location: 'header',
      paramName: 'Authorization',
      instructions: 'Use your Stripe secret key with Basic auth'
    },
    provider: {
      name: 'Stripe',
      website: 'https://stripe.com',
      email: 'support@stripe.com'
    },
    pricing: {
      type: 'paid',
      plans: [
        {
          name: 'Standard',
          price: 0,
          period: 'monthly',
          features: ['Pay per transaction', '2.9% + $0.30 per successful charge'],
          rateLimit: {
            requests: 100,
            period: 'second',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.98,
      lastChecked: new Date().toISOString(),
      responseTime: 100,
      incidents: []
    },
    stats: {
      totalCalls: 5000000,
      failureRate: 0.1,
      avgResponseTime: 120,
      lastDayUsage: 15000
    },
    documentation: {
      overview: 'Stripe provides APIs for processing payments and managing financial products',
      gettingStarted: [
        {
          title: 'Authentication',
          content: 'Use your secret key for authentication',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'API Key',
          content: 'Add your secret key in Authorization header',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Create Payment',
          content: 'curl example',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Invalid API key',
          description: 'Please check your API key'
        }
      ],
      changelog: [
        {
          version: '2020-08-27',
          date: '2020-08-27',
          changes: ['New API version', 'Added Payment Intent API']
        }
      ]
    },
    rateLimit: {
      requests: 100,
      period: 'second',
      cost: 0
    },
    tags: ['payments', 'finance', 'credit-cards', 'banking'],
    lastUpdated: new Date().toISOString(),
    popularity: 95,
    rating: {
      score: 4.8,
      count: 2500,
      reviews: [
        {
          user: 'payment_pro',
          rating: 5,
          comment: 'Best payment processing API',
          date: '2023-07-20'
        }
      ]
    },
    endpoints: [
      {
        id: 'stripe-payment-intent',
        name: 'Create Payment Intent',
        method: 'POST',
        path: '/payment_intents',
        description: 'Create a PaymentIntent for handling payment flows',
        parameters: [
          {
            name: 'amount',
            type: 'number',
            required: true,
            description: 'Amount in smallest currency unit (e.g., cents)'
          },
          {
            name: 'currency',
            type: 'string',
            required: true,
            description: 'Three-letter ISO currency code'
          },
          {
            name: 'payment_method_types[]',
            type: 'array',
            required: true,
            description: 'Payment method types to accept'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'PaymentIntent created',
            example: {
              id: "pi_1234567890",
              amount: 2000,
              currency: "usd",
              status: "requires_payment_method"
            }
          },
          401: {
            code: 401,
            description: 'Invalid API key'
          }
        },
        examples: [
          {
            title: 'Create a Payment Intent',
            request: {
              url: '/payment_intents',
              headers: {
                'Authorization': 'Bearer sk_test_123',
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            },
            response: {
              id: "pi_1234567890",
              amount: 2000,
              currency: "usd",
              status: "requires_payment_method"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'coingecko',
    name: 'CoinGecko API',
    version: '3',
    baseUrl: 'https://api.coingecko.com/api/v3',
    description: 'Cryptocurrency data and market information',
    categories: ['finance'],
    authentication: {
      type: 'none'
    },
    provider: {
      name: 'CoinGecko',
      website: 'https://coingecko.com',
      email: 'hello@coingecko.com'
    },
    pricing: {
      type: 'freemium',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['50 calls/minute', 'Basic cryptocurrency data'],
          rateLimit: {
            requests: 50,
            period: 'minute',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.95,
      lastChecked: new Date().toISOString(),
      responseTime: 180,
      incidents: []
    },
    stats: {
      totalCalls: 3000000,
      failureRate: 0.3,
      avgResponseTime: 220,
      lastDayUsage: 8000
    },
    documentation: {
      overview: 'CoinGecko provides cryptocurrency data and market information',
      gettingStarted: [
        {
          title: 'Getting Started',
          content: 'No authentication required for basic usage',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'No Auth',
          content: 'Free tier requires no authentication',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Get Bitcoin Price',
          content: 'curl example',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 429,
          message: 'Too Many Requests',
          description: 'Rate limit exceeded'
        }
      ],
      changelog: [
        {
          version: '3.0',
          date: '2023-01-01',
          changes: ['Added new endpoints', 'Improved rate limits']
        }
      ]
    },
    rateLimit: {
      requests: 50,
      period: 'minute',
      cost: 0
    },
    tags: ['cryptocurrency', 'bitcoin', 'market-data', 'finance'],
    lastUpdated: new Date().toISOString(),
    popularity: 80,
    rating: {
      score: 4.3,
      count: 800,
      reviews: [
        {
          user: 'crypto_trader',
          rating: 4,
          comment: 'Great free crypto data API',
          date: '2023-05-10'
        }
      ]
    },
    endpoints: [
      {
        id: 'coingecko-coins-list',
        name: 'Get Coin List',
        method: 'GET',
        path: '/coins/list',
        description: 'List all supported coins with id, name, and symbol',
        parameters: [],
        responses: {
          200: {
            code: 200,
            description: 'Successful response',
            example: [
              {
                id: 'bitcoin',
                symbol: 'btc',
                name: 'Bitcoin'
              }
            ]
          }
        },
        examples: [
          {
            title: 'Get Coin List',
            request: {
              url: '/coins/list',
              headers: {
                'Accept': 'application/json'
              }
            },
            response: [
              {
                id: 'bitcoin',
                symbol: 'btc',
                name: 'Bitcoin'
              }
            ]
          }
        ]
      },
      {
        id: 'get-coin-price',
        name: 'Get Coin Price',
        method: 'GET',
        path: '/simple/price',
        description: 'Get current price of coins in the requested currencies',
        parameters: [
          {
            name: 'ids',
            type: 'string',
            required: true,
            description: 'Comma-separated cryptocurrency ids'
          },
          {
            name: 'vs_currencies',
            type: 'string',
            required: true,
            description: 'Comma-separated target currencies'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'Successful response',
            example: {
              bitcoin: {
                usd: 45123.45
              }
            }
          }
        },
        examples: [
          {
            title: 'Get Bitcoin Price in USD',
            request: {
              url: '/simple/price?ids=bitcoin&vs_currencies=usd',
              headers: {
                'Accept': 'application/json'
              }
            },
            response: {
              bitcoin: {
                usd: 45123.45
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub REST API',
    version: '3',
    baseUrl: 'https://api.github.com',
    description: 'Access GitHub resources and perform actions programmatically',
    categories: ['developer-tools', 'social'],
    authentication: {
      type: 'OAuth',
      location: 'header',
      paramName: 'Authorization',
      instructions: 'Create a GitHub OAuth App and obtain access token'
    },
    provider: {
      name: 'GitHub',
      website: 'https://github.com',
      email: 'support@github.com'
    },
    pricing: {
      type: 'freemium',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['5000 requests/hour', 'Public repo access'],
          rateLimit: {
            requests: 5000,
            period: 'hour',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.95,
      lastChecked: new Date().toISOString(),
      responseTime: 120,
      incidents: []
    },
    stats: {
      totalCalls: 10000000,
      failureRate: 0.2,
      avgResponseTime: 200,
      lastDayUsage: 20000
    },
    documentation: {
      overview: 'GitHub REST API provides programmatic access to GitHub resources',
      gettingStarted: [
        {
          title: 'Authentication',
          content: 'Create OAuth app and get token',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'OAuth',
          content: 'Use token in Authorization header',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'List Repositories',
          content: 'curl example',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Unauthorized',
          description: 'Authentication required'
        }
      ],
      changelog: [
        {
          version: '3.0',
          date: '2023-01-01',
          changes: ['GraphQL API improvements', 'New endpoints']
        }
      ]
    },
    rateLimit: {
      requests: 5000,
      period: 'hour',
      cost: 0
    },
    tags: ['git', 'version-control', 'developer-tools', 'repositories'],
    lastUpdated: new Date().toISOString(),
    popularity: 90,
    rating: {
      score: 4.7,
      count: 3000,
      reviews: [
        {
          user: 'dev_master',
          rating: 5,
          comment: 'Excellent API documentation and reliability',
          date: '2023-08-01'
        }
      ]
    },
    endpoints: [
      {
        id: 'list-repositories',
        name: 'List Repositories',
        method: 'GET',
        path: '/user/repos',
        description: 'List repositories for the authenticated user',
        parameters: [
          {
            name: 'visibility',
            type: 'string',
            required: false,
            description: 'Filter by repository visibility',
            options: ['all', 'public', 'private'],
            default: 'all'
          },
          {
            name: 'sort',
            type: 'string',
            required: false,
            description: 'Sort by field',
            options: ['created', 'updated', 'pushed', 'full_name'],
            default: 'full_name'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'List of repositories',
            example: [
              {
                id: 1296269,
                name: "Hello-World",
                full_name: "octocat/Hello-World",
                private: false,
                html_url: "https://github.com/octocat/Hello-World"
              }
            ]
          },
          401: {
            code: 401,
            description: 'Requires authentication'
          }
        },
        examples: [
          {
            title: 'List Public Repositories',
            request: {
              url: '/user/repos?visibility=public&sort=created',
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'Bearer YOUR-TOKEN'
              }
            },
            response: [
              {
                id: 1296269,
                name: "Hello-World",
                full_name: "octocat/Hello-World",
                private: false,
                html_url: "https://github.com/octocat/Hello-World"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify Web API',
    version: '1',
    baseUrl: 'https://api.spotify.com/v1',
    description: 'Access Spotify music data and control playback',
    categories: ['music', 'streaming'],
    authentication: {
      type: 'OAuth',
      location: 'header',
      paramName: 'Authorization',
      instructions: 'Register your application and implement OAuth 2.0 flow'
    },
    provider: {
      name: 'Spotify',
      website: 'https://spotify.com',
      email: 'support@spotify.com'
    },
    pricing: {
      type: 'freemium',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['Web API access', 'Rate limits apply'],
          rateLimit: {
            requests: 30,
            period: 'second',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.9,
      lastChecked: new Date().toISOString(),
      responseTime: 150,
      incidents: []
    },
    stats: {
      totalCalls: 8000000,
      failureRate: 0.3,
      avgResponseTime: 170,
      lastDayUsage: 25000
    },
    documentation: {
      overview: 'Spotify Web API lets you access music data and control playback',
      gettingStarted: [
        {
          title: 'Authentication',
          content: 'Implement OAuth 2.0 flow',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'OAuth 2.0',
          content: 'Get access token and use in header',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Search Tracks',
          content: 'curl example',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Unauthorized',
          description: 'Invalid access token'
        }
      ],
      changelog: [
        {
          version: '1.0',
          date: '2023-01-01',
          changes: ['Enhanced search features', 'New player endpoints']
        }
      ]
    },
    rateLimit: {
      requests: 30,
      period: 'second',
      cost: 0
    },
    tags: ['music', 'streaming', 'audio', 'playlists'],
    lastUpdated: new Date().toISOString(),
    popularity: 88,
    rating: {
      score: 4.6,
      count: 2000,
      reviews: [
        {
          user: 'music_lover',
          rating: 5,
          comment: 'Comprehensive music data access',
          date: '2023-09-15'
        }
      ]
    },
    endpoints: [
      {
        id: 'search-items',
        name: 'Search Items',
        method: 'GET',
        path: '/search',
        description: 'Search for albums, artists, playlists, tracks, shows or episodes',
        parameters: [
          {
            name: 'q',
            type: 'string',
            required: true,
            description: 'Search query keywords'
          },
          {
            name: 'type',
            type: 'string',
            required: true,
            description: 'Item types to search across',
            options: ['album', 'artist', 'playlist', 'track']
          },
          {
            name: 'limit',
            type: 'number',
            required: false,
            description: 'Maximum number of results',
            default: '20'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'Search results',
            example: {
              tracks: {
                items: [
                  {
                    name: "Shape of You",
                    artists: [{ name: "Ed Sheeran" }],
                    album: { name: "÷ (Divide)" }
                  }
                ]
              }
            }
          },
          401: {
            code: 401,
            description: 'Invalid access token'
          }
        },
        examples: [
          {
            title: 'Search for a Track',
            request: {
              url: '/search?q=shape+of+you&type=track',
              headers: {
                'Authorization': 'Bearer YOUR-TOKEN'
              }
            },
            response: {
              tracks: {
                items: [
                  {
                    name: "Shape of You",
                    artists: [{ name: "Ed Sheeran" }],
                    album: { name: "÷ (Divide)" }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub REST API',
    logo: '🐙',
    version: '2022-11-28',
    baseUrl: 'https://api.github.com',
    description: 'Access GitHub repositories, users, issues, and pull requests programmatically',
    categories: ['developer', 'tools'],
    authentication: {
      type: 'apiKey',
      location: 'header',
      paramName: 'Authorization',
      instructions: 'Create personal access token from GitHub settings'
    },
    provider: {
      name: 'GitHub Inc.',
      website: 'https://github.com',
      email: 'support@github.com'
    },
    pricing: {
      type: 'free',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['5000 requests/hour', 'Full API access', 'Webhooks'],
          rateLimit: {
            requests: 5000,
            period: 'hour',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.95,
      lastChecked: new Date().toISOString(),
      responseTime: 120,
      incidents: []
    },
    stats: {
      totalCalls: 50000000,
      failureRate: 0.05,
      avgResponseTime: 135,
      lastDayUsage: 250000
    },
    documentation: {
      overview: 'GitHub REST API allows you to create integrations and retrieve data from GitHub',
      gettingStarted: [
        {
          title: 'Authentication',
          content: 'Use personal access tokens for authentication',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'Bearer Token',
          content: 'Add Authorization header with Bearer token',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'List Repositories',
          content: 'curl -H "Authorization: Bearer TOKEN" https://api.github.com/user/repos',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Bad credentials',
          description: 'Invalid authentication token'
        }
      ],
      changelog: [
        {
          version: '2022-11-28',
          date: '2022-11-28',
          changes: ['New endpoints for discussions', 'Improved rate limiting']
        }
      ]
    },
    rateLimit: {
      requests: 5000,
      period: 'hour',
      cost: 0
    },
    tags: ['git', 'repositories', 'version-control', 'developer-tools'],
    lastUpdated: new Date().toISOString(),
    popularity: 95,
    rating: {
      score: 4.8,
      count: 8900,
      reviews: [
        {
          user: 'dev_mike',
          rating: 5,
          comment: 'Essential API for any developer',
          date: '2024-01-10'
        }
      ]
    },
    endpoints: [
      {
        id: 'github-repos',
        name: 'List User Repositories',
        method: 'GET',
        path: '/users/{username}/repos',
        description: 'List public repositories for a user',
        parameters: [
          {
            name: 'username',
            type: 'string',
            required: true,
            description: 'GitHub username'
          },
          {
            name: 'type',
            type: 'string',
            required: false,
            description: 'Type of repos to list',
            options: ['all', 'owner', 'member'],
            default: 'owner'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'List of repositories',
            example: [
              {
                id: 1296269,
                name: 'Hello-World',
                full_name: 'octocat/Hello-World',
                private: false
              }
            ]
          },
          404: {
            code: 404,
            description: 'User not found'
          }
        },
        examples: [
          {
            title: 'Get Octocat Repos',
            request: {
              url: '/users/octocat/repos',
              headers: {
                'Accept': 'application/vnd.github+json'
              }
            },
            response: [
              {
                id: 1296269,
                name: 'Hello-World',
                full_name: 'octocat/Hello-World'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'unsplash',
    name: 'Unsplash API',
    logo: '📷',
    version: '1.0',
    baseUrl: 'https://api.unsplash.com',
    description: 'Access to millions of high-quality, free stock photos and user data',
    categories: ['media', 'images'],
    authentication: {
      type: 'apiKey',
      location: 'header',
      paramName: 'Authorization',
      instructions: 'Register app at unsplash.com/developers'
    },
    provider: {
      name: 'Unsplash Inc.',
      website: 'https://unsplash.com',
      email: 'help@unsplash.com'
    },
    pricing: {
      type: 'free',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['50 requests/hour', 'Commercial use', 'High-resolution photos'],
          rateLimit: {
            requests: 50,
            period: 'hour',
            cost: 0
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.8,
      lastChecked: new Date().toISOString(),
      responseTime: 180,
      incidents: []
    },
    stats: {
      totalCalls: 8000000,
      failureRate: 0.2,
      avgResponseTime: 200,
      lastDayUsage: 45000
    },
    documentation: {
      overview: 'Unsplash API provides access to beautiful free photos for your projects',
      gettingStarted: [
        {
          title: 'Get Access Key',
          content: 'Register your application to get access key',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'Client-ID',
          content: 'Add Authorization header with Client-ID',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Search Photos',
          content: 'curl -H "Authorization: Client-ID YOUR_KEY" https://api.unsplash.com/search/photos?query=nature',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 401,
          message: 'Unauthorized',
          description: 'Invalid access key'
        }
      ],
      changelog: [
        {
          version: '1.0',
          date: '2023-01-01',
          changes: ['Initial release', 'Photo search and download']
        }
      ]
    },
    rateLimit: {
      requests: 50,
      period: 'hour',
      cost: 0
    },
    tags: ['photos', 'images', 'stock', 'free', 'high-quality'],
    lastUpdated: new Date().toISOString(),
    popularity: 78,
    rating: {
      score: 4.7,
      count: 2100,
      reviews: [
        {
          user: 'designer_anna',
          rating: 5,
          comment: 'Amazing quality photos, easy API',
          date: '2024-02-05'
        }
      ]
    },
    endpoints: [
      {
        id: 'unsplash-search',
        name: 'Search Photos',
        method: 'GET',
        path: '/search/photos',
        description: 'Search for photos by keyword',
        parameters: [
          {
            name: 'query',
            type: 'string',
            required: true,
            description: 'Search keywords'
          },
          {
            name: 'per_page',
            type: 'number',
            required: false,
            description: 'Number of results per page',
            default: '10'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'Search results',
            example: {
              total: 133,
              results: [
                {
                  id: 'abc123',
                  urls: {
                    regular: 'https://images.unsplash.com/photo-abc',
                    small: 'https://images.unsplash.com/photo-abc?w=400'
                  }
                }
              ]
            }
          },
          401: {
            code: 401,
            description: 'Unauthorized'
          }
        },
        examples: [
          {
            title: 'Search Nature Photos',
            request: {
              url: '/search/photos?query=nature&per_page=10',
              headers: {
                'Authorization': 'Client-ID YOUR_ACCESS_KEY'
              }
            },
            response: {
              total: 133,
              results: [
                {
                  id: 'abc123',
                  description: 'Beautiful nature photo'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'exchangerate',
    name: 'ExchangeRate API',
    logo: '💱',
    version: '6.0',
    baseUrl: 'https://v6.exchangerate-api.com/v6',
    description: 'Real-time and historical currency exchange rates for 160+ currencies',
    categories: ['finance', 'currency'],
    authentication: {
      type: 'apiKey',
      location: 'query',
      paramName: 'apikey',
      instructions: 'Sign up for free API key'
    },
    provider: {
      name: 'ExchangeRate-API',
      website: 'https://www.exchangerate-api.com',
      email: 'support@exchangerate-api.com'
    },
    pricing: {
      type: 'freemium',
      plans: [
        {
          name: 'Free',
          price: 0,
          period: 'monthly',
          features: ['1,500 requests/month', '160+ currencies', 'Daily updates'],
          rateLimit: {
            requests: 1500,
            period: 'month',
            cost: 0
          }
        },
        {
          name: 'Pro',
          price: 9.99,
          period: 'monthly',
          features: ['100,000 requests/month', 'Hourly updates', 'Historical data'],
          rateLimit: {
            requests: 100000,
            period: 'month',
            cost: 9.99
          }
        }
      ]
    },
    status: {
      isActive: true,
      uptime: 99.9,
      lastChecked: new Date().toISOString(),
      responseTime: 95,
      incidents: []
    },
    stats: {
      totalCalls: 15000000,
      failureRate: 0.1,
      avgResponseTime: 110,
      lastDayUsage: 85000
    },
    documentation: {
      overview: 'Get accurate currency exchange rates with simple REST API',
      gettingStarted: [
        {
          title: 'Quick Start',
          content: 'Get your free API key and start making requests',
          language: 'text'
        }
      ],
      authentication: [
        {
          title: 'API Key',
          content: 'Include API key in URL path',
          language: 'text'
        }
      ],
      examples: [
        {
          title: 'Get USD Rates',
          content: 'curl https://v6.exchangerate-api.com/v6/YOUR_KEY/latest/USD',
          language: 'bash'
        }
      ],
      errors: [
        {
          code: 403,
          message: 'Invalid API key',
          description: 'Check your API key'
        }
      ],
      changelog: [
        {
          version: '6.0',
          date: '2023-06-01',
          changes: ['New v6 endpoint', 'Faster response times']
        }
      ]
    },
    rateLimit: {
      requests: 1500,
      period: 'month',
      cost: 0
    },
    tags: ['currency', 'exchange', 'forex', 'rates', 'finance'],
    lastUpdated: new Date().toISOString(),
    popularity: 82,
    rating: {
      score: 4.6,
      count: 3400,
      reviews: [
        {
          user: 'trader_joe',
          rating: 5,
          comment: 'Accurate rates, reliable service',
          date: '2024-01-20'
        }
      ]
    },
    endpoints: [
      {
        id: 'exchangerate-latest',
        name: 'Latest Rates',
        method: 'GET',
        path: '/{api-key}/latest/{base}',
        description: 'Get latest exchange rates for a base currency',
        parameters: [
          {
            name: 'base',
            type: 'string',
            required: true,
            description: 'Base currency code (e.g., USD, EUR)',
            default: 'USD'
          }
        ],
        responses: {
          200: {
            code: 200,
            description: 'Latest exchange rates',
            example: {
              result: 'success',
              base_code: 'USD',
              conversion_rates: {
                EUR: 0.92,
                GBP: 0.79,
                JPY: 149.50
              }
            }
          },
          403: {
            code: 403,
            description: 'Invalid API key'
          }
        },
        examples: [
          {
            title: 'Get USD Rates',
            request: {
              url: '/YOUR_KEY/latest/USD',
              headers: {}
            },
            response: {
              result: 'success',
              base_code: 'USD',
              conversion_rates: {
                EUR: 0.92,
                GBP: 0.79
              }
            }
          }
        ]
      }
    ]
  }
];
