export class CannedResponse {
  constructor(
    public id: string,
    public title: string,
    public emailResponse: string,
    public smsResponse: string | null,
    public status: CannedResponseStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    title: string,
    emailResponse: string,
    smsResponse: string | null = null,
  ): CannedResponse {
    const now = new Date();
    return new CannedResponse(
      '', // ID will be assigned by the repository
      title,
      emailResponse,
      smsResponse,
      CannedResponseStatus.ACTIVE,
      now,
      now,
    );
  }

  public updateStatus(status: CannedResponseStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}

export enum CannedResponseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
