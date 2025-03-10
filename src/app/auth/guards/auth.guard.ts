import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = sessionStorage.getItem('accessToken');

  if(!token){
   return false;
  }
  return true;
};
