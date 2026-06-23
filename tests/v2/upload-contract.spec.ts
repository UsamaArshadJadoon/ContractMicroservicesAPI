import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY } from '../helpers/fixtures';

test('POST V2 UploadContract — returns 200 with contractNumber in response', async ({ request }) => {
  const contractNumber = generateContractNumber('v2_upload');

  const response = await request.post('/api/v2/contract/UploadContract', {
    data: {
      contractName: 'Auto Test Contract V2',
      description: 'Automated functional test',
      contractNumber,
      contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.succeeded).toBe(true);
  expect(body.data).toHaveProperty('contractNumber');
  expect(body.data.contractNumber).toBe(contractNumber);
});
