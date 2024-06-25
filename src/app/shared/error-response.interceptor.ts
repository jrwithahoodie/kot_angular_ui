import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { catchError, throwError } from "rxjs"

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => 
    next(req).pipe(catchError(handleErrorResponse))

function handleErrorResponse(error: HttpErrorResponse) {
    const errorResponse = `Error ${error.status}, ${error.message}`;

    return throwError(() => errorResponse);
}