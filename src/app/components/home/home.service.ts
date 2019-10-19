import { Injectable } from '@angular/core';
import { Contact } from './../../constants/contact.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private dataUrl: string = './assets/contatos.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.dataUrl);
  }
}