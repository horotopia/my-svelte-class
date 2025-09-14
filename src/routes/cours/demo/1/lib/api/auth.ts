const API_BASE_URL = 'https://dummyjson.com/auth';

export async function fetchAuth(username: string, password: string) {
  try {
    const response = await fetch(API_BASE_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Failed to fetch auth:', error);
    return [];
  }
}