export interface Email {
  id: number;
  from: string;
  to: string;
  replyTo: string;
  senderNames: string;
  subject: string;
  body: string;
  sent: boolean;
  date?: Date;
}
