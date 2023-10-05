import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";

export const authGuard = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  await authService.refresh();

  if (!authService.loggedIn) {
    console.log('401');
    await router.navigateByUrl(`/login?redirect=${encodeURI(state.url)}`);
    return false;
  }

  if (!authService.hasRoles(route.data['allowedRoles'] ?? 1)) {
    console.log('403');
    await router.navigate(['/error?code=403']);
    return false;
  }

  return true;
};
