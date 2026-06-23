import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY, SANAD_GROUP_REQUEST } from '../helpers/fixtures';

test.describe.serial('V1 DownloadUnSignedDocument', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v1_dl_unsigned');

    const upload = await request.post('/api/v1/contract/UploadContractWithSanad', {
      data: {
        contractName: 'Auto Test — DownloadUnSignedDocument prereq',
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

    expect(upload.status()).toBe(200);
  });

  test('GET DownloadUnSignedDocument — returns 200 with binary/PDF content', async ({ request }) => {
    const response = await request.get('/api/v1/contract/DownloadUnSignedDocument', {
      params: { contractNumber },
    });

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'] ?? '';
    expect(
      contentType.includes('application/pdf') || contentType.includes('application/octet-stream'),
      `Unexpected content-type: ${contentType}`,
    ).toBe(true);
  });
});
