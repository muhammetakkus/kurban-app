import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
 
import Card from "../../components/Card"
import Prev from "../../components/Prev"
import Title from "../../components/Title"
import HissedarService from "../../../services/HissedarService";
import {setHissedars} from "../../../store/reducers/hissedar"
import Modal from '../../molecules/modal';
import {Icon} from "../../../utils/SVG";
import Loading from '../../components/Loading';

function Hissedar() {
  const kurum = useSelector(state => state.auth.kurum)
  const [loading, setLoading] = useState(false);
  // const [hissedars, setHissedars] = useState([]);
  const hissedars = useSelector(state => state.hissedar.items)
  const dispatch = useDispatch()
  const [isDeleteModal, setDeleteModal] = useState({isOpen: false});
  const [currentHissedar, setCurrentHissedar] = useState({});
  const [itemDeletingId, setItemDeleting] = useState('');
  

  useEffect(() => {
    const getHissedars = async () => {
      setLoading(true)
      const request = await HissedarService.getAll({kurum_id: kurum._id});
      if(request.status === 200) {
        console.log(request.data);
          setLoading(false)
          dispatch(setHissedars(request.data))
      }
    }
    if(!hissedars || hissedars.length === 0) getHissedars()
  }, [])

  const deleteItem = async (result) => {
    setDeleteModal({isOpen: false})

    if(result) {
      setItemDeleting(currentHissedar._id)
      const deleteRecord = await HissedarService.delete({id: currentHissedar._id});
      if(deleteRecord.status === 200) {
        const newHissedars = hissedars.filter( e => e._id !== currentHissedar._id  )
        dispatch(setHissedars(newHissedars))
        setItemDeleting('')
      }
    }
  }

  const askDeleteModal = (hissedar) => {
    setCurrentHissedar(hissedar)
    setDeleteModal({isOpen: true, title: 'Hissedar Sil', message: `[${hissedar.hissedar_full_name}] silmek istediğinize emin misiniz?`})
  }
  
    return (
      <>
      <Card>              
          <div className="flex items-center justify-start">
            <Prev />
            <Title title={"Hissedarlar"}/>
          </div>
        
          <div className="container">
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-[1px] border-gray-400/20">
              <Modal result={deleteItem} data={isDeleteModal} />

              <div className={`${loading || hissedars?.length === 0 ? "hidden" : ""} w-full overflow-x-auto`}>
                <table className="w-full whitespace-no-wrap ">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800" lang="tr" >
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3 flex items-center cursor-pointer">
                        <span>Hissedar</span>
                      </th>
                      <th className="px-4 py-3">Hissedar GSM</th>
                      <th className="px-4 py-3 text-center">Sil</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {hissedars && hissedars?.map((hissedar, index) =>  (
                      <tr className="text-gray-700 dark:text-gray-400" key={`hissedar_${index}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <span className={`${itemDeletingId === hissedar._id ? "hidden" : ""}`}>{index+1}</span>
                              <span className='text-pink-800'>
                                <Icon name="spin_loader_1" size={5} className={`animate-spin ${itemDeletingId === hissedar._id ? "" : "hidden"}`}/>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {hissedar.hissedar_full_name}
                        </td>
                        <td className="px-4 py-3 text-l min-w-full">
                          {hissedar.hissedar_gsm}
                        </td>
                        <td className="px-2 py-3 text-sm">
                          <div className='flex items-center justify-center'>
                            <div onClick={() => askDeleteModal(hissedar)} className="p-3 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                              <Icon name="delete" />
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
              
              <div className={` ${hissedars?.length === 0 && !loading ? "" : "hidden"} py-10`}>
                <span className='text-gray-400 block text-center'>Henüz bir hissedar kaydı yok..</span>
              </div>
            </div>

          </div>
        </Card>
      </>
    );
}

export default Hissedar;