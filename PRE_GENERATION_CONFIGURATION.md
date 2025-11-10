# Pre-Generation Configuration Guide

**What Should Be Configured BEFORE Feature Development**

---

## The Critical Question

**Where's the line between setup and implementation?**

```
firebase-architect (Setup)          Claude Code (Features)
        ↓                                   ↓
    Configure                          Implement
    Integrate                          Build
    Initialize                         Create
```

---

## 1. AI Services Integration ⭐ HIGH PRIORITY

### Problem
If user wants AI copilot, chat, or ML features, these services need configuration BEFORE feature development.

### What Should Be Configured at Generation:

#### **A. OpenAI Integration**
```javascript
// In architecture object:
{
  aiServices: {
    openai: {
      enabled: true,
      models: ['gpt-4', 'gpt-3.5-turbo'],
      features: ['chat', 'completion', 'embedding'],
      rateLimit: {
        requestsPerMinute: 60,
        tokensPerMinute: 90000
      }
    }
  }
}
```

**What gets generated:**
- Environment variables: `OPENAI_API_KEY`
- SDK wrapper in `packages/core/src/ai/openai.ts`
- Rate limiting middleware
- Error handling utilities
- Token counting helpers
- Streaming response handlers

**Generated wrapper example:**
```typescript
// packages/core/src/ai/openai.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatCompletion(messages: any[], options = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      ...options
    });
    return response.choices[0].message;
  } catch (error) {
    // Error handling
    throw new AIServiceError('OpenAI API failed', error);
  }
}

export async function streamChatCompletion(messages: any[], onChunk: (text: string) => void) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    stream: true
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    onChunk(text);
  }
}
```

#### **B. Claude API Integration**
```javascript
{
  aiServices: {
    anthropic: {
      enabled: true,
      models: ['claude-3-opus', 'claude-3-sonnet'],
      features: ['chat', 'analysis', 'code-generation']
    }
  }
}
```

**Generated wrapper:**
```typescript
// packages/core/src/ai/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getClaudeResponse(messages: any[], options = {}) {
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 4096,
    messages,
    ...options
  });
  return response.content[0].text;
}
```

#### **C. Gemini Integration**
```javascript
{
  aiServices: {
    gemini: {
      enabled: true,
      models: ['gemini-pro', 'gemini-pro-vision'],
      features: ['chat', 'vision', 'embedding']
    }
  }
}
```

#### **D. Embeddings & Vector Search**
```javascript
{
  aiServices: {
    vectorSearch: {
      provider: 'pinecone', // or 'weaviate', 'qdrant'
      dimensions: 1536,
      features: ['semantic-search', 'similarity', 'recommendations']
    }
  }
}
```

**Generated:**
- Pinecone client setup
- Embedding generation utilities
- Vector upsert/query functions
- Semantic search helpers

---

## 2. Authentication Providers ⭐ HIGH PRIORITY

### Current State
Tool only sets up basic email/password auth.

### Should Add:

```javascript
{
  authentication: {
    providers: [
      'email',
      'google',
      'apple',
      'microsoft',
      'github',
      'phone'  // SMS-based
    ],
    features: {
      emailVerification: true,
      phoneVerification: true,
      multiFactorAuth: true,
      socialLinking: true,
      anonymousAuth: true
    },
    customClaims: ['role', 'subscription', 'permissions']
  }
}
```

**What gets generated:**
- OAuth configuration for each provider
- Sign-in methods enabled in Firebase
- Custom claims Cloud Function
- Auth state persistence setup
- MFA enrollment functions
- Social account linking utilities

**Generated auth utilities:**
```typescript
// packages/data/src/auth/providers.ts

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider);
}

export async function linkWithGoogle(user: User) {
  const provider = new GoogleAuthProvider();
  return linkWithPopup(user, provider);
}

export async function enableMFA(user: User, phoneNumber: string) {
  // MFA enrollment flow
}
```

---

