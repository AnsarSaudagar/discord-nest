import { Injectable } from '@nestjs/common';
import { CreateOrgMemberDto } from './dto/create-org_member.dto';
import { UpdateOrgMemberDto } from './dto/update-org_member.dto';
import { MemberRole, MemberStatus, OrgMember } from './entities/org_member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class OrgMembersService {
  constructor(
    @InjectRepository(OrgMember)
    private orgMemberRepository: Repository<OrgMember>,
  ) {}

  create(createOrgMemberDto: CreateOrgMemberDto) {


    const data = {
      user_id: createOrgMemberDto.user_id,
      organization_id: createOrgMemberDto.organization_id,
      role :createOrgMemberDto.role || MemberRole.MEMBER,
      status: createOrgMemberDto.status || MemberStatus.ACTIVE,
    }
    
    return this.orgMemberRepository.save(data);
  }

  findAll() {
    return `This action returns all orgMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orgMember`;
  }

  update(id: number, updateOrgMemberDto: UpdateOrgMemberDto) {
    return `This action updates a #${id} orgMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} orgMember`;
  }
}
