import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnLoginAnswer } from '../../interfaces/OnLoginAnswer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  public SignUpForm: FormGroup;
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
    this.SignUpForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      "password": new FormControl('', [Validators.required, Validators.minLength(5)]),
      'nickname': new FormControl('', [Validators.required]),
      'first_name': new FormControl('', [Validators.required]),
      'last_name': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required]),
      'gender_orientation': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'date_of_birth_day': new FormControl('', [Validators.required]),
      'date_of_birth_month': new FormControl('', [Validators.required]),
      'date_of_birth_year': new FormControl('', [Validators.required]),
    });
  }

  /**
   * onSignUpHandler - метод срабатывающий на сабмит кнопки
   * забирает значения у инпутов и вызывает метод onSignUp authService, который в свою очередь делает запрос на сервер
   * и передает туда наши значения инпутов
   * после получения ответа, в случае ошибки - выводим сообщение об ошибке
   * если нет ошибки, то выводим сообщение об успешной регистрации
   * и редиректим на нужную нам страницу
   */
  onSignUpHandler() {
    const dataUser = {
      email: this.SignUpForm.get('email').value,
      password: this.SignUpForm.get('password').value,
      nickname: this.SignUpForm.get('nickname').value,
      first_name: this.SignUpForm.get('first_name').value,
      last_name: this.SignUpForm.get('last_name').value,
      phone: this.SignUpForm.get('phone').value,
      gender_orientation: this.SignUpForm.get('gender_orientation').value,
      city: this.SignUpForm.get('city').value,
      country: this.SignUpForm.get('country').value,
      date_of_birth_day: this.SignUpForm.get('date_of_birth_day').value,
      date_of_birth_month: this.SignUpForm.get('date_of_birth_month').value,
      date_of_birth_year:  this.SignUpForm.get('date_of_birth_year').value
    };

    this.authService.onSignUp(dataUser).subscribe((data: OnLoginAnswer) => {
      if (data.error) {
        this.messageService.add({severity: 'error', summary: 'Server error', detail: data.message});
      } else {
        this.messageService.add({severity: 'success', summary: 'Server error', detail: data.message});
        // redirect
      }
    });
  }
}
