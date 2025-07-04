import { Test, TestingModule } from '@nestjs/testing';
import { OrgMembersController } from './org_members.controller';
import { OrgMembersService } from './org_members.service';

describe('OrgMembersController', () => {
  let controller: OrgMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgMembersController],
      providers: [OrgMembersService],
    }).compile();

    controller = module.get<OrgMembersController>(OrgMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
