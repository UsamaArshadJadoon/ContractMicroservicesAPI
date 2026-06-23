/**
 * Auth headers are injected globally via playwright.config.ts extraHTTPHeaders.
 * This module is kept for explicit use in beforeAll hooks where the global
 * request context may need direct header references.
 */
export const AUTH_HEADERS = {
  'X-Contracts-ClientId': process.env.X_CONTRACTS_CLIENT_ID ?? '',
  'X-Contracts-APIKey': process.env.X_CONTRACTS_API_KEY ?? '',
  'X-Contracts-Secret': process.env.SECRET_KEY ?? '',
} as const;
