import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; // 👈

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  user = {
    username: '',
    email: '',
    password: '',
    tel: '',
    adress: '',
    role: ''
  };

  constructor(private userService: UserService, private router: Router) {} // 👈

  register() {
    this.userService.register(this.user).subscribe({
      next: (response: any) => {
        alert("succeful user is register");
        this.router.navigate(['/login']);
        alert('Inscription réussie !');
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      },
      error: (error: any) => {
        console.error('Erreur inscription', error);
        const errorMsg = error.error?.message || error.statusText || 'Erreur inconnue';
        alert('Erreur inscription: ' + errorMsg);
      }
    });
  }
}
