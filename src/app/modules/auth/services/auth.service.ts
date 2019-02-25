import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnLoginAnswer } from './../interfaces/OnLoginAnswer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) {}

  /**
   * login - метод в котором мы направляем на сервер запрос с данными
   * введенными пользователем при login 
   * в случае успешного ответа мы записываем данные в localStorage
   * и возвращаем ответ
   */
  login(email: string, password: string): Observable<OnLoginAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/login`, { email, password }, httpOptions).pipe(
      map((res: OnLoginAnswer): OnLoginAnswer => {
        if (!res.error) {
          localStorage.setItem('mlp_client_id', res.id);
          localStorage.setItem('mlp_client_token', res.token);
        }
        return res;
      })
    );
  }
  /**
   * onSignUp - метод в котором мы направляем на сервер запрос с данными
   * введенными пользователем при SignUp 
   * и возвращаем ответ
   */
  onSignUp(dataUser): Observable<OnLoginAnswer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<OnLoginAnswer>(`${this.apiUrl}/public/auth/signup`, dataUser, httpOptions)
  }
}
