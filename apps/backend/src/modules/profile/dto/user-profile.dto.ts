import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindProfileParamsDto {
  @IsString()
  username!: string;
}

export class RepositorySummaryDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string | null;

  @IsString()
  htmlUrl!: string;

  @IsInt()
  stargazersCount!: number;

  @IsInt()
  forksCount!: number;

  @IsString()
  @IsOptional()
  language!: string | null;

  @IsString()
  updatedAt!: string;
}

export class UserProfileDto {
  @IsString()
  username!: string;

  @IsString()
  name!: string | null;

  @IsString()
  avatarUrl!: string;

  @IsString()
  bio!: string | null;

  @IsString()
  location!: string | null;

  @IsString()
  company!: string | null;

  @IsString()
  blog!: string | null;

  @IsInt()
  publicRepos!: number;

  @IsInt()
  followers!: number;

  @IsInt()
  following!: number;

  @IsString()
  htmlUrl!: string;

  repositories!: RepositorySummaryDto[];
}
