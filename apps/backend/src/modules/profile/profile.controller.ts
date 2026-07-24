import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('user')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(@Param('username') username: string): Promise<UserProfileDto> {
    return this.profileService.getProfile(username);
  }
}
