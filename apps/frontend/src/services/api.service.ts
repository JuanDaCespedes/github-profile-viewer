import { UserProfile } from '@/types/profile';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export class ApiService {
  static async fetchUserProfile(username: string): Promise<UserProfile> {
    const response = await fetch(`${BACKEND_URL}/user/${encodeURIComponent(username)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to load profile details');
    }

    return response.json();
  }
}
