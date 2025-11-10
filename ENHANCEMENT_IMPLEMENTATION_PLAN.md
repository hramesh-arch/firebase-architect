# Enhancement Implementation Plan

**How to Add Pre-Generation Configurations to Firebase Architect**

---

## Overview

This plan shows how to implement the 12 configuration areas identified in `PRE_GENERATION_CONFIGURATION.md`.

---

## Phase 1: AI Services (Week 1-2)

### Priority: HIGHEST
### Impact: Enables AI-powered apps

### Implementation Steps:

#### 1. Extend Architecture Schema

**File:** `generators/config-validator.js` (create if following Quick Wins)

```javascript
const AIServicesSchema = z.object({
  openai: z.object({
    enabled: z.boolean(),
    models: z.array(z.string()),
    features: z.array(z.enum(['chat', 'completion', 'embedding', 'image-generation'])),
    rateLimit: z.object({
      requestsPerMinute: z.number(),
      tokensPerMinute: z.number().optional()
    }).optional()
  }).optional(),

  anthropic: z.object({
    enabled: z.boolean(),
    models: z.array(z.string()),
    features: z.array(z.enum(['chat', 'analysis', 'code-generation']))
  }).optional(),

  gemini: z.object({
    enabled: z.boolean(),
    models: z.array(z.string()),
    features: z.array(z.enum(['chat', 'vision', 'embedding']))
  }).optional(),

  vectorSearch: z.object({
    provider: z.enum(['pinecone', 'weaviate', 'qdrant']),
    dimensions: z.number(),
    features: z.array(z.string())
  }).optional()
});

// Add to main schema
const EnhancedArchitectureSchema = ArchitectureSchema.extend({
  aiServices: AIServicesSchema.optional()
});
```

#### 2. Create AI Service Generator

**File:** `generators/ai-services.js` (NEW)

```javascript
import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function generateAIServices(config, projectPath) {
  if (!config.aiServices) return;

  const spinner = ora('Setting up AI services...').start();

  // Create AI utilities directory
  const aiDir = path.join(projectPath, 'packages/core/src/ai');
  fs.mkdirSync(aiDir, { recursive: true });

  // Generate OpenAI wrapper
  if (config.aiServices.openai?.enabled) {
    await generateOpenAIWrapper(aiDir, config.aiServices.openai);
  }

  // Generate Anthropic wrapper
  if (config.aiServices.anthropic?.enabled) {
    await generateAnthropicWrapper(aiDir, config.aiServices.anthropic);
  }

  // Generate Gemini wrapper
  if (config.aiServices.gemini?.enabled) {
    await generateGeminiWrapper(aiDir, config.aiServices.gemini);
  }

  // Generate vector search if configured
  if (config.aiServices.vectorSearch) {
    await generateVectorSearchWrapper(aiDir, config.aiServices.vectorSearch);
  }

  // Generate index file
  generateAIIndex(aiDir, config.aiServices);

  // Add to package dependencies
  await addAIDependencies(projectPath, config.aiServices);

  // Add environment variables to .env.example
  await addAIEnvVars(projectPath, config.aiServices);

  spinner.succeed('AI services configured');
}

async function generateOpenAIWrapper(aiDir, openaiConfig) {
  const openaiWrapper = `import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get chat completion from OpenAI
 */
export async function getChatCompletion(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {}
) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || '${openaiConfig.models[0]}',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
    });

    return {
      content: response.choices[0].message.content,
      usage: response.usage,
      model: response.model
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(\`OpenAI API failed: \${error.message}\`);
  }
}

/**
 * Stream chat completion from OpenAI
 */
export async function streamChatCompletion(
  messages: Array<{ role: string; content: string }>,
  onChunk: (text: string) => void,
  options: { model?: string } = {}
) {
  const stream = await openai.chat.completions.create({
    model: options.model || '${openaiConfig.models[0]}',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    if (text) {
      onChunk(text);
    }
  }
}

${openaiConfig.features.includes('embedding') ? `
/**
 * Generate embeddings
 */
export async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return response.data[0].embedding;
}
` : ''}

${openaiConfig.features.includes('image-generation') ? `
/**
 * Generate images with DALL-E
 */
export async function generateImage(
  prompt: string,
  options: {
    size?: '1024x1024' | '1792x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
  } = {}
) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: options.size || '1024x1024',
    quality: options.quality || 'standard',
  });

  return response.data[0].url;
}
` : ''}

// Rate limiting helper
let requestCount = 0;
let windowStart = Date.now();

export function checkRateLimit() {
  const now = Date.now();
  const windowDuration = 60000; // 1 minute

  if (now - windowStart > windowDuration) {
    requestCount = 0;
    windowStart = now;
  }

  if (requestCount >= ${openaiConfig.rateLimit?.requestsPerMinute || 60}) {
    throw new Error('Rate limit exceeded');
  }

  requestCount++;
}
`;

  fs.writeFileSync(path.join(aiDir, 'openai.ts'), openaiWrapper);
}