## 3. Payment Processing Integration

### Stripe Configuration

```javascript
{
  payments: {
    stripe: {
      enabled: true,
      features: [
        'subscriptions',
        'one-time-payments',
        'invoicing',
        'payment-intents',
        'customer-portal'
      ],
      products: [
        {
          name: 'Pro Plan',
          price: 9.99,
          interval: 'month',
          features: ['feature1', 'feature2']
        }
      ],
      webhooks: [
        'payment_intent.succeeded',
        'customer.subscription.created',
        'customer.subscription.deleted',
        'invoice.payment_failed'
      ]
    }
  }
}
```

**What gets generated:**
- Stripe SDK initialization (client & server)
- Payment intent Cloud Functions
- Webhook handler functions
- Customer portal URL generation
- Subscription management utilities
- Invoice generation helpers

**Generated functions:**
```typescript
// apps/functions/src/stripe.ts

export const createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Verify auth
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated');
  }

  const { amount, currency = 'usd' } = data;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: context.auth.uid,
    metadata: { userId: context.auth.uid }
  });

  return { clientSecret: paymentIntent.client_secret };
});

export const handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;
  }

  res.json({ received: true });
});
```

---

## 4. Email & Notification Services

### SendGrid / Mailgun Configuration

```javascript
{
  notifications: {
    email: {
      provider: 'sendgrid', // or 'mailgun', 'ses'
      enabled: true,
      templates: [
        'welcome',
        'password-reset',
        'subscription-renewal',
        'weekly-digest',
        'alert'
      ],
      features: {
        transactional: true,
        marketing: false,
        scheduling: true
      }
    },
    sms: {
      provider: 'twilio',
      enabled: true,
      features: ['otp', 'alerts', 'reminders']
    },
    push: {
      enabled: true,
      platforms: ['web', 'ios', 'android'],
      providers: ['fcm'] // Firebase Cloud Messaging
    }
  }
}
```

**What gets generated:**
- Email template system
- Transactional email Cloud Functions
- SMS sending utilities
- Push notification setup
- Notification preferences management

**Generated email system:**
```typescript
// apps/functions/src/email/sendgrid.ts

export async function sendTemplateEmail(
  to: string,
  templateId: string,
  dynamicData: any
) {
  const msg = {
    to,
    from: 'noreply@yourapp.com',
    templateId,
    dynamicTemplateData: dynamicData
  };

  await sendgrid.send(msg);
}

export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  await sendTemplateEmail(
    user.email!,
    'welcome-template-id',
    {
      displayName: user.displayName,
      verificationLink: generateVerificationLink(user.uid)
    }
  );
});
```

---

## 5. File Upload & Storage Configuration

### Advanced Storage Setup

```javascript
{
  storage: {
    buckets: [
      {
        name: 'user-uploads',
        path: 'uploads/{userId}/{filename}',
        maxSize: '10MB',
        allowedTypes: ['image/*', 'application/pdf']
      },
      {
        name: 'profile-images',
        path: 'profiles/{userId}/avatar.{ext}',
        maxSize: '2MB',
        allowedTypes: ['image/jpeg', 'image/png'],
        transforms: [
          { name: 'thumbnail', width: 150, height: 150 },
          { name: 'medium', width: 500, height: 500 }
        ]
      }
    ],
    cdn: {
      enabled: true,
      provider: 'cloudflare' // or 'cloudinary', 'imgix'
    },
    imageProcessing: {
      enabled: true,
      operations: ['resize', 'crop', 'compress', 'format-conversion']
    }
  }
}
```

**What gets generated:**
- Upload Cloud Functions with validation
- Image processing triggers
- CDN URL generation
- Signed URL generation
- Direct upload utilities
- Progress tracking helpers

