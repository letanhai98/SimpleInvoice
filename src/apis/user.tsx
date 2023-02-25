import instance from './instance';
import querystring from 'querystring';

export const userApi = {
  fetchToken: (data?: {
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope: string;
    username: string;
    password: string;
  }) =>
    instance
      .post<TDataFetchToken>(`/token`, querystring.stringify(data), {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
      .then(res => res.data),
  getMe: (data?: { access_token: string }) =>
    instance
      .get(`/membership-service/1.2.0/users/me`, {
        headers: { Authorization: `Bearer ${data?.access_token}` },
      })
      .then(res => res.data),
};