async function generateAnthropicWrapper(aiDir, anthropicConfig) {
  const anthropicWrapper = `import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Get Claude response
 */
export async function getClaudeResponse(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
) {
  try {
    const response = await anthropic.messages.create({
      model: options.model || '${anthropicConfig.models[0]}',
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.7,
      messages,
    });

    return {
      content: response.content[0].text,
      usage: response.usage,
      model: response.model
    };
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw new Error(\`Anthropic API failed: \${error.message}\`);
  }
}

/**
 * Stream Claude response
 */
export async function streamClaudeResponse(
  messages: Array<{ role: string; content: string }>,
  onChunk: (text: string) => void,
  options: { model?: string } = {}
) {
  const stream = await anthropic.messages.stream({
    model: options.model || '${anthropicConfig.models[0]}',
    max_tokens: 4096,
    messages,
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      onChunk(event.delta.text);
    }
  }
}
`;

  fs.writeFileSync(path.join(aiDir, 'anthropic.ts'), anthropicWrapper);
}

async function addAIDependencies(projectPath, aiServices) {
  const corePkgPath = path.join(projectPath, 'packages/core/package.json');
  const corePkg = JSON.parse(fs.readFileSync(corePkgPath, 'utf-8'));

  const dependencies = {};

  if (aiServices.openai?.enabled) {
    dependencies['openai'] = '^4.20.0';
  }

  if (aiServices.anthropic?.enabled) {
    dependencies['@anthropic-ai/sdk'] = '^0.9.0';
  }

  if (aiServices.gemini?.enabled) {
    dependencies['@google/generative-ai'] = '^0.1.0';
  }

  if (aiServices.vectorSearch) {
    if (aiServices.vectorSearch.provider === 'pinecone') {
      dependencies['@pinecone-database/pinecone'] = '^1.0.0';
    }
  }

  corePkg.dependencies = { ...corePkg.dependencies, ...dependencies };

  fs.writeFileSync(corePkgPath, JSON.stringify(corePkg, null, 2));
}

async function addAIEnvVars(projectPath, aiServices) {
  const envExamplePath = path.join(projectPath, '.env.example');
  let envContent = fs.readFileSync(envExamplePath, 'utf-8');

  envContent += '\n# AI Services\n';

  if (aiServices.openai?.enabled) {
    envContent += 'OPENAI_API_KEY=sk-...\n';
  }

  if (aiServices.anthropic?.enabled) {
    envContent += 'ANTHROPIC_API_KEY=sk-ant-...\n';
  }

  if (aiServices.gemini?.enabled) {
    envContent += 'GEMINI_API_KEY=...\n';
  }

  if (aiServices.vectorSearch) {
    envContent += `${aiServices.vectorSearch.provider.toUpperCase()}_API_KEY=...\n`;
  }

  fs.writeFileSync(envExamplePath, envContent);
}
```

#### 3. Integrate into Main Generator

**File:** `index.js` (modify)

```javascript
// In generateProject function, add after Phase 1:

// Generate AI services if configured
if (config.aiServices) {
  const { generateAIServices } = await import('./generators/ai-services.js');
  await generateAIServices(config, projectPath);
}
```

#### 4. Update Conversational Mode

**File:** `index.js` (modify)

```javascript
// In conversationalMode function, add AI services questions:

const { aiFeatures } = await inquirer.prompt([
  {
    type: 'confirm',
    name: 'needsAI',
    message: 'Does your app need AI capabilities (chat, completion, embeddings)?',
    default: false
  }
]);

