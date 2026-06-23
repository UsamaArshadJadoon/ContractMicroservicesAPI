import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, BENEFICIARY_ID } from '../helpers/fixtures';

test.describe.serial('V3 GetTermsAndConditions', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v3_terms');

    const upload = await request.post('/api/v3/contract/UploadContract', {
      data: {
        contractName: 'Auto Test — V3 GetTermsAndConditions prereq',
        description: 'Automated functional test',
        contractNumber,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
  });

  test('GET V3 GetTermsAndConditions — returns 200 with terms content', async ({ request }) => {
    const response = await request.get('/api/v3/contract/GetTermsAndConditions', {
      params: {
        contractNumber,
        beneficiaryIdNumber: BENEFICIARY_ID,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();
  });
});
