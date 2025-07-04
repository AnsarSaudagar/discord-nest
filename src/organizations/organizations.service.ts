import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgMembersService } from './org_members/org_members.service';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private orgMembersService: OrgMembersService,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto, userId: number) {
    
    
    const organization = this.organizationRepository.create({
      ...createOrganizationDto,
      owner_id: userId,
    });
    
    const org = await this.organizationRepository.save(organization);
    
    this.orgMembersService.create({...createOrganizationDto, user_id: userId, organization_id: org.id});

    return org.id;
  }

  findAll(userId: number) {
    return this.organizationRepository.find({
      where: {
        owner_id: userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