if (aiFeatures) {
  const aiConfig = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'aiProviders',
      message: 'Which AI providers do you need?',
      choices: [
        { name: 'OpenAI (GPT-4, GPT-3.5, DALL-E)', value: 'openai' },
        { name: 'Anthropic (Claude)', value: 'anthropic' },
        { name: 'Google (Gemini)', value: 'gemini' }
      ]
    },
    {
      type: 'checkbox',
      name: 'aiFeatures',
      message: 'What AI features do you need?',
      choices: [
        'Chat/Conversation',
        'Text Completion',
        'Embeddings/Semantic Search',
        'Image Generation',
        'Code Generation',
        'Document Analysis'
      ]
    }
  ]);

  architecture.aiServices = buildAIServicesConfig(aiConfig);
}
```

---

## Phase 2: Enhanced Authentication (Week 3)

### Implementation

**File:** `generators/enhanced-auth.js` (NEW)

```javascript
export async function generateEnhancedAuth(config, projectPath) {
  if (!config.authentication) return;

  const spinner = ora('Configuring authentication providers...').start();

  // Generate OAuth configurations
  await generateOAuthConfigs(projectPath, config.authentication.providers);

  // Generate auth utilities
  await generateAuthUtilities(projectPath, config.authentication);

  // Update Firebase config to enable providers
  await enableAuthProviders(projectPath, config.authentication.providers);

  // Generate MFA setup if enabled
  if (config.authentication.features?.multiFactorAuth) {
    await generateMFASetup(projectPath);
  }

  spinner.succeed('Authentication configured');
}

async function generateOAuthConfigs(projectPath, providers) {
  const authDir = path.join(projectPath, 'packages/data/src/auth');
  fs.mkdirSync(authDir, { recursive: true });

  const providerMethods = providers.map(provider => {
    switch (provider) {
      case 'google':
        return `
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}`;

      case 'apple':
        return `
export async function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider);
}`;

      case 'github':
        return `
export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}`;

      case 'microsoft':
        return `
export async function signInWithMicrosoft() {
  const provider = new OAuthProvider('microsoft.com');
  return signInWithPopup(auth, provider);
}`;

      case 'phone':
        return `
export async function signInWithPhone(phoneNumber: string, appVerifier: ApplicationVerifier) {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
}`;

      default:
        return '';
    }
  }).join('\n\n');

  const authProvidersFile = `import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPhoneNumber,
  ApplicationVerifier
} from 'firebase/auth';
import { auth } from '../firebase';

${providerMethods}

export async function linkAccountWithGoogle(user: any) {
  const provider = new GoogleAuthProvider();
  return linkWithPopup(user, provider);
}
`;

  fs.writeFileSync(path.join(authDir, 'providers.ts'), authProvidersFile);
}
```

---

## Phase 3: Payment Integration (Week 4)

**File:** `generators/payments.js` (NEW)

```javascript
export async function generatePaymentIntegration(config, projectPath) {
  if (!config.payments?.stripe) return;

  const spinner = ora('Setting up payment processing...').start();

  // Generate Stripe Cloud Functions
  await generateStripeCloudFunctions(projectPath, config.payments.stripe);

  // Generate client-side payment utilities
  await generatePaymentClientUtils(projectPath);

  // Add webhook handlers
  await generateStripeWebhooks(projectPath, config.payments.stripe.webhooks);

  // Add environment variables
  await addPaymentEnvVars(projectPath);

  spinner.succeed('Payment processing configured');
}
```

---

## Phase 4: Notifications (Week 5)

**File:** `generators/notifications.js` (NEW)

```javascript
export async function generateNotificationServices(config, projectPath) {
  if (!config.notifications) return;

  if (config.notifications.email) {
    await generateEmailService(projectPath, config.notifications.email);
  }

  if (config.notifications.sms) {
    await generateSMSService(projectPath, config.notifications.sms);
  }

  if (config.notifications.push) {
    await generatePushNotifications(projectPath, config.notifications.push);
  }
}
```

---

## Quick Implementation Checklist

### Week 1-2: AI Services
- [ ] Create `generators/ai-services.js`
- [ ] Add AI schema validation
- [ ] Generate OpenAI wrapper
- [ ] Generate Anthropic wrapper
- [ ] Generate Gemini wrapper
- [ ] Add conversational prompts
- [ ] Test with sample architecture
- [ ] Update documentation

### Week 3: Enhanced Auth
- [ ] Create `generators/enhanced-auth.js`
- [ ] Generate OAuth configs
- [ ] Generate MFA setup
- [ ] Update Firebase init
- [ ] Test all providers
- [ ] Update documentation

### Week 4: Payments
- [ ] Create `generators/payments.js`
- [ ] Generate Stripe functions
- [ ] Generate webhook handlers
- [ ] Test payment flow
- [ ] Update documentation

### Week 5: Notifications
- [ ] Create `generators/notifications.js`
- [ ] Generate email templates
- [ ] Generate SMS utilities
- [ ] Generate push notifications
- [ ] Test all channels
- [ ] Update documentation

---

## Testing Strategy

### Unit Tests

```javascript
// test/generators/ai-services.test.js
import { generateAIServices } from '../generators/ai-services.js';

