# AI Coding Agent Instructions

> These instructions capture current, observed conventions. Keep changes focused and consistent with existing patterns.

## Monorepo Overview

This is a **Node.js monorepo** for Mt. Horeb Lutheran Church's website (mthoreb.net). It contains two active packages:

- **mhlc-content-api** — Express.js API server that serves content from Contentful CMS and provides various endpoints (news, blog, events, donations, newsletter signup, etc.)
- **mhlc-images** — Image processing utilities (currently minimal)

> **Note:** `mhlc-ui` is deprecated and will be removed after the redesign is complete. Ignore it in instructions.

### Key Dependencies

- **Express** — Web framework for the API
- **Contentful** — Headless CMS for content management
- **Ajv** — JSON schema validation
- **Log4js** — Logging
- **Dotenv** — Environment variable management

## Build and Dev Workflow

### Commands (run from root)

| Command | Description |
|---------|-------------|
| `npm run start:api` | Start the API server (Express on port 3000) |
| `npm run build:ui` | Build the UI (deprecated) |
| `npm run dev:ui` | UI dev server with hot reload (deprecated) |
| `npm run lint` | Lint all workspaces |
| `npm run lint:fix` | Fix linting issues |
| `npm run lint:api` | Lint only the API |
| `npm run refresh-mock-content` | Refresh mock data in the API |

### Development Setup

1. Clone the repo: `git clone git@github.com:nthngalone/mhlc-web.git`
2. Install dependencies: `npm install`
3. Set up environment: Copy `mhlc-content-api/.env.sample` to `mhlc-content-api/.env` and fill in values
4. Start the server: `npm run start:api`
5. Access at `http://localhost:3000`

## Testing and Coverage

No test framework is currently configured. Manual testing via browser or API tools (curl, Postman) is used.

## Server Conventions

### API Structure

- **Entry point:** `mhlc-content-api/src/index.js`
- **Routes:** `mhlc-content-api/src/apiRouter.js`
- **Services:** `mhlc-content-api/src/services/` — Business logic (contentService, mailService, donationService, etc.)
- **Middleware:** `mhlc-content-api/src/middleware/` — Validation, authentication, error handling
- **Schemas:** `mhlc-content-api/schemas/` — JSON Schema definitions for request validation
- **Components:** `mhlc-content-api/components/` — Client-side JavaScript components

### Error Handling

Custom error classes in `mhlc-content-api/src/apiErrors.js`:
- `ApiError` (base)
- `BadRequestError` (400)
- `ConflictError` (409)
- `NotAuthenticatedError` (401)
- `NotAuthorizedError` (403)
- `NotFoundError` (404)
- `SystemError` (500)

### Request Validation

Uses **Ajv** (JSON Schema) for request validation. Schemas are defined in `mhlc-content-api/schemas/` and applied via the `validationHandler` middleware.

### Logging

Uses **Log4js** for structured logging. Get logger instance via `getLogger('moduleName')` from `./utils/logger`.

### Environment Variables

Store sensitive config in `mhlc-content-api/.env` (gitignored). Reference via `process.env.VARIABLE_NAME` after loading with dotenv.

### Contentful Integration

Content is fetched from Contentful CMS using the `contentful` npm package. The main service is `contentService.js` which handles all CMS interactions.

**Content Types:**
- **Pages** — Dynamic content pages with rich text
- **News Entries** — Church news and announcements
- **Blog Posts** — Blog articles
- **Events** — Calendar events
- **Staff** — Staff member profiles
- **Council** — Church council members

**Mock Data:**
For development without Contentful access, mock data exists in `mock/` directory. Run `npm run refresh-mock-content` to update mock files from the API.

### Email Templates

Some email templates use **EJS** (Embedded JavaScript) for dynamic content rendering. Template files are located in `mhlc-content-api/src/utils/mailTemplates.js`.

