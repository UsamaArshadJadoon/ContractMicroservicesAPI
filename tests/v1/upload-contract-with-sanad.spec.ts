import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, SANAD_GROUP_REQUEST } from '../helpers/fixtures';

test('POST UploadContractWithSanad — returns 200 with contractNumber in response', async ({ request }) => {
  const contractNumber = generateContractNumber('v1_sanad');

  const response = await request.post('/api/v1/contract/UploadContractWithSanad', {
    data: {
      contractName: 'Auto Test Contract With Sanad',
      description: 'Automated functional test',
      contractNumber,
      contractBeneficiaries: [
        {
          ...BASE_BENEFICIARY,
          sanadGroupRequest: SANAD_GROUP_REQUEST,
        },
      ],
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('contractNumber');
  expect(body.contractNumber).toBe(contractNumber);
});
