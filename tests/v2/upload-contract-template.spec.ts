import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, TEMPLATE_CODE_V2, TEMPLATE_DATA_V2 } from '../helpers/fixtures';

test('POST V2 UploadContractTemplate — returns 200 with contractNumber in response', async ({ request }) => {
  const contractNumber = generateContractNumber('v2_tmpl');

  const response = await request.post('/api/v2/contract/UploadContractTemplate', {
    data: {
      contractName: 'Auto Test Template Contract V2',
      description: 'Automated functional test',
      contractNumber,
      templateCode: TEMPLATE_CODE_V2,
      templateData: TEMPLATE_DATA_V2,
      contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('contractNumber');
  expect(body.contractNumber).toBe(contractNumber);
});
