// ─── Beneficiary Identifiers ────────────────────────────────────────────────
export const BENEFICIARY_ID = '1010056347';
export const BENEFICIARY_PHONE = '0556788274';
export const BENEFICIARY_EMAIL = 'm.rahmeh+32@azm.sa';

// ─── Base Beneficiary (used by V2 + V3) ─────────────────────────────────────
export const BASE_BENEFICIARY = {
  beneficiaryIdNumber: BENEFICIARY_ID,
  beneficiaryName: 'Auto Test Beneficiary',
  beneficiaryNameAr: 'مستفيد تجريبي آلي',
  beneficiaryMobileNumber: BENEFICIARY_PHONE,
  beneficiaryEmail: BENEFICIARY_EMAIL,
  beneficiaryRegionCode: 1,
  responseTimeInMinutes: 2880,
  signatureLang: 'en',
  signPageCode: 6,
  pageNumberCoordinates: [
    { pageNumber: 1, coordinates: '371,775,525,838' },
  ],
} as const;

// ─── Sanad Group Request (V1 only) ───────────────────────────────────────────
export const SANAD_GROUP_REQUEST = {
  debtor: { national_id: BENEFICIARY_ID },
  debtor_phone_number: BENEFICIARY_PHONE,
  country_of_issuance: 'SA',
  city_of_issuance: '1',
  country_of_payment: 'SA',
  city_of_payment: '1',
  reference_id: '10096039',
  total_value: '44500.00',
  currency: 'SAR',
  sanad_type: 'multiple',
  max_approve_duration: 2880,
  reason: '',
  sanad: [
    {
      total_value: '44000.00',
      reference_id: '1090024520',
      due_type: 'upon request',
      due_date: null,
    },
    {
      total_value: '500.00',
      reference_id: '1090024520',
      due_type: 'upon request',
      due_date: null,
    },
  ],
} as const;

// ─── Template Codes & Data ───────────────────────────────────────────────────
export const TEMPLATE_CODE_V1 = 'test33222';
export const TEMPLATE_CODE_V2 = 'test33222';
export const TEMPLATE_CODE_V3 = 'test33222';

export const TEMPLATE_DATA_V1 = JSON.stringify({
  CR: 'Hashem 11',
  FName: 'New Offer',
  LName: 'New Offer',
  Name: 'New Offer',
  Postion: 'New Offer',
});

export const TEMPLATE_DATA_V2 = JSON.stringify({
  CR: 'Hashem 11',
  FName: 'New Offer',
  LName: 'New Offer',
  Name: 'New Offer',
  Postion: 'New Offer',
});

export const TEMPLATE_DATA_V3 = JSON.stringify({
  CR: 'Hashem 11',
  FName: 'New Offer',
  LName: 'New Offer',
  Name: 'New Offer',
  Postion: 'New Offer',
});

// ─── Sample Document & Signature (base64) ────────────────────────────────────
// Minimal complete valid 1-page PDF accepted by UpdateStatus in the sandbox.
export const SAMPLE_PDF_BASE64 =
  'JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDNUMlQy' +
  'MFAqS60oKUpVslIqy0wpLU4tykvMTQUAVOsGCgplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjQ1CmVuZG9iagoxIDAgb2JqCjw8Ci9U' +
  'eXBlIC9DYXRhbG9nCi9QYWdlcyA0IDAgUgo+PgplbmRvYmoKNCAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzUgMCBSXQovQ291' +
  'bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDQgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9D' +
  'b250ZW50cyAyIDAgUgo+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMTYyIDAwMDAwIG4gCjAwMDAw' +
  'MDAwMTUgMDAwMDAgbiAKMDAwMDAwMDE0NSAwMDAwMCBuIAowMDAwMDAwMjEzIDAwMDAwIG4gCjAwMDAwMDAyNjggMDAwMDAgbiAKdHJh' +
  'aWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgozNjkKJSVFT0YK';

// Minimal valid 1x1 PNG signature image (base64).
export const SAMPLE_SIGNATURE_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
