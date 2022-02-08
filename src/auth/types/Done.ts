import { UserDto } from 'modules/users/application/dto';

export type DoneFun = (err: Error | null, profile: UserDto) => void;
