import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyLogoService extends BaseService {


  getCompanyLogo(name: string) {
    const url = `${this.backend}/company_logo`
    let params = new HttpParams()
      .set('name', name)
    return this.httpClient.get(url, { params })
  }

}
