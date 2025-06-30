export class CreateOrganizationDto {
    name: string;
    description?: string;
    owner_id: number;
    allow_public_join?: boolean;
    require_approval?: boolean;
}
