import { test, expect } from '@playwright/test';
import { generateContractNumber } from '../helpers/contract';
import { BASE_BENEFICIARY } from '../helpers/fixtures';

test.describe.serial('V2 DownloadUnSignedDocument', () => {
  let contractNumber: string;

  test.beforeAll(async ({ request }) => {
    contractNumber = generateContractNumber('v2_dl_unsigned');

    const upload = await request.post('/api/v2/contract/UploadContract', {
      data: {
        contractName: 'Auto Test — V2 DownloadUnSignedDocument prereq',
        description: 'Automated functional test',
        contractNumber,
        contractBeneficiaries: [{ ...BASE_BENEFICIARY }],
      },
    });

    expect(upload.status()).toBe(200);
  });

  test('GET V2 DownloadUnSignedDocument — returns 200 with binary/PDF content', async ({ request }) => {
    const response = await request.get('/api/v2/contract/DownloadUnSignedDocument', {
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
