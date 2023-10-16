import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const refreshAuthGuard = async () => {
  const authService = inject(AuthService);
  await authService.refresh();

  return true;
};
