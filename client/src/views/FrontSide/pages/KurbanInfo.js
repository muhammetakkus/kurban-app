import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import KurbanService from "../../../services/BKurbanService";
import Loading from "../../components/Loading";
import Video from "../components/Video";

export default function KurbanInfo() {
  let { kurban_code } = useParams();

  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    console.log(kurban_code)

    getKurban()
  }, [])

  return (
    <div className="flex justify-center">
      <div className={`${loading ? "hidden" : ""} w-full mx-2 lg:w-3/4 bg-white shadow overflow-hidden sm:rounded-lg`}>
        <div className="px-4 py-5 sm:px-6 lg:w-3/4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Kurban Bilgileriniz</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className={`${kurban?.kurban_image ? "" : "hidden"}`}>
              <img src={kurban?.kurban_image} alt="kurban" className="w-full h-64"/>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Kurban NO</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{kurban?.kurban_no}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Hisse Gurubu</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{kurban?.kurban_hisse_group}</dd>
            </div>
            <div className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${kurban?.net_hisse_fiyat ? "" : "!hidden"}`}>
              <dt className="text-sm font-medium text-gray-500">Net Hisse Fiyatı</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{kurban?.net_hisse_fiyat}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Kurbanınızın Şuanki Durumu</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{kurban?.kurban_process}</dd>
            </div>
            <div className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${kurban?.kurban_weight ? "" : "!hidden"}`}>
              <dt className="text-sm font-medium text-gray-500">Kurban KG</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{kurban?.kurban_weight}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Hissedarlar</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="-my-5 divide-y divide-gray-200">
                  {kurban?.hisse?.map(h => (
                    <li className="py-4" key={h._id}>
                      <span className="text-sm font-medium text-gray-900 truncate">{h.hissedar_full_name}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className={`bg-white px-4 py-5${loading === false && kurban?.video_path ? "" : "!hidden"}`}>
              <dt className="text-sm font-medium text-gray-500 mb-4">Kurban Kesim Videosu</dt>
              {kurban?.video_path && <Video path={`${process.env.REACT_APP_ENV === "dev" ? "http://localhost:3000/" : "https://kurbanapp.herokuapp.com/" }${kurban?.video_path}`}/>}
            </div>
          </dl>
        </div>
      </div>

      <div className={` ${loading ? "" : "hidden"} py-10 text-lg`}>
        <Loading loading={loading} />
      </div>
    </div>
  )
}