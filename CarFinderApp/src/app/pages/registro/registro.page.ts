import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registroForm.invalid) return;

    const { email, password } = this.registroForm.value;
    try {
      await this.authService.register(email, password);
      const toast = await this.toastController.create({
        message: 'Registro exitoso',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/login']);
    } catch (error: any) {
      const toast = await this.toastController.create({
        message: 'Error en el registro: ' + error.message,
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
