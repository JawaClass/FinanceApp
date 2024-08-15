import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CompanyLogoService } from '../company-logo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-logo',
  standalone: true,
  imports: [],
  templateUrl: './company-logo.component.html',
  styleUrl: './company-logo.component.css'
})
export class CompanyLogoComponent {
  protected website!: string
  private _companyName?: string
  url?: string
  @Input({ required: true })
  set companyName(value: string | undefined) {
    this.website = value!!
    this._companyName = value?.replace("https://www.", "").replace("http://www.", "")
    this.url = `http://localhost:5000/company_logo?domain_name=${this._companyName}`
  }

  get companyName() {
    return this._companyName
  }
}
