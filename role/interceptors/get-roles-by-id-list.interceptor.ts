import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { getQueryExtension } from './functions/role-interceptor.functions';
import { Permission, Role } from '@smc/api-common';
import { Observable } from 'rxjs';

@Injectable()
export class GetRolesByIdListInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        getQueryExtension(context);
        return next.handle();
    }
}
