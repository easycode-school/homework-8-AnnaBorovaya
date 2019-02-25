import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnLoginAnswer } from '../../interfaces/OnLoginAnswer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  /**
   * ngOnInit - создаем объект FormGroup в который передаем в виде ключ-значение
   * названия наших инпутов в которые присваиваим создание отдельного инпута new FormControl
   * в который в свою очередь передаем начальное знаечние и условия валидации
   */
  ngOnInit() {
    // Init form
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  /**
   * onLoginHundler - метод срабатывающий на сабмито кнопки
   * забирает значения у инпутов и вызывает метод login authService, который в свою очередь делает запрос на сервер
   * и передает туда наши значения инпутов
   * после получения ответа, в случае ошибки - выводим сообщение об ошибке
   * если нет ошибки, то происходит редирект на другую страницу
   */
  onLoginHundler() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(email, password).subscribe((data: OnLoginAnswer) => {
      if (data.error) {
        this.messageService.add({severity: 'error', summary: 'Server error', detail: data.message});
      } else {
        console.log('ok');
        
      }
    });
  }
}
