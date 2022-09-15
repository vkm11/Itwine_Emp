import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Client } from "../models/client.model";

@Injectable({
    providedIn:'root'
})
export class ClientService{
    baseUrl = 'http://localhost:3000/clientProfile';

    constructor(private http: HttpClient){}
    
    getClient(){
        return this.http.get<Client[]>(this.baseUrl)
    }
    postClient(client:Client){
        return this.http.post<Client>(this.baseUrl, client);
    }
    deleteClient(id:string){
        return this.http.delete(this.baseUrl + '/' + id)
    }
}