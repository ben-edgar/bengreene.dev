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
    expect(model.eyebrow).toBe('Family Invite');
    expect(model.title).toBe('Ben invited you to join a family group');
    expect(model.description).toBe(
      'DadTrack is available now on iOS and Android. Install the app on this device to continue with the invite flow.',
    );
    expect(model.reopenInstructions).toBe(
      'After installing DadTrack, reopen the original invite link from the message or email where it was shared to continue inside the app.',
    );
    expect(model.momTrackNote).toBe(
      'MomTrack support is still in development but coming soon! If you have a MomTrack beta test invite link, please use it to install MomTrack and then open the link again.',
    );
    expect(model.ctas.map(({ key }) => key)).toEqual(['android', 'ios']);
  });

  it('uses the senderless ready title when senderName is missing', () => {
    const model = buildInvitePageModel(
      {
        familyId: 'fam_123',
        inviteToken: 'abc123',
        senderName: null,
      },
      'other',
    );

    expect(model.variant).toBe('ready');
    expect(model.title).toBe('You were invited to join a family group');
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
    expect(model.eyebrow).toBe('Invite Link');
    expect(model.title).toBe('This invite link looks incomplete');
    expect(model.description).toBe(
      'The invite may have been copied without all of its details. Install DadTrack, then go back to the original message and open the full invite link again.',
    );
    expect(model.reopenInstructions).toBe(
      'After installing DadTrack, reopen the original invite link from the message or email where it was shared.',
    );
    expect(model.momTrackNote).toBe(
      'MomTrack support is coming soon. Invite links already reserve compatibility for MomTrack builds.',
    );
    expect(model.ctas.map(({ key }) => key)).toEqual(['ios', 'android']);
  });
});
