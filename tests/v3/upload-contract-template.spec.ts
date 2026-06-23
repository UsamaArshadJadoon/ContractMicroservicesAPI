import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, TEMPLATE_CODE_V3, TEMPLATE_DATA_V3 } from '../helpers/fixtures';

test('POST V3 UploadContractTemplate — returns 200 with contractNumber in response', async ({ request }) => {
  const contractNumber = generateContractNumber('v3_tmpl');

  const response = await request.post('/api/v3/contract/UploadContractTemplate', {
    data: {
      contractName: 'Auto Test Template Contract V3',
      description: 'Automated functional test',
      contractNumber,
      templateCode: TEMPLATE_CODE_V3,
      templateData: TEMPLATE_DATA_V3,
      contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('contractNumber');
  expect(body.contractNumber).toBe(contractNumber);
});
