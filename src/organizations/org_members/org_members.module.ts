import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgMembersService } from './org_members.service';
import { OrgMembersController } from './org_members.controller';
import { OrgMember } from './entities/org_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgMember])],
  controllers: [OrgMembersController],
  providers: [OrgMembersService],
  exports: [OrgMembersService],
})
export class OrgMembersModule {}
