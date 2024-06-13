class Context {
    constructor(access_token){
        this.access_token = access_token
    }

    getAccessToken(){
        return this.access_token
    }

    setAccessToken(access_token){
        this.access_token = access_token
    }
}

export const context = new Context()