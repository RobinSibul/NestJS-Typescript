import { Module } from '@nestjs/common';
import { RfxRoleControllerTokens } from '@rfx/nst-role';
import { CreateRoleInterceptor } from './interceptors/create-role.interceptor';
import { EditRoleInterceptor } from './interceptors/edit-role.interceptor';
import { DeleteRolesInterceptor } from './interceptors/delete-roles.interceptor';
import { GetRolesInterceptor } from './interceptors/get-roles.interceptor';
import { GetRoleByIdInterceptor } from './interceptors/get-role-by-id.interceptor';
import { GetGridRolesInterceptor } from './interceptors/get-grid-roles.interceptor';
import { GetSelectOptionsInterceptor } from './interceptors/get-select-options.interceptor';
import { GetRolesByIdListInterceptor } from './interceptors/get-roles-by-id-list.interceptor';

@Module({
    providers: [
        {
            provide: RfxRoleControllerTokens.createRoleInterceptor,
            useClass: CreateRoleInterceptor
        },
        {
            provide: RfxRoleControllerTokens.editRoleInterceptor,
            useClass: EditRoleInterceptor
        },
        {
            provide: RfxRoleControllerTokens.deleteRolesInterceptor,
            useClass: DeleteRolesInterceptor
        },
        {
            provide: RfxRoleControllerTokens.getRolesInterceptor,
            useClass: GetRolesInterceptor
        },
        {
            provide: RfxRoleControllerTokens.getRoleByIdInterceptor,
            useClass: GetRoleByIdInterceptor
        },
        {
            provide: RfxRoleControllerTokens.getGridRolesInterceptor,
            useClass: GetGridRolesInterceptor
        },
        {
            provide: RfxRoleControllerTokens.getSelectOptionsInterceptor,
            useClass: GetSelectOptionsInterceptor
        },
        {
            provide: RfxRoleControllerTokens.getRolesByIdListInterceptor,
            useClass: GetRolesByIdListInterceptor
        }
    ],
    exports: [
        RfxRoleControllerTokens.createRoleInterceptor,
        RfxRoleControllerTokens.editRoleInterceptor,
        RfxRoleControllerTokens.deleteRolesInterceptor,
        RfxRoleControllerTokens.getRolesInterceptor,
        RfxRoleControllerTokens.getRoleByIdInterceptor,
        RfxRoleControllerTokens.getGridRolesInterceptor,
        RfxRoleControllerTokens.getSelectOptionsInterceptor,
        RfxRoleControllerTokens.getRolesByIdListInterceptor
    ]
})
export class RoleModule {}