```typescript
// apps/functions/src/storage/upload.ts

export const processUploadedImage = functions.storage
  .object()
  .onFinalize(async (object) => {
    const bucket = admin.storage().bucket(object.bucket);
    const filePath = object.name;

    // Generate thumbnails
    if (filePath.startsWith('uploads/')) {
      await generateThumbnail(bucket, filePath);
      await optimizeImage(bucket, filePath);
    }
  });

// packages/data/src/storage/upload.ts
export async function uploadWithProgress(
  file: File,
  path: string,
  onProgress: (progress: number) => void
) {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      reject,
      () => resolve(getDownloadURL(uploadTask.snapshot.ref))
    );
  });
}
```

---

## 6. Search & Discovery

### Algolia / Typesense Integration

```javascript
{
  search: {
    provider: 'algolia', // or 'typesense', 'elasticsearch'
    enabled: true,
    indices: [
      {
        name: 'users',
        searchableAttributes: ['displayName', 'email', 'bio'],
        ranking: ['typo', 'geo', 'words', 'filters', 'proximity']
      },
      {
        name: 'products',
        searchableAttributes: ['name', 'description', 'category'],
        facets: ['category', 'price', 'brand'],
        replicas: ['products_price_asc', 'products_price_desc']
      }
    ],
    features: ['instant-search', 'autocomplete', 'faceted-search', 'geo-search']
  }
}
```

**What gets generated:**
- Search client initialization
- Index synchronization Cloud Functions
- Search UI components (basic)
- Faceting utilities
- Autocomplete helpers

---

## 7. Analytics & Monitoring

### Comprehensive Tracking Setup

```javascript
{
  analytics: {
    firebase: {
      enabled: true,
      events: ['screen_view', 'user_engagement', 'purchase']
    },
    mixpanel: {
      enabled: true,
      features: ['user-tracking', 'funnel-analysis', 'cohorts']
    },
    segment: {
      enabled: true,
      destinations: ['mixpanel', 'amplitude', 'google-analytics']
    }
  },
  monitoring: {
    sentry: {
      enabled: true,
      features: ['error-tracking', 'performance-monitoring', 'session-replay']
    },
    datadog: {
      enabled: false
    }
  },
  logging: {
    cloudLogging: true,
    structuredLogging: true,
    logLevels: ['error', 'warn', 'info', 'debug']
  }
}
```

**What gets generated:**
- Analytics SDK initialization
- Event tracking utilities
- Error boundary setup
- Performance monitoring
- Custom logging utilities

---

## 8. Real-time Features

### WebSocket / Real-time Configuration

```javascript
{
  realtime: {
    firestore: {
      liveQueries: true,
      collections: ['messages', 'notifications', 'presence']
    },
    websocket: {
      enabled: false // Unless needed beyond Firestore
    },
    presence: {
      enabled: true,
      features: ['online-status', 'typing-indicators', 'last-seen']
    }
  }
}
```

**What gets generated:**
- Real-time hooks for specified collections
- Presence system setup
- Online/offline detection
- Typing indicators utilities

---

## 9. Internationalization (i18n)

### Multi-language Support

```javascript
{
  internationalization: {
    enabled: true,
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja'],
    features: {
      languageDetection: true,
      rtlSupport: true,
      dateLocalization: true,
      numberFormatting: true
    },
    translationFiles: 'auto-generate' // Generate structure
  }
}
```

**What gets generated:**
- i18n library setup (react-i18next, i18next)
- Translation file structure
- Language detection hooks
- RTL styling support
- Date/number formatting utilities

---

## 10. Rate Limiting & Security

### API Protection

```javascript
{
  security: {
    rateLimiting: {
      enabled: true,
      rules: [
        {
          path: '/api/auth/*',
          limit: 5,
          window: '15m'
        },
        {
          path: '/api/data/*',
          limit: 100,
          window: '1h'
        }
      ]
    },
    cors: {
      origins: ['https://yourdomain.com'],
      credentials: true
    },
    helmet: {
      enabled: true,
      contentSecurityPolicy: true
    },
    apiKeys: {
      enabled: true,
      services: ['mobile-app', 'third-party']
    }
  }
}
```

