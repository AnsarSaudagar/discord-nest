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
    
    // Add the owner as a member with OWNER role
    await this.orgMembersService.create({ 
      user_id: userId, 
      organization_id: org.id, 
      role: 3, // MemberRole.OWNER
      status: 1 // MemberStatus.ACTIVE
    });

    return org.id;
  }

  findAll(userId: number) {
    return this.organizationRepository.find({
      where: {
        owner_id: userId,
      },
      relations: ['owner'], // This will join with User entity
    });
  }

  // Method 2: Using QueryBuilder with joins
  async findAllWithMembers(userId: number) {
    const orgs = await this.organizationRepository
      .createQueryBuilder('org')
      .leftJoin('org_members', 'members', 'members.organization_id = org.id') // Join members
      .addSelect(['members.id', 'members.role', 'members.status']) // Select specific member fields
      .where('members.user_id = :userId', { userId })
      .getMany();
    
    console.log(orgs);
      
    return orgs;
  }

  // Method 3: Find organization with all members
  async findOneWithMembers(id: number) {
    return this.organizationRepository.findOne({
      where: { id },
      relations: ['owner'], // Join with owner
    });
  }

  // Method 4: Complex join with conditions
  async findOrganizationsWhereUserIsMember(userId: number) {
    return this.organizationRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.owner', 'owner')
      .innerJoin('org_members', 'members', 'members.organization_id = org.id')
      .where('members.user_id = :userId', { userId })
      .andWhere('members.status = :status', { status: 1 }) // Active members only
      .getMany();
  }

  findOne(id: number) {
    return this.organizationRepository.findOne({
      where: { id },
      relations: ['owner'], // Join with owner information
    });
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
