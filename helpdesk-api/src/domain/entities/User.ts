export class User {
  constructor(
    public id: string,
    public email: string,
    public passwordHash: string,
    public firstName: string,
    public lastName: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole = UserRole.AGENT,
  ): User {
    const now = new Date();
    return new User(
      '', // ID will be assigned by the repository
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      now,
      now,
    );
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  CUSTOMER = 'customer',
}
