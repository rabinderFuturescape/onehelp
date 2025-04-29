export class Role {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public permissions: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string,
    permissions: string[] = [],
  ): Role {
    const now = new Date();
    return new Role(
      '', // ID will be assigned by the repository
      name,
      description,
      permissions,
      now,
      now,
    );
  }

  public addPermission(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      this.updatedAt = new Date();
    }
  }

  public removePermission(permission: string): void {
    this.permissions = this.permissions.filter(p => p !== permission);
    this.updatedAt = new Date();
  }

  public hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}
