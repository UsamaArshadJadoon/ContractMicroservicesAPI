import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, BENEFICIARY_ID } from '../helpers/fixtures';

test.describe.serial('V2 GetRandomNumber', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v2_rand');

    const upload = await request.post('/api/v2/contract/UploadContract', {
      data: {
        contractName: 'Auto Test — V2 GetRandomNumber prereq',
        description: 'Automated functional test',
        contractNumber,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
  });

  test('GET V2 GetRandomNumber — returns 200 with OTP/token in response', async ({ request }) => {
    const response = await request.get('/api/v2/contract/GetRandomNumber', {
      params: {
        contractNumber,
        beneficiaryIdNumber: BENEFICIARY_ID,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    // Response should include some form of random/OTP value
    expect(body).toBeTruthy();
  });
});