---

## 11. Caching Strategy

### Redis / In-Memory Caching

```javascript
{
  caching: {
    provider: 'redis', // or 'memorystore'
    enabled: true,
    strategies: [
      {
        pattern: 'user-profile:*',
        ttl: 3600
      },
      {
        pattern: 'api-response:*',
        ttl: 300
      }
    ],
    features: ['query-caching', 'session-storage', 'rate-limit-storage']
  }
}
```

---

## 12. A/B Testing & Feature Flags

### LaunchDarkly / Firebase Remote Config

```javascript
{
  featureFlags: {
    provider: 'firebase-remote-config', // or 'launchdarkly'
    enabled: true,
    flags: [
      {
        name: 'new-dashboard',
        description: 'Enable new dashboard UI',
        defaultValue: false
      },
      {
        name: 'ai-copilot',
        description: 'Enable AI copilot feature',
        defaultValue: false,
        rolloutPercentage: 10
      }
    ],
    abTests: [
      {
        name: 'pricing-page-v2',
        variants: ['control', 'variant-a', 'variant-b'],
        distribution: [50, 25, 25]
      }
    ]
  }
}
```

---

## Implementation Recommendations

### Priority Matrix

| Configuration Area | Priority | Complexity | Impact | When to Add |
|-------------------|----------|------------|--------|-------------|
| AI Services | HIGH | Medium | High | Generation Time |
| Auth Providers | HIGH | Low | High | Generation Time |
| Payment Processing | HIGH | Medium | High | Generation Time |
| Email/SMS | HIGH | Low | High | Generation Time |
| File Upload/CDN | MEDIUM | Medium | Medium | Generation Time |
| Search | MEDIUM | High | Medium | Generation Time |
| Analytics | MEDIUM | Low | Medium | Generation Time |
| i18n | LOW | Low | High | Generation Time |
| Real-time | MEDIUM | Low | High | Generation Time |
| Rate Limiting | HIGH | Low | High | Generation Time |
| Caching | LOW | Medium | Medium | Post-Generation |
| A/B Testing | LOW | Medium | Low | Post-Generation |

---

## Enhanced Architecture Object Schema

```typescript
interface EnhancedArchitecture {
  // Existing fields
  projectName: string;
  displayName: string;
  projectType: string;
  platforms: string[];
  dataModels: DataModel[];
  userRoles: UserRole[];
  cloudFunctions: CloudFunction[];

  // NEW: AI Services
  aiServices?: {
    openai?: OpenAIConfig;
    anthropic?: AnthropicConfig;
    gemini?: GeminiConfig;
    vectorSearch?: VectorSearchConfig;
  };

  // NEW: Enhanced Authentication
  authentication?: {
    providers: string[];
    features: AuthFeatures;
    customClaims: string[];
  };

  // NEW: Payments
  payments?: {
    stripe?: StripeConfig;
  };

  // NEW: Notifications
  notifications?: {
    email?: EmailConfig;
    sms?: SMSConfig;
    push?: PushConfig;
  };

  // NEW: Storage
  storage?: {
    buckets: StorageBucket[];
    cdn?: CDNConfig;
    imageProcessing?: ImageProcessingConfig;
  };

  // NEW: Search
  search?: {
    provider: string;
    indices: SearchIndex[];
    features: string[];
  };

  // NEW: Analytics
  analytics?: {
    firebase?: AnalyticsConfig;
    mixpanel?: AnalyticsConfig;
    segment?: AnalyticsConfig;
  };

  // NEW: Monitoring
  monitoring?: {
    sentry?: SentryConfig;
    datadog?: DatadogConfig;
  };

  // NEW: Real-time
  realtime?: {
    firestore?: FirestoreRealtimeConfig;
    presence?: PresenceConfig;
  };

  // NEW: i18n
  internationalization?: {
    enabled: boolean;
    defaultLanguage: string;
    supportedLanguages: string[];
  };

  // NEW: Security
  security?: {
    rateLimiting?: RateLimitConfig;
    cors?: CORSConfig;
    apiKeys?: APIKeyConfig;
  };

  // NEW: Caching
  caching?: {
    provider: string;
    strategies: CacheStrategy[];
  };

  // NEW: Feature Flags
  featureFlags?: {
    provider: string;
    flags: FeatureFlag[];
    abTests?: ABTest[];
  };
}
```

