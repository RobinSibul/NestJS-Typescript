import {
    ExecutionContext,
    BadRequestException
} from '@nestjs/common';
import { RfxPermissionGroup } from '@rfx/common';
import { RfxRoleConstants } from '@rfx/nst-role';
import {
    EnterpriseIdentity,
    Permission,
    Role,
    getRoleQueryExtension
} from '@smc/api-common';

export function getQueryExtension(
    context: ExecutionContext
): void {
    const request = context.getArgByIndex(0);
    request.body[RfxRoleConstants.GetQueryExtension] =
        getRoleQueryExtension(
            !!request.user && !!request.user.enterpriseIdentity
                ? request.user.enterpriseIdentity
                : null
        );
}

export function addRoleCreationProperties(
    context: ExecutionContext
): void {
    const request = context.getArgByIndex(0);
    const properties: Partial<Role> = {
        enterpriseIdentity: new EnterpriseIdentity({
            _id: request.user.enterpriseIdentity._id,
            name: request.user.enterpriseIdentity.name
        }),
        shared: false
    };
    request.body[RfxRoleConstants.AdditionalCreationProperties] =
        properties;
}
