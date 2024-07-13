
export type GoogleProfileResponse = {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  locale: string
  name: string
  picture: string
  sub: string
}
export const getGoogleProfile = async (accessToken: string) => {
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profileData = await response.json();
    return profileData as GoogleProfileResponse;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};