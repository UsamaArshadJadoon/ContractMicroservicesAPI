import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, BENEFICIARY_ID, SAMPLE_PDF_BASE64, SAMPLE_SIGNATURE_BASE64 } from '../helpers/fixtures';

test.describe.serial('V3 UpdateStatus', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v3_status');

    const upload = await request.post('/api/v3/contract/UploadContract', {
      data: {
        contractName: 'Auto Test — V3 UpdateStatus prereq',
        description: 'Automated functional test',
        contractNumber,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
  });

  test('POST V3 UpdateStatus — returns 200 on accepted status', async ({ request }) => {
    const response = await request.post('/api/v3/contract/UpdateStatus', {
      data: {
        beneficiaryIdNumber: BENEFICIARY_ID,
        contractNumber,
        document: SAMPLE_PDF_BASE64,
        signature: SAMPLE_SIGNATURE_BASE64,
        status: 'Accepted',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();
  });
});
