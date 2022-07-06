import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import KurbanService from "../../../services/BKurbanService";
import Loading from "../../components/Loading";
//import Video from "../components/Video";
import "../../../assets/css/KurbanInfo.css"

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

    setTarihThing()
    getKurban()
  }, [])

  return (

<>
  <div className={`${loading ? "hidden" : ""} w-full`}>
    <header className="bg-white flex justify-center p-4 shadow-lg">
      <span className="font-bold text-[#1BABB4] text-2xl">KURBAN BİLGİ EKRANI</span>
    </header>

    <div className="py-6 flex justify-center">
      <p className="text-xl font-semibold text-white drop-shadow-md tracking-wide">Kurban Bayramınız Mübarek Olsun</p>
    </div>

    <div className="grid grid-cols-2 gap-2 mx-2 md:mx-10 my-2">
      <div className="bg-[#F3FBFC] p-4 flex flex-col justify-center items-center">
        <p className="py-1 text-xl text-gray-600/70 font-medium">Tarih</p>
        <p className="py-1 text-xl  text-[#44bdc6] font-semibold">{tarih}</p>
      </div>
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
    </div>

    <div className="bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center">
        <h2 className="font-semibold text-gray-500 text-xl my-2">Bu Kurbanın Hissedarları</h2>
        <ul className="text-lg text-gray-600/70 font-medium">
          <li className="p-1">Siraceddin El</li>
          <li>Şahbil Uygur</li>
          <li>Soner</li>
          <li>Siraceddin El</li>
          <li>Şahbil Uygur</li>
          <li>Soner</li>
        </ul>
    </div>

    <div className={`${kurban?.kurban_image ? "" : "hidden"} bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center`}>
        <h2 className="font-semibold text-gray-500 text-xl my-2">Kurbanınız</h2>

        <div >
          <img src={kurban?.kurban_image} alt="kurban" className="w-full h-64"/>
        </div>
    </div>

    <div className="bg-[#F3FBFC] p-4 mx-2 md:mx-10 my-2 text-center">
        <h2 className="font-semibold text-gray-500 text-xl my-2">Bu Kurbanın Videosu</h2>

        {kurban?.video_path && <video width="750" height="500" controls>
                <source src={kurban?.video_path ? kurban?.video_path : ""} type="video/mp4" />
              </video>}
              
              
        <p className={`${kurban?.video_path ? "hidden" : ""} text-gray-400 text-sm`}>Kurbanınız kesildikten sonra kesim videosunu buradan izleyebilirsiniz..</p>
    </div>
  
  </div>

  <div className={` ${loading ? "" : "hidden"} py-10 text-lg`}>
      <Loading loading={loading} />
  </div>

  </>
  )
}