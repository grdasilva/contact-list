import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../constants/contact.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class ContactService {

    contatos = [
        {
            "image": "../assets/imgs/avatar-finn.png",
            "nome": "Bruno Carvalho Cavalcanti",
            "telefone": 11940652922,
            "email": "BrunoCarvalhoCavalcanti@jourrapide.com"
        },
        {
            "image": "../assets/imgs/avatar-han.png",
            "nome": "André Rocha Martins",
            "telefone": 31935824859,
            "email": "AndreRochaMartins@jourrapide.com"
        },
        {
            "image": "../assets/imgs/avatar-ben.png",
            "nome": "Marcos Cavalcanti Melo",
            "telefone": 49946005501,
            "email": "MarcosCavalcantiMelo@dayrep.com"
        },
        {
            "image": "../assets/imgs/avatar-luke.png",
            "nome": "Davi Cunha Carvalho",
            "telefone": 19929033784,
            "email": "DaviCunhaCarvalho@armyspy.com"
        },
        {
            "image": "../assets/imgs/avatar-yoda.png",
            "nome": "Murilo Santos Rocha",
            "telefone": 28956929739,
            "email": "MuriloSantosRocha@rhyta.com"
        },
        {
            "image": "../assets/imgs/avatar-leia.png",
            "nome": "Lavinia Cavalcanti Rodrigues",
            "telefone": 21974852028,
            "email": "LaviniaCavalcantiRodrigues@dayrep.com"
        },
        {
            "image": "../assets/imgs/avatar-rey.png",
            "nome": "Brenda Ferreira Ribeiro",
            "telefone": 12968399059,
            "email": "BrendaFerreiraRibeiro@armyspy.com"
        }
    ];

    private dataUrl: string = './assets/contatos.json';

    constructor(private http: HttpClient) { }

    getData(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.dataUrl);
    }

    pushToArray(array, obj) {
        const index = array.findIndex((e) => e.id === obj.id);

        if (index === -1) {
            array.splice(obj);
        } else {
            array[index] = obj;
        }
    }

    removeContact(id) {
        this.contatos.splice(id, 1);
    }

    public updateContactList(contactObj) {
        this.pushToArray(this.contatos, contactObj);
    }


}