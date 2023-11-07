import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateChildFn {
  return () => {
    const authService = inject(AuthService)
    const router = inject(Router)
    console.log('executing the guards')
    const loggedIn = authService.isLoggedIn()
    if (!loggedIn) {
      router.navigate(['/sign-in'])
    }
    return loggedIn
  }
};
