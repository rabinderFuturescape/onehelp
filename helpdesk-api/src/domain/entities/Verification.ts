export class Verification {
  constructor(
    public id: string,
    public ticketId: string,
    public userId: string,
    public status: VerificationStatus,
    public rating: number | null,
    public feedback: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(ticketId: string, userId: string): Verification {
    const now = new Date();
    return new Verification(
      '', // ID will be assigned by the repository
      ticketId,
      userId,
      VerificationStatus.PENDING,
      null,
      null,
      now,
      now,
    );
  }

  public accept(rating: number, feedback?: string): void {
    this.status = VerificationStatus.ACCEPTED;
    this.rating = rating;
    this.feedback = feedback || null;
    this.updatedAt = new Date();
  }

  public reject(feedback: string): void {
    this.status = VerificationStatus.REJECTED;
    this.feedback = feedback;
    this.updatedAt = new Date();
  }
}

export enum VerificationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
