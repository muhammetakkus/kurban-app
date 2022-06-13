import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    project_name: String,
    kurum_id: mongoose.Types.ObjectId,
    uniq_project_code: String,
}, {timestamps: true})

// ters project.kurum işlemini yapmak için 
/*ProjectSchema.virtual('kurum',{ // project.kurum şeklinde ulaşmak için (const project = bla bla dan sonra) - populate a gerek kalmadan
    ref:'Kurum',
    localField:'_id',
    foreignField:'projects'
})*/


ProjectSchema.pre('save', async function (next) {
    const proje = this

    // gelen project kaydını yapmadan önce .previous şu fonksiyonu çalıştır - this ile objedeki fieldlara erişilebiliyor
    
    next();
})

// proje kaldırırken istediğin işlemi yap
ProjectSchema.pre('remove', async function (next) {
    //await Kurban.remove({key: this._id}) // tabi Kurban modal'ı import et
    next();
})

export default mongoose.model('Project', ProjectSchema)