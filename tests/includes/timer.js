//setTimeout is not available, hence this script was loaded
if(Promise === undefined && this.setTimeout === undefined){
    if(/\$DONE()/.test(code))
        $ERROR("Async test capability is not supported in your test environment");
}

if(Promise !== undefined && this.setTimeout === undefined) 
    (function(that){
       that.setTimeout = function(callback, delay) {
            let p = Promise.resolve();
            let start = Date.now();
            let end = start + delay;
            function check(){
                let timeLeft = end - Date.now();        
                if(timeLeft > 0)
                    p.then(check);
                else
                    callback();
            }        
            p.then(check);
        }
    })(this);
