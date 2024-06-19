class TokenManager {
    constructor() {
      this.key = "access_token";
    }
  
    getToken() {
      return localStorage.getItem(this.key);
    }
  
    setToken(token) {
      localStorage.setItem(this.key, token);
    }
  }
  
  export default TokenManager;
  