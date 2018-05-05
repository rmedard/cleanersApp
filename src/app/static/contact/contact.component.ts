import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailsService} from '../../+services/emails.service';
import {Email} from '../../+models/email';
import {ProfessionsComponent} from '../../professions/professions.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  alerts: any[] = [];
  appEmail = environment.appEmail;

  constructor(private mailService: EmailsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      replyTo: ['', [Validators.required, Validators.email]],
      senderNames: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSendContactMessage() {
    const email = this.mapEmail();
    email.from = this.appEmail;
    email.to = this.appEmail;
    email.subject = 'Contact Email';
    this.mailService.sendEmail(email).subscribe(
      () => {
        this.contactForm.reset();
        this.alerts.push({
          type: 'success',
          msg: 'Your message has been sent successfully',
          dismissible: true
        });
      }, () => {
        this.alerts.push({
          type: 'danger',
          msg: 'Sending email failed...',
          dismissible: true
        });
      }
    );
  }

  onClosed(dismissedAlert: ProfessionsComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  private mapEmail() {
    const emailModel = this.contactForm.value;
    return {
      from: '',
      to: '',
      senderNames: emailModel.senderNames,
      replyTo: emailModel.replyTo,
      subject: '',
      body: emailModel.body,
      sent: false
    } as Email;
  }
}
