import { User } from 'modules/users/domain';

export type DoneFun = (err: Error | null, profile: User) => void;
