import { PartialType } from '@nestjs/mapped-types';
import { CreateOrgMemberDto } from './create-org_member.dto';

export class UpdateOrgMemberDto extends PartialType(CreateOrgMemberDto) {}
