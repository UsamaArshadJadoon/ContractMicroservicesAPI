import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, BENEFICIARY_ID } from '../helpers/fixtures';

test.describe.serial('V2 GetTermsAndConditions', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v2_terms');

    const upload = await request.post('/api/v2/contract/UploadContract', {
      data: {
        contractName: 'Auto Test — V2 GetTermsAndConditions prereq',
        description: 'Automated functional test',
        contractNumber,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
    const uploadBody = await upload.json();
    expect(uploadBody.succeeded).toBe(true);
  });

  test('GET V2 GetTermsAndConditions — returns 200 with terms content', async ({ request }) => {
    const response = await request.get('/api/v2/contract/GetTermsAndConditions', {
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
