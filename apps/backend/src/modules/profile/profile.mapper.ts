import { RepositorySummaryDto, UserProfileDto } from './dto/user-profile.dto';
import { GithubRepoResponse, GithubUserResponse } from './interfaces/github-api.interface';

export class ProfileMapper {
  static toDomain(user: GithubUserResponse, repos: GithubRepoResponse[]): UserProfileDto {
    return {
      username: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      location: user.location,
      company: user.company,
      blog: user.blog,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      htmlUrl: user.html_url,
      repositories: repos.map((repo) => this.toRepoDomain(repo)),
    };
  }

  private static toRepoDomain(repo: GithubRepoResponse): RepositorySummaryDto {
    return {
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    };
  }
}
