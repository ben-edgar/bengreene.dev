import { getTrackedStoreCtas, type StorePlatform } from './storeCtas';

export type InviteLinkParams = {
  familyId: string | null;
  inviteToken: string | null;
  senderName: string | null;
};

export type InvitePageModel = {
  variant: 'ready' | 'invalid';
  eyebrow: string;
  title: string;
  description: string;
  reopenInstructions: string;
  momTrackNote: string;
  ctas: ReturnType<typeof getTrackedStoreCtas>;
};

type SearchParamsLike = {
  get(name: string): string | null;
};

function normalizeParam(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function parseInviteSearchParams(
  params: URLSearchParams | SearchParamsLike,
): InviteLinkParams {
  return {
    familyId: normalizeParam(params.get('familyId')),
    inviteToken: normalizeParam(params.get('inviteToken')),
    senderName: normalizeParam(params.get('senderName')),
  };
}

export function hasRequiredInviteParams(params: InviteLinkParams): boolean {
  return Boolean(params.familyId && params.inviteToken);
}

export function buildInvitePageModel(
  params: InviteLinkParams,
  platform: StorePlatform,
): InvitePageModel {
  const ctas = getTrackedStoreCtas(platform);

  if (!hasRequiredInviteParams(params)) {
    return {
      variant: 'invalid',
      eyebrow: 'Invite Link',
      title: 'This invite link looks incomplete',
      description:
        'The invite may have been copied without all of its details. Install DadTrack, then go back to the original message and open the full invite link again.',
      reopenInstructions:
        'After installing DadTrack, reopen the original invite link from the message or email where it was shared.',
      momTrackNote:
        'MomTrack support is coming soon. Invite links already reserve compatibility for MomTrack builds.',
      ctas,
    };
  }

  const inviter = params.senderName
    ? `${params.senderName} invited you`
    : 'You were invited';

  return {
    variant: 'ready',
    eyebrow: 'Family Invite',
    title: `${inviter} to join a family group`,
    description:
      'DadTrack is available now on iOS and Android. Install the app on this device to continue with the invite flow.',
    reopenInstructions:
      'After installing DadTrack, reopen the original invite link from the message or email where it was shared to continue inside the app.',
    momTrackNote:
      'MomTrack support is coming soon. The deep-link association files already support MomTrack installs when that app is ready.',
    ctas,
  };
}
