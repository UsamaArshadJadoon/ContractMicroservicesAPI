# Awn Microservice API Automation — Design Spec
**Date:** 2026-06-23  
**Status:** Approved

---

## 1. Overview

Functional API test suite for the Awn Microservice (contract signing platform at `ms-sb.contracts.com.sa`). Tests verify HTTP status codes, response shapes, and business-level outcomes across three API versions. A GitHub Actions CI/CD pipeline gates every push/PR and runs a nightly health check against the live sandbox.

---

## 2. Scope

| Version | Description | Endpoints Tested |
|---------|-------------|-----------------|
| V1 | With Sanad | UploadContractWithSanad, UploadContractTemplateWithSanad, DownloadSanad, DownloadUnSignedDocument |
| V2 | With IAM | UploadContract, UploadContractTemplate, DownloadUnSignedDocument, GetRandomNumber, GetTermsAndConditions, UpdateStatus |
| V3 | Without IAM/Sanad | UploadContract, UploadContractTemplate, DownloadUnSignedDocument, GetTermsAndConditions, UpdateStatus |

**Explicitly skipped (V1 only):** GetRandomNumber, GetTermsAndConditions, UpdateStatus, New Request (PATCH to external Nafith sandbox — different auth scheme).

---

## 3. Technology Stack

- **Test Framework:** Playwright + TypeScript (`@playwright/test`)
- **CI/CD:** GitHub Actions
- **Node:** 20 LTS
- **Auth:** Custom headers — `X-Contracts-ClientId`, `X-Contracts-APIKey`, `X-Contracts-Secret`
- **Secrets management:** `.env` locally (gitignored), GitHub repository secrets in CI

---

## 4. Architecture

### 4.1 Project Structure

```
.
├── .github/workflows/api-tests.yml   # CI/CD pipeline
├── tests/
│   ├── helpers/
│   │   ├── auth.ts                   # Auth header constants (loaded from env)
│   │   ├── contract.ts               # generateContractNumber() utility
│   │   └── fixtures.ts               # Shared test data: beneficiaries, PDF, signature
│   ├── v1/                           # Four spec files (skipped endpoints have no file)
│   ├── v2/                           # Six spec files
│   └── v3/                           # Five spec files
├── playwright.config.ts              # Global config: baseURL, extraHTTPHeaders, reporters
├── .env                              # Gitignored — real credentials
├── .env.example                      # Committed — shows required keys, no values
├── package.json
└── tsconfig.json
```

### 4.2 Test Anatomy

Each spec follows one of two patterns:

**Pattern A — Upload (self-contained):**
1. Generate unique `contractNumber` via `generateContractNumber('prefix')` → `prefix_<timestamp>`
2. POST the upload endpoint
3. Assert `response.ok()` (2xx) and response body shape

**Pattern B — Dependent (upload + action):**
1. `beforeAll`: upload a fresh contract, store `contractNumber`
2. Test: call the downstream endpoint (Download / GetRandom / GetTerms / UpdateStatus) using that `contractNumber`
3. Assert status + response body

Pattern B tests use `test.describe.serial()` to guarantee `beforeAll` completes before any test assertion runs.

### 4.3 Contract Number Strategy

Runtime-generated: `${prefix}_${Date.now()}` — guarantees uniqueness across parallel CI runs and avoids stale-contract collisions. Each spec generates its own number independently.

---

## 5. CI/CD Pipeline

File: `.github/workflows/api-tests.yml`

**Triggers:**
- `push` to `main`
- `pull_request` targeting `main`
- `schedule`: `0 2 * * *` (02:00 UTC nightly)

**Steps:**
1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20, npm cache)
3. `npm ci`
4. `npx playwright install --with-deps chromium` (API tests don't need a browser but Playwright needs its binary)
5. `npm test` with secrets injected as env vars
6. Upload HTML report as artifact (retained 30 days)
7. Upload JUnit XML report as artifact

**Secrets required in GitHub repo settings:**
- `MICRO_URL`
- `X_CONTRACTS_CLIENT_ID`
- `X_CONTRACTS_API_KEY`
- `SECRET_KEY`

---

## 6. Error Handling

- Assertions use Playwright's built-in `expect` — failures surface clear diffs
- `retries: 2` in CI handles transient network blips
- `timeout: 30_000ms` per test — generous for a remote API
- `workers: 1` — serial execution avoids overwhelming the sandbox API

---

## 7. Reporters

| Reporter | Output | Purpose |
|----------|--------|---------|
| `list` | stdout | Local dev feedback |
| `html` | `playwright-report/` | Visual diff browsing |
| `junit` | `test-results/results.xml` | CI artifact / future Slack/email integration |
