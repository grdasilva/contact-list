import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service';
import { Router, NavigationExtras } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage {

	contacts;

	constructor(private router: Router, public toast: ToastService, public contactService: ContactService) { }

	ngOnInit() {
		this.contacts = this.contactService.contatos;
	}

	onLogout() {
		firebase.auth().signOut()
			.then(() => {
				this.router.navigateByUrl('login');
			})
			.catch(error => {
				this.toast.present(error.message);
			});
	}

	gerarDados(dado, index) {
		dado.id = index;
		let navigationExtras: NavigationExtras = {
		  queryParams: {
			special: JSON.stringify(dado)
		  }
		};
		this.router.navigate(['details'], navigationExtras);
	}


}
