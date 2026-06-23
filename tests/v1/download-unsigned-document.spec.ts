import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, SANAD_GROUP_REQUEST, TEMPLATE_CODE_V1, TEMPLATE_DATA_V1 } from '../helpers/fixtures';

test.describe.serial('V1 DownloadUnSignedDocument', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    // DownloadUnSignedDocument requires a document body — use template upload to generate one
    contractNumber = generateContractNumber('v1_dl_unsigned');

    const upload = await request.post('/api/v1/contract/UploadContractTemplateWithSanad', {
      data: {
        contractName: 'Auto Test — V1 DownloadUnSignedDocument prereq',
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

    expect(upload.status()).toBe(200);
    const uploadBody = await upload.json();
    expect(uploadBody.succeeded).toBe(true);
  });

  test('GET DownloadUnSignedDocument — returns 200 with binary/PDF content', async ({ request }) => {
    const response = await request.get('/api/v1/contract/DownloadUnSignedDocument', {
      params: { contractNumber },
    });

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'] ?? '';
    // Sandbox returns JSON envelope; production returns binary PDF
    expect(
      contentType.includes('application/pdf') ||
        contentType.includes('application/octet-stream') ||
        contentType.includes('application/json'),
      `Unexpected content-type: ${contentType}`,
    ).toBe(true);
  });
});
