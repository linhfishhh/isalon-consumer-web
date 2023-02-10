import { getUUID } from 'utils/auth';
import { TENANT_ID } from 'utils/constants';

export default class AuthService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  login(userId, password, grantType) {
    const data = {
      tenantId: TENANT_ID,
      grantType,
      password,
      profileType: 'CONSUMER',
      externalId: userId,
      uuid: getUUID(),
    };
    return this.apiService.post('/user/login', data);
  }

  logout() {
    return this.apiService.post('/user/logout');
  }
}
