import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrgMembersService } from './org_members.service';
import { CreateOrgMemberDto } from './dto/create-org_member.dto';
import { UpdateOrgMemberDto } from './dto/update-org_member.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/user/auth/user.decorator';
import { MemberRole, MemberStatus } from './entities/org_member.entity';

@Controller('org-members')
export class OrgMembersController {
  constructor(private readonly orgMembersService: OrgMembersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOrgMemberDto: any, @UserId() userId: number) {
    const data = {
      ...createOrgMemberDto,
      role: MemberRole.MEMBER,
      status: MemberStatus.ACTIVE,
    }
    return this.orgMembersService.create(data);
  }

  @Get()
  findAll() {
    return this.orgMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrgMemberDto: UpdateOrgMemberDto) {
    return this.orgMembersService.update(+id, updateOrgMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orgMembersService.remove(+id);
  }
}
