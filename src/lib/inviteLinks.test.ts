import { describe, expect, it } from 'vitest';
import {
  buildInvitePageModel,
  hasRequiredInviteParams,
  parseInviteSearchParams,
} from './inviteLinks';

describe('invite links', () => {
  it('parses the invite params and trims senderName', () => {
    const params = new URLSearchParams({
      familyId: 'fam_123',
      inviteToken: 'abc123',
      senderName: ' Ben ',
    });

    expect(parseInviteSearchParams(params)).toEqual({
      familyId: 'fam_123',
      inviteToken: 'abc123',
      senderName: 'Ben',
    });
  });

  it('treats empty strings as missing values', () => {
    const params = new URLSearchParams({
      familyId: '',
      inviteToken: '   ',
      senderName: '  ',
    });

    expect(parseInviteSearchParams(params)).toEqual({
      familyId: null,
      inviteToken: null,
      senderName: null,
    });
  });

  it('requires both familyId and inviteToken for a valid invite', () => {
    expect(
      hasRequiredInviteParams({
        familyId: 'fam_123',
        inviteToken: 'abc123',
        senderName: 'Ben',
      }),
    ).toBe(true);

    expect(
      hasRequiredInviteParams({
        familyId: 'fam_123',
        inviteToken: null,
        senderName: 'Ben',
      }),
    ).toBe(false);
  });

  it('orders Google Play first for Android while preserving the recovery instructions', () => {
    const model = buildInvitePageModel(
      {
        familyId: 'fam_123',
        inviteToken: 'abc123',
        senderName: 'Ben',
      },
      'android',
    );

    expect(model.variant).toBe('ready');
    expect(model.title).toContain('Ben');
    expect(model.ctas[0].key).toBe('android');
    expect(model.reopenInstructions).toContain('reopen the original invite link');
    expect(model.momTrackNote).toContain('MomTrack support is coming soon');
  });

  it('falls back to an invalid-link state when required params are missing', () => {
    const model = buildInvitePageModel(
      {
        familyId: null,
        inviteToken: null,
        senderName: null,
      },
      'other',
    );

    expect(model.variant).toBe('invalid');
    expect(model.title).toContain('invite link looks incomplete');
    expect(model.ctas[0].key).toBe('ios');
  });
});
