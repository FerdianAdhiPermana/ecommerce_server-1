class response {
    constructor(status,msg,data){
        this.status = status
        this.msg = msg
        this.data = data
    }

    static onSuccess(msg,data){
        return new response(true,msg,data)
    }

    static onFailed(msg,data){
        let failed = new response(false,msg,null);
        delete failed["data"]
        return failed;
    }
}

module.exports = response