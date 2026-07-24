import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GithubRepoResponse, GithubUserResponse } from './interfaces/github-api.interface';

@Injectable()
export class GithubClient {
  private readonly baseUrl = 'https://api.github.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchUser(username: string): Promise<GithubUserResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GithubUserResponse>(`${this.baseUrl}/users/${username}`, {
          headers: this.getHeaders(),
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new HttpException(`GitHub user '${username}' not found`, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch user data from GitHub API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async fetchUserRepos(username: string, limit = 6): Promise<GithubRepoResponse[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GithubRepoResponse[]>(
          `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=${limit}`,
          { headers: this.getHeaders() },
        ),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  private getHeaders(): Record<string, string> {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    return {
      Accept: 'application/vnd.github.v3+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }
}
