import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { SelectOption } from '@rfx/common';
import { ObjectId } from '@rfx/nst-db/mongo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getQueryExtension } from './functions/role-interceptor.functions';
import { Permission } from '@smc/api-common';

@Injectable()
export class GetSelectOptionsInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        getQueryExtension(context);
        return next.handle().pipe(
            map(options =>
                options.map(o => ({ value: o.value, label: o.label }) as SelectOption<ObjectId>)
            )
        );
    }
}