describe('AI Services Generator', () => {
  it('should generate OpenAI wrapper when enabled', async () => {
    const config = {
      aiServices: {
        openai: {
          enabled: true,
          models: ['gpt-4'],
          features: ['chat']
        }
      }
    };

    await generateAIServices(config, testProjectPath);

    const wrapperExists = fs.existsSync(
      path.join(testProjectPath, 'packages/core/src/ai/openai.ts')
    );

    expect(wrapperExists).toBe(true);
  });
});
```

### Integration Tests

```javascript
// test/integration/full-generation.test.js
describe('Full Project Generation with AI', () => {
  it('should generate complete project with AI services', async () => {
    const architecture = {
      projectName: 'test-ai-app',
      displayName: 'Test AI App',
      projectType: 'monorepo',
      platforms: ['web', 'functions'],
      aiServices: {
        openai: { enabled: true, models: ['gpt-4'], features: ['chat'] }
      }
    };

    const result = await generateProject(architecture);

    // Verify all AI files exist
    expect(fs.existsSync(path.join(result.projectPath, 'packages/core/src/ai/openai.ts'))).toBe(true);
    expect(fs.existsSync(path.join(result.projectPath, '.env.example'))).toBe(true);

    // Verify .env.example has OPENAI_API_KEY
    const envContent = fs.readFileSync(path.join(result.projectPath, '.env.example'), 'utf-8');
    expect(envContent).toContain('OPENAI_API_KEY');
  });
});
```

---

## Documentation Updates

### Update README.md

```markdown
## New in v3.2: Pre-Generation Configurations

Firebase Architect now configures AI services, enhanced auth, payments, and more at generation time:

### AI Services
- OpenAI (GPT-4, DALL-E)
- Anthropic (Claude)
- Google (Gemini)
- Vector search (Pinecone, Weaviate)

### Enhanced Authentication
- Multiple OAuth providers
- Multi-factor authentication
- Social account linking

### Payment Processing
- Stripe integration
- Subscription management
- Webhook handling

[See full configuration guide →](PRE_GENERATION_CONFIGURATION.md)
```

---

## Migration Path for Existing Projects

For projects already generated, provide an upgrade path:

**File:** `upgrade-to-v3.2.js` (NEW)

```javascript
// Utility to add new configurations to existing projects

export async function upgradeProject(projectPath, newConfig) {
  console.log('Upgrading project to v3.2...');

  if (newConfig.aiServices) {
    await addAIServices(projectPath, newConfig.aiServices);
  }

  if (newConfig.authentication) {
    await addEnhancedAuth(projectPath, newConfig.authentication);
  }

  // ... other upgrades

  console.log('✅ Project upgraded!');
}
```

---

## Priority Implementation Order

1. **AI Services** - Highest demand, enables AI-powered apps
2. **Enhanced Auth** - Common requirement, quick win
3. **Payments** - High business value
4. **Notifications** - High user engagement
5. **File Upload/CDN** - Common use case
6. **Search** - Medium complexity, high value
7. **Analytics** - Easy to add, good insights
8. **i18n** - Framework setup is straightforward
9. **Rate Limiting** - Security essential
10. **Real-time** - Partially done via Firestore
11. **Caching** - Performance optimization
12. **Feature Flags** - Advanced feature

---

## Success Criteria

A successfully enhanced firebase-architect should:

✅ Generate AI service wrappers when configured
✅ Set up all auth providers specified
✅ Configure payment processing end-to-end
✅ Initialize notification services
✅ Create all necessary Cloud Functions
✅ Add all environment variables
✅ Include comprehensive documentation
✅ Provide working examples
✅ Pass all integration tests
✅ Hand off ready-to-use infrastructure to Claude Code

**Timeline:** 4-6 weeks for all enhancements
**Impact:** Claude Code can focus 100% on features, 0% on infrastructure

---

**Let's make firebase-architect the best Firebase project generator!** 🚀
