import TokenManager from './components/TokenManager';

class Context {
    constructor(access_token){
        this.tokenManager = new TokenManager();
    }

    getAccessToken(){
        return this.tokenManager.getToken();
    }

    setAccessToken(access_token){
        this.tokenManager.setToken(access_token);
    }
}

export const context = new Context()