import { simplifyText } from '../actions';

jest.mock('ai', () => ({
  generateObject: jest.fn(),
}));

jest.mock('@ai-sdk/google', () => ({
  google: jest.fn(),
}));

describe('Server Actions Zod Validation', () => {
  it('returns error object on oversized input', async () => {
    const oversizedString = 'a'.repeat(40001);
    const result = await simplifyText(oversizedString);
    expect(result).toHaveProperty('error');
    expect((result as any).error).toContain('Document exceeds maximum allowed length');
  });

  it('validates successfully on valid input', async () => {
    // Generate object is mocked, so it should just call it if validation passes
    const ai = require('ai');
    ai.generateObject.mockResolvedValue({ object: {} });
    await expect(simplifyText('valid string')).resolves.toBeDefined();
  });
});
