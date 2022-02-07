export interface AuthProfile {
  service: string;
  attributes: UserAttributes;
  id: string;
  client_id: string;
}

interface UserAttributes {
  firstName: string;
  lastName: string;
  mail: string;
  personalNumber: string;
}
