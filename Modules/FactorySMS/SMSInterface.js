/**
 * Abstract class'da metotların gövdeleri (yani implementasyonları) olabilir.
 * Interface'de metotların ancak imzaları bulunabilir.
 * Abstract class; constructor ve destructor içerebilir.
 * Interface; kurucu (constructor) veya yıkıcı (destructor) içeremez
 * 
 * Abstract class sınıfın ait olduğu kimliği belirtmek için kullanılır
 * Interface class sınıfın yapacağı kabiliyetleri belirtmek için kullanılır
 * 
 * Abstract classlar kısmi olarak implemente edilebilir
 * Interface class'ın barındırdığı tüm metodları, türeyen class implemente etmek zorundadır
 * */

class SMSInterface {
    constructor(user_name, password, origin) {
        this.user_name = user_name
        this.password = password
        this.origin = origin
    }
    send(gsm, message) {}
}

export default SMSInterface