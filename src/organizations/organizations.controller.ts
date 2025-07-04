import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CurrentUser, UserId } from '../user/auth/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @UserId() userId: number,
    @CurrentUser() user: User,
  ) {

    return this.organizationsService.create(createOrganizationDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@UserId() userId: number) {
    // console.log(this.organizationsService.findAllWithMembers(userId));
    
    return this.organizationsService.findAllWithMembers(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(+id);
  }
}
