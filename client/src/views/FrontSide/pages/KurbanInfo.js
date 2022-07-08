import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import KurbanService from "../../../services/BKurbanService";
import Loading from "../../components/Loading";
//import Video from "../components/Video";
import "../../../assets/css/KurbanInfo.css"

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

export default function KurbanInfo() {
  let { kurban_code } = useParams();

  const [loading, setLoading] = useState(true)
  const [tarih, setTarih] = useState('')
  const [kurban, setKurban] = useState({})
  
  const getKurban = async () => {
    const kurbanInfo = await KurbanService.getKurbanInfo(kurban_code)
    setKurban(kurbanInfo.data[0])
    //console.log(kurbanInfo.data[0])

    setKurban((state) => {
      console.log(state);
      setLoading(false)
      return state;
    });
  }

  const setTarihThing = () => {
    const tarih = new Date();
    const gunler = ["Pzr", "Ptesi", "Salı", "Çrş", "Perş", "Cuma", "Ctesi"];
    const dayName = gunler[tarih.getDay()]
    const day = tarih.getDate().toString().padStart(2, "0");
    const month = (tarih.getMonth() + 1).toString().padStart(2, "0");
    const year = tarih.getFullYear()

    setTarih(day + "." + month + "." + year + ", " + dayName)
  }

  useEffect(() => {
    console.log(kurban_code)
    console.log(tarih)

    setTarihThing()
    getKurban()
  }, [])

  return (

<>
  <div className={`kurban-info-wrapper ${loading ? "hidden" : ""} w-full pb-8 mb-5`}>
    <header className="bg-white flex justify-center p-4 shadow-lg">
      <span className="font-bold text-[#1BABB4] text-2xl">KURBAN BİLGİ EKRANI</span>
    </header>

    <div className="py-6 flex justify-center">
      <p className="text-xl font-semibold text-white drop-shadow-md tracking-wide">Kurban Bayramınız Mübarek Olsun</p>
    </div>

    <div className="grid grid-cols-2 gap-2 mx-2 md:mx-10 my-2">
      {/*<div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Tarih</p>
        <p className="py-1 text-xl  text-[#44bdc6] font-semibold">{tarih}</p>
      </div>*/}
      <div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Kurban No</p>
        <p className="py-1 text-xl text-[#44bdc6] font-semibold">{kurban?.kurban_no}</p>
      </div>
      <div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Hisse Grubu</p>
        <p className="py-1 text-xl text-[#44bdc6] font-semibold">{kurban?.kurban_hisse_group}</p>
      </div>
      <div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Durumu</p>
        <p className="py-1 text-xl text-[#44bdc6] font-semibold">{kurban?.process?.process_title}</p>
      </div>
      <div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Net Hisse Fiyatı</p>
        <p className="py-1 text-xl text-[#44bdc6] font-semibold">{kurban?.net_hisse_fiyat} ₺</p>
      </div>
    </div>

    <div className="bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center">
        <h2 className="font-semibold text-gray-500 text-xl my-2">Bu Kurbanın Hissedarları</h2>
        <ul className="text-lg text-gray-600/70 font-medium">
          {kurban?.hisse?.map(hissedar => (
            <li key={hissedar._id} className="p-1">{hissedar.hissedar_full_name}</li>
          ))}
        </ul>
    </div>

    <div className={`${kurban?.kurban_image ? "" : "hidden"} bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center`}>
        <h2 className="font-semibold text-gray-500 text-xl my-2">Kurbanınız</h2>

        <div >
          <img src={kurban?.kurban_image} alt="kurban" className="w-full md:max-w-3xl mx-auto h-auto"/>
        </div>
    </div>

    

    <div className={`${(kurban?.youtube_embed || kurban?.video_path) ? "hidden" : ""} bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center !mb-5`}>
      <p className={`text-gray-400 text-sm`}>Kurbanınız kesildikten sonra kesim videosunu buradan izleyebilirsiniz..</p>
    </div>
    
    <div className={`${kurban?.youtube_embed ? "" : "hidden"} bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center !mb-5`}>
        <h2 className="font-semibold text-gray-500 text-xl my-2">Bu Kurbanın Videosu</h2>
        
        <div className="overflow-hidden relative mx-auto">
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${kurban?.youtube_embed}`} 
          className="mx-auto"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
        </div>
        
    </div>
    
    <div className={`${kurban?.video_path ? "" : "hidden"} bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center !mb-5`}>
        <h2 className="font-semibold text-gray-500 text-xl my-2">Bu Kurbanın Videosu</h2>

        {/*kurban?.video_path && <video width="800" height="500" controls className="mx-auto">
                <source src={kurban?.video_path ? kurban?.video_path : ""} type="video/mp4" />
          </video>*/}
        
        {kurban?.video_path && <Video autoPlay width="800" className="max-w-3xl mx-auto"
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="https://images.unsplash.com/photo-1502590464431-3b66d77494d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src={kurban?.video_path ? kurban?.video_path : ""} type="video/mp4" />
          </Video>}       
    </div>
  
  </div>

  <div className={` ${loading ? "" : "hidden"} py-10 text-lg  font-semibold`}>
      <Loading loading={loading} className=" tracking-wider" />
  </div>

  </>
  )
}