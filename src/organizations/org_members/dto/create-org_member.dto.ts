export class CreateOrgMemberDto {
    user_id: number;
    organization_id: number;
    role?: number;
    status?: number;
    owner_id?: number;
}
