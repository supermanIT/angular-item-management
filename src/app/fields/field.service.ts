import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IField } from '../models/field.model';

@Injectable({
    providedIn: 'root'
  })
  export class FieldService {
    constructor(private httpClient: HttpClient) { }
  
    public getFields(){
      return this.httpClient.get(environment.apiUrl+"/field");
    }

    public updateField(fieldToUpdate: IField){
      return this.httpClient.put(environment.apiUrl+"/field", fieldToUpdate);
    }

    public createField(field: IField) {
      return this.httpClient.post(environment.apiUrl+"/field", field);
    }
    public addField(data){   
      return this.httpClient.post(`${environment.apiUrl}/field`,data);
    }
  }