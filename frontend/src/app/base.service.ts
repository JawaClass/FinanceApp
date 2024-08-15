import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  backend = "http://127.0.0.1:5000"

  httpClient = inject(HttpClient)
}
