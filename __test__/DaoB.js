class DAOB  {


    constructor() {
    }

    setCondition(condition) {
        this.condition=condition;
    }

    getData(condition,timout) {
        this.setCondition(condition);
        let that=this;
        let originalCondition=this.condition;
        let wait;
        let promiseB = new Promise((resolve, reject) => {
            wait = setTimeout(() => {
            //global.clearTimout(wait);
            if(originalCondition!=that.condition) {
                reject("condition have been changed by other thread. expected:"+originalCondition+", but got:"+that.condition);
            }else {
            resolve(that.condition);
            }
            }, timout)
        });
        return promiseB;
    }

}

module.exports=DAOB;