---

## Example: AI-Powered App Configuration

```javascript
const architectureWithAI = {
  projectName: 'ai-assistant-app',
  displayName: 'AI Assistant App',
  projectType: 'monorepo',
  platforms: ['web', 'mobile', 'functions'],

  // Standard setup
  features: [
    'User authentication',
    'AI chat interface',
    'Document analysis',
    'Code generation',
    'Image understanding'
  ],

  // AI Services Configuration
  aiServices: {
    openai: {
      enabled: true,
      models: ['gpt-4', 'gpt-3.5-turbo', 'dall-e-3'],
      features: ['chat', 'completion', 'image-generation'],
      rateLimit: { requestsPerMinute: 60 }
    },
    anthropic: {
      enabled: true,
      models: ['claude-3-opus', 'claude-3-sonnet'],
      features: ['chat', 'analysis', 'code-generation']
    },
    vectorSearch: {
      provider: 'pinecone',
      dimensions: 1536,
      features: ['semantic-search', 'document-qa']
    }
  },

  // Enhanced auth with social providers
  authentication: {
    providers: ['email', 'google', 'github'],
    features: {
      emailVerification: true,
      multiFactorAuth: true
    },
    customClaims: ['role', 'subscription']
  },

  // Subscription payments
  payments: {
    stripe: {
      enabled: true,
      features: ['subscriptions', 'customer-portal'],
      products: [
        { name: 'Pro', price: 19.99, interval: 'month' },
        { name: 'Enterprise', price: 99.99, interval: 'month' }
      ]
    }
  },

  // Email notifications
  notifications: {
    email: {
      provider: 'sendgrid',
      templates: ['welcome', 'usage-alert', 'subscription-renewal']
    }
  },

  // File upload for document analysis
  storage: {
    buckets: [
      {
        name: 'documents',
        maxSize: '50MB',
        allowedTypes: ['application/pdf', 'text/*', 'image/*']
      }
    ]
  },

  // Analytics
  analytics: {
    firebase: { enabled: true },
    mixpanel: { enabled: true }
  },

  // Monitoring
  monitoring: {
    sentry: { enabled: true }
  },

  // Feature flags for gradual AI rollout
  featureFlags: {
    provider: 'firebase-remote-config',
    flags: [
      { name: 'gpt-4-access', defaultValue: false },
      { name: 'image-generation', defaultValue: false }
    ]
  }
};
```

---

## Summary

### What Gets Configured at Generation:
✅ All service integrations (APIs, SDKs)
✅ Environment variables structure
✅ Utility wrappers and helpers
✅ Cloud Function scaffolds
✅ Security configuration
✅ Third-party service initialization
✅ Rate limiting and CORS
✅ Analytics and monitoring setup
✅ i18n framework
✅ Caching infrastructure

### What Gets Implemented by Claude Code:
✅ UI components
✅ Business logic
✅ Feature-specific workflows
✅ API endpoint implementations
✅ Data transformations
✅ User interactions
✅ Complex integrations (using the generated wrappers)

---

## Next Steps

1. **Enhance architecture object schema** with all new fields
2. **Create generators** for each service integration
3. **Add configuration prompts** in conversational mode
4. **Generate wrapper utilities** for all services
5. **Update documentation** with examples
6. **Test integrations** with real API keys

**The goal:** Hand off a project where ALL infrastructure is ready, and Claude Code just builds features on top. 🚀
