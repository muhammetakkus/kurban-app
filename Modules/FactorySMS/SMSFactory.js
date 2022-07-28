import Ayfatel from './APIs/Ayfatel.js';
import Pusula from './APIs/Pusula.js';

class SMSFactory {    
    classes = { Ayfatel, Pusula };
    //classes = { "Ayfatel": Ayfatel, "Pusula": Pusula };
    
    constructor(name, user_name, password, origin) {       
        return new this.classes[name](user_name, password, origin);
    }
    
}

export default SMSFactory

/**
 * bu class gelen string isimde class'ı dynamic olarak üretir instance'ı return eder
 * dönen instancedan çalıştırılacak olan metod SMSInterface'de belli
 * yeni bir message api olduğunda APIs kalsöründe class yazılır buraya dahil edilir 
 */