import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Icon } from "../../../../../utils/SVG"
import Loading from "../../../../components/Loading"
import Title from "./Title"
import SMSService from "../../../../../services/SMSService"
import { useDispatch, useSelector } from "react-redux"
import KurumService from "../../../../../services/KurumService"
import {setActiveSMSAPI} from "../../../../../store/reducers/auth"
import Modal from "../../../../molecules/modal"

export default function MessageSettings(props) {
    const kurum = useSelector((state) => state.auth.kurum)
    const dispatch = useDispatch()
    const [deleteLoading, setDeleteLoading] = useState('');
    const [deleteObj, setDeleteObj] = useState({});
    const [isModal, setModal] = useState({isOpen: false, title: '', message: ''});
    const [loading, setLoading] = useState(true)
    const [sms, setSMS] = useState([])
    

    const getSMSServices = async () => {
        const getSms = await SMSService.getAll({kurum_id: kurum._id})
        console.log(getSms.data)
        setSMS(getSms.data)
        setLoading(false)
    }

    const setSMSService = async (active_sms_api) => {
      const data = {
        _id: kurum._id,
        active_sms_api: active_sms_api
      }

      console.log(data)

      const update = await KurumService.update(data)
       dispatch(setActiveSMSAPI(update.data.active_sms_api))

    }

  useEffect(() => {
      console.log(kurum)
      getSMSServices()
  }, [])

  
 const askModal = (item) => {
    console.log(item)
    setDeleteObj({})
    setDeleteObj(item)
    setModal({isOpen: true, title: 'SMS API Sil', message: `[${item.message_api?.message_service_title}] - ait SMS API bilgilerini silmek istediğinize emin misiniz?`})
  }

  const modalResult = async (result) => {

    setModal({isOpen: false})

    if(result) {
      setDeleteLoading(deleteObj._id)
      const deleteRecord = await SMSService.delete(deleteObj._id);
      if(deleteRecord.status === 200) {
        setSMS( sms.filter( e => e._id !== deleteRecord.data._id  ) );
        setDeleteLoading(false)
      }
    }
  }

    return (
        <section className={`card p-4 ${props.className} `}>
            <div className="flex items-center mb-4">
                <Title title="Mesaj Ayarları" />
                <div className="flex flex-grow justify-end">
                    <NavLink to={'/kurum/new-message-api'}>Yeni SMS API+</NavLink>
                </div>
            </div>

            <div className="w-full overflow-hidden rounded-lg shadow-xs border-[1px] border-gray-400/20">
              <div className={`${loading || sms.length === 0 ? "hidden" : ""} w-full overflow-x-auto`}>
                <table className="w-full whitespace-no-wrap  ">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800" lang="tr" >
                      <th className="px-4 py-3 text-center">Mesaj API</th>
                      <th className="px-4 py-3 text-center">Mesaj Başlığı/Originator</th>
                      <th className="px-4 py-3 text-center" colSpan={3}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {sms && sms.map((item, index) =>  (
                      <tr className="text-gray-700 dark:text-gray-400" key={item._id}>
                        <td className="px-2 py-2 text-l text-center">
                          <span>{item.message_api?.message_service_title}</span>
                        </td>
                        <td className="px-2 py-2 text-l text-center">
                          <span>{item.message_service_origin}</span>
                        </td>
                        <td className="py-2 text-sm">
                          <div className='flex items-center justify-end mr-3'>
                            <div className="p-2 cursor-pointer text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                              <NavLink to={"/kurum/edit-sms-api"} state={item}>
                                <Icon name="edit" />
                              </NavLink>
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-1 text-sm`}>
                          <div className='flex items-center justify-center'>
                            <div onClick={() => askModal(item)} className="p-2 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                              <span className={`${deleteLoading === item._id ? "" : "hidden"}`}>
                                <Icon name={"spin_loader_1"} className="animate-spin" />
                              </span>

                              <span className={`cursor-pointer ${deleteLoading === item._id ? "hidden" : ""}`}>
                                <Icon name={"delete"} />
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 text-sm">
                          <div className={`flex items-center justify-start ml-3`}>
                            <div
                            onClick={() => setSMSService(item._id)}
                            className={`${kurum.active_sms_api === item._id ? "hidden": ""} p-2 mr-6 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500`}>
                              SEÇ
                            </div>
                            <div className={`${kurum.active_sms_api === item._id ? "": "hidden"} ${sms.length > 1 ? "ml-2" : "mr-6"} w-full`}>
                              <Icon name={"tick"} className="text-green-500 block" />
                            </div>
                          </div>
                        </td>
                    </tr>)
                  )}
                    
                  </tbody>
                </table>
              </div>

              <div className={` ${loading ? "" : "hidden"} py-10`}>
                <Loading loading={loading} />
              </div>
              
              
              <div className={` ${sms.length === 0 && !loading ? "" : "hidden"} py-10`}>
                <span className='text-gray-400 block text-center'>Henüz bir Mesaj API tanımlanmadı..</span>
              </div>
            </div>

            <Modal result={modalResult} data={isModal} />
            
        </section>
    )
}