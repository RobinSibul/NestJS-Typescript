import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { addRoleCreationProperties } from './functions/role-interceptor.functions';
import { Observable } from 'rxjs';

@Injectable()
export class CreateRoleInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        /*
            Role properties will be white-listed by dto built in to
            the RfxRole Module. The dto can have no awareness of
            application specific role properties, so those need to
            be provided separately.
        */
        addRoleCreationProperties(context);
        return next.handle();
    }
}
