import { Injectable } from '@nestjs/common';
import { GithubClient } from './github-client.service';
import { ProfileMapper } from './profile.mapper';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly githubClient: GithubClient) {}

  async getProfile(username: string): Promise<UserProfileDto> {
    const userRaw = await this.githubClient.fetchUser(username);
    const reposRaw = await this.githubClient.fetchUserRepos(username);
    return ProfileMapper.toDomain(userRaw, reposRaw);
  }
}
