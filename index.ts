import { AuthModule } from './auth/auth.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UserModule } from './user/user.module';
import { UnitModule } from './unit/unit.module';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { SpeciesModule } from './species/species.module';
import { KindModule } from './kind/kind.module';
import { CountryModule } from './country/country.module';
import { TagModule } from './tag/tag.module';
import { VarietyModule } from './variety/variety.module';
import { FieldModule } from './field/field.module';
import { CustomerContractModule } from './customer-contract/customer-contract.module';
import { ProductionAuthorizationModule } from './production-authorization/production-authorization.module';
import { GrowerContractModule } from './grower-contract/grower-contract.module';
import { LotModule } from './lot/lot.module';
import { LotEventModule } from './lot-event/lot-event.module';
import { MediaModule } from './media/media.module';
import { LotAttributeModule } from './lot-attribute/lot-attribute.module';
import { EventCategoryModule } from './event-category/event-category.module';
import { EventModule } from './event/event.module';
import { NotificationModule } from './notification/notification.module';
import { PlantSequenceModule } from './plant-sequence/plant-sequence.module';
import { SlidingScaleModule } from './sliding-scale/slidingScale.module';

export const controllerModules = [
    AuthModule,
    EnterpriseModule,
    NotificationModule,
    UserModule,
    UnitModule,
    CompanyModule,
    RoleModule,
    SpeciesModule,
    KindModule,
    CountryModule,
    EventModule,
    TagModule,
    VarietyModule,
    FieldModule,
    CustomerContractModule,
    ProductionAuthorizationModule,
    GrowerContractModule,
    LotModule,
    EventCategoryModule,
    LotAttributeModule,
    LotEventModule,
    MediaModule,
    PlantSequenceModule,
    SlidingScaleModule
];

export { RoleModule };
