import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);

    let newReq = req.clone();
    const _router = inject(Router);

    let currentToken: string | null = localStorage.getItem('accessToken');

    if (currentToken) {
        newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentToken}`
            }
        });
    }

    return next(newReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                authService.logout();
                _router.navigate(['/auth/login']);
            }

            return throwError(error);
        })
    );
};