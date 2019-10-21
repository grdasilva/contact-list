import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/constants/contact.interface';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  contactF;

  contactDetails = {
    id: null,
    nome: null,
    telefone: null,
    email: null
  };


  constructor(private route: ActivatedRoute, private contactService: ContactService, 
    private router: Router, private alertCtrl : AlertController, private nav: NavController) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.contactDetails = JSON.parse(params.special);
      }
    });
    
      this.contacts$ = this.contactService.getData();
  }

  contact = new FormGroup({
    nome: new FormControl(this.contactDetails.nome),
    telefone: new FormControl(this.contactDetails.telefone),
    email: new FormControl(this.contactDetails.email)
  });

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
            this.contactService.removeContact(this.contactDetails.id);
            this.nav.back();
          }
        }
      ]
    });
    await alert.present();
  }

  saveContact() {
    var contactObj = this.contact.value;
    this.contactService.updateContactList(contactObj);
    this.nav.back();
  }

}
