import { isIOS } from 'services/PlatformService';

export const defaultTransition = isIOS ? 'default' : 'fade_from_bottom';
