import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import {
  BASE_BENEFICIARY,
  BENEFICIARY_ID,
  SAMPLE_PDF_BASE64,
  SAMPLE_SIGNATURE_BASE64,
  TEMPLATE_CODE_V2,
  TEMPLATE_DATA_V2,
} from '../helpers/fixtures';

test.describe.serial('V2 UpdateStatus', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v2_status');

    // UpdateStatus requires a contract with a PDF body (template-created)
    const upload = await request.post('/api/v2/contract/UploadContractTemplate', {
      data: {
        contractName: 'Auto Test — V2 UpdateStatus prereq',
        description: 'Automated functional test',
        contractNumber,
        templateCode: TEMPLATE_CODE_V2,
        templateData: TEMPLATE_DATA_V2,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
    const uploadBody = await upload.json();
    expect(uploadBody.succeeded).toBe(true);
  });

  test('POST V2 UpdateStatus — returns 200 on accepted status', async ({ request }) => {
    // GetRandomNumber provides the OTP required by UpdateStatus
    const otpRes = await request.get('/api/v2/contract/GetRandomNumber', {
      params: { contractNumber, beneficiaryIdNumber: BENEFICIARY_ID },
    });
    expect(otpRes.status()).toBe(200);
    const otpBody = await otpRes.json();
    expect(otpBody.succeeded).toBe(true);
    const { random: randomNumber, transactionId } = otpBody.data;

    const response = await request.post('/api/v2/contract/UpdateStatus', {
      data: {
        beneficiaryIdNumber: BENEFICIARY_ID,
        contractNumber,
        randomNumber,
        transactionId,
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
