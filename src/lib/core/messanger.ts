import { defineExtensionMessaging } from '@webext-core/messaging';
import { logger } from './logger';

import type { YaMusicTrackInfo } from './interfaces';

export interface ProtocolMap {
  getCurrentTrack(): YaMusicTrackInfo | undefined;
  updateBackgroundTrack(track: YaMusicTrackInfo): void;
  uploadLastfmCredentials(credentials: string): void;
}

export const messanger = defineExtensionMessaging<ProtocolMap>({ logger });