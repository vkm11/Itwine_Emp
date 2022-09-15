import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map} from "rxjs/operators"
@Injectable({
    providedIn:'root'
})
export class ClientService{
    // deleteClient(id: any) {
    //   throw new Error('Method not implemented.');
    // }
    // baseUrl = 'http://localhost:3000/clientProfile';

    constructor(private http: HttpClient){}
    
    // getClient(){
    //     return this.http.get<Client[]>(this.baseUrl)
    // }

    // postClient(client:Client){
    //     return this.http.post<Client>(this.baseUrl, client);
    // }
    // deleteClient(id:string){
    //     return this.http.delete(this.baseUrl + '/' + id)
    // }

    postClient(data :any){
        return this.http.post<any>("http://localhost:3000/clientProfile", data)
        .pipe(map((res:any)=>{
          return res;
        }))
    }
    getClient(){
        return this.http.get<any>("http://localhost:3000/clientProfile")
        .pipe(map((res:any)=>{
          return res;
        }))
    }
    updateClient(data :any, id: number){
        return this.http.put<any>("http://localhost:3000/clientProfile/"+id,data)
        .pipe(map((res:any)=>{
          return res;
        }))
    }
    deleteClient(id : number){
      return this.http.delete<any>("http://localhost:3000/clientProfile/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
}