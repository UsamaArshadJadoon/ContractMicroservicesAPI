import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import {
  BASE_BENEFICIARY,
  BENEFICIARY_ID,
  SAMPLE_PDF_BASE64,
  SAMPLE_SIGNATURE_BASE64,
  TEMPLATE_CODE_V3,
  TEMPLATE_DATA_V3,
} from '../helpers/fixtures';

test.describe.serial('V3 UpdateStatus', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v3_status');

    // UpdateStatus requires a contract with a PDF body (template-created)
    const upload = await request.post('/api/v3/contract/UploadContractTemplate', {
      data: {
        contractName: 'Auto Test — V3 UpdateStatus prereq',
        description: 'Automated functional test',
        contractNumber,
        templateCode: TEMPLATE_CODE_V3,
        templateData: TEMPLATE_DATA_V3,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
    const uploadBody = await upload.json();
    expect(uploadBody.succeeded).toBe(true);
  });

  test('POST V3 UpdateStatus — returns 200 on accepted status', async ({ request }) => {
    // V3 has no GetRandomNumber endpoint — UpdateStatus is called directly with status=2
    const response = await request.post('/api/v3/contract/UpdateStatus', {
      data: {
        beneficiaryIdNumber: BENEFICIARY_ID,
        contractNumber,
        document: SAMPLE_PDF_BASE64,
        signature: SAMPLE_SIGNATURE_BASE64,
        status: 2,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.succeeded).toBe(true);
  });
});
