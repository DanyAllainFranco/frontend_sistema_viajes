import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.css'],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public layoutService: LayoutService,
        private messageService: MessageService

    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            user_username: ['', [Validators.required]],
            user_password_hash: ['', [Validators.required]],
        });
    }

    
    onLogin(): void {
        if (this.loginForm.invalid) {
          this.messageService.add({
            key: 'tst',
            severity: 'warn',
            summary: 'Campos incompletos',
            detail: 'Por favor, completa todos los campos correctamente.',
          });
          return;
        }
      
        this.loading = true;
        this.errorMessage = '';
        const { user_username, user_password_hash } = this.loginForm.value;
      
        console.log('Datos enviados al backend:', { user_username, user_password_hash }); // Agregado para depuración
      
        this.authService.login(user_username, user_password_hash).subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/app']);
            this.messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Inicio de sesión exitoso',
              detail: '¡Bienvenido!',
            });
          },
          (error) => {
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: 'Error al iniciar sesión',
              detail: 'Correo o contraseña incorrectos.',
            });
          }
        );
      }
}
