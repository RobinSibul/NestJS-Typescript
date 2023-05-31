import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { getQueryExtension } from './functions/role-interceptor.functions';

@Injectable()
export class DeleteRolesInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        getQueryExtension(context);
        return next.handle();
    }
}
