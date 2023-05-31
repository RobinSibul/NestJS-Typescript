import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { getQueryExtension } from './functions/role-interceptor.functions';
import { Observable } from 'rxjs';

@Injectable()
export class EditRoleInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        getQueryExtension(context);
        return next.handle();
    }
}
