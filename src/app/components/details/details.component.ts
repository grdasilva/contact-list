import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/constants/contact.interface';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  contactId;
  newContact = false;

  contactDetails: Contact = {
    name: null,
    phone: null,
    email: null,
    picture: null
  };


  constructor(private route: ActivatedRoute, private contactService: ContactService, 
    private router: Router, private alertCtrl : AlertController, private navCtrl : NavController,private loadingController : LoadingController) { }

  ngOnInit() {

    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.loadContact();
    } else {
      this.newContact = true;
    }
      // this.contacts$ = this.contactService.getData();
  }

  contact = new FormGroup({
    name: new FormControl(this.contactDetails.name),
    phone: new FormControl(this.contactDetails.phone),
    email: new FormControl(this.contactDetails.email)
  });

  async loadContact() {
    const loading = await this.loadingController.create({
      message: 'Loading Contact..'
    });
    await loading.present();

    this.contactService.getContact(this.contactId).subscribe(res => {
      loading.dismiss();
      this.contactDetails = res;
    })
  }

  async saveContact() {
    const loading = await this.loadingController.create({
      message: 'Saving Contact..'
    });
    await loading.present();

    //Editar Contato
    if (this.contactId) {
      this.contactService.updateContact(this.contactDetails, this.contactId).then(() => {
        loading.dismiss();
        this.navCtrl.back();
      })

    //Adicionar novo contato
    } else {
      this.contactService.addContact(this.contactDetails).then(() => {
        loading.dismiss();
        this.navCtrl.back();
      })
    }
  }

  async removeData () { 
    const alert = await this.alertCtrl.create({
      header: 'Deseja deletar este contato?',
      message: 'Ação não poderá ser revertida!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Apagar',
          handler: () => {
            this.contactService.removeContact(this.contactId);
            this.navCtrl.back();
          }
        }
      ]
    });
    await alert.present();
  }
}
