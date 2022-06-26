import mongoose from 'mongoose'

const EkranSchema = new mongoose.Schema({
    screen_title: String,
    type: String,
    //process_id: mongoose.Types.ObjectId, // Dynamic ise buna bağlı process 'i takip edecek
    static_screen_image: String, // Static Ekran ise burada ekran image
    project_id: mongoose.Types.ObjectId,
    kurum_id: mongoose.Types.ObjectId,
    process: {
        type: mongoose.Types.ObjectId,
        ref: "Process"
    },
    // self olan işlemler o anki durumda olanlar gösterilsin demek - parçalamada olanların parçalama adımında gösterilmesi gibi
    // self olmayanlar bir önceki process_order dan bil itibar gösteriliR - kesim sırasının kesim den bir önceki kayıt adımında sıradaki işlem kesim olacak gibi
    self: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('Ekran', EkranSchema)