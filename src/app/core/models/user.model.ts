export interface User {
  id: string;
  email: string;
  name: string;
}

export interface MockUser extends User {
  password: string;
}
