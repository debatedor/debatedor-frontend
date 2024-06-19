import TokenManager from './components/TokenManager';

class Context {
    constructor(access_token){
        this.tokenManager = new TokenManager();
        this.access_token = this.tokenManager.getToken();
    }

    getAccessToken(){
        return this.access_token
    }

    setAccessToken(access_token){
        this.tokenManager.setToken(access_token);
    }
}

export const context = new Context()