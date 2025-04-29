export class Comment {
  constructor(
    public id: string,
    public ticketId: string,
    public userId: string,
    public content: string,
    public attachments: string[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(ticketId: string, userId: string, content: string): Comment {
    const now = new Date();
    return new Comment(
      '', // ID will be assigned by the repository
      ticketId,
      userId,
      content,
      [],
      now,
      now,
    );
  }

  public addAttachment(attachmentUrl: string): void {
    this.attachments.push(attachmentUrl);
    this.updatedAt = new Date();
  }
}
