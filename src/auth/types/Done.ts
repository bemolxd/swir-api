import { AuthProfile } from './AuthProfile';

export type DoneFun = (err: Error | null, profile: AuthProfile) => void;
