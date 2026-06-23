import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, SANAD_GROUP_REQUEST, TEMPLATE_CODE_V1, TEMPLATE_DATA_V1 } from '../helpers/fixtures';

test('POST UploadContractTemplateWithSanad — returns 200 with contractNumber in response', async ({ request }) => {
  const contractNumber = generateContractNumber('v1_tmpl_sanad');

  const response = await request.post('/api/v1/contract/UploadContractTemplateWithSanad', {
    data: {
      contractName: 'Auto Test Template Contract With Sanad',
      description: 'Automated functional test',
      contractNumber,
      templateCode: TEMPLATE_CODE_V1,
      templateData: TEMPLATE_DATA_V1,
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
