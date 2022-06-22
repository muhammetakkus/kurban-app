import Loading from '../../../components/Loading';
import ProcessService from "../../../../services/ProcessService";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import {Icon} from "../../../../utils/SVG";
import Modal from '../../../molecules/modal';
import {NavLink} from 'react-router-dom'

 
function ProcessList() {
  const kurum = useSelector(state => state.auth.kurum)

  const [processes, setProcess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState('');

  const [deleteObj, setDeleteObj] = useState({});
  const [isModal, setModal] = useState({isOpen: false, title: '', message: ''});

  useEffect(() => {
    const getProcess = async () => {
      console.log(kurum)
      const request = await ProcessService.getAll({kurum_id: kurum._id});
      if(request.status === 200) {
        setLoading(false)
        setProcess(request.data)
      }
    }
    getProcess()
    
  }, [])

  const askModal = (item) => {
    console.log(item)
    setDeleteObj({})
    setDeleteObj(item)
    setModal({isOpen: true, title: 'İşlem Adımı Sil', message: `[${item.process_title}] - işlem adımını silmek istediğinize emin misiniz?`})
  }

  const modalResult = async (result) => {

    setModal({isOpen: false})

    if(result) {
      setDeleteLoading(deleteObj._id)
      const deleteRecord = await ProcessService.delete(deleteObj._id);
      if(deleteRecord.status === 200) {
        setProcess( processes.filter( e => e._id !== deleteRecord.data._id  ) );
        setDeleteLoading(false)
      }
    }
  }
  
    return (
      <>
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-[1px] border-gray-400/20">
              <div className={`${loading || processes.length === 0 ? "hidden" : ""} w-full overflow-x-auto`}>
                <table className="w-full whitespace-no-wrap  ">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800" lang="tr" >
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">İşlem Başlığı</th>
                      <th className="px-4 py-3">Mesaj Şablonu</th>
                      {/*<th className="px-4 py-3">Sıra</th>*/}
                      <th className="px-4 py-3 text-center" colSpan={2}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {processes && processes.map((process, index) =>  (
                      <tr className="text-gray-700 dark:text-gray-400" key={process._id}>
                        <td className="px-4 py-1">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <span>{index+1}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-1 text-l">
                          <span>{process.process_title}</span>
                        </td>
                        <td className="px-4 py-1 text-l">
                          <span>{process.message_template ? process.message_template : '-'}</span>
                        </td>
                        {/*<td className="px-4 py-1 text-sm">
                          <span className="px-5 py-2 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                            {process.process_order}
                          </span>
                        </td>*/}
                        <td className="px-4 py-1 text-sm">
                          <div className='flex items-center justify-center'>
                            <NavLink to={"/kurum/edit-process"} state={process}>
                              <div className="p-2 cursor-pointer text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                  <Icon name="edit" />
                              </div>
                            </NavLink>
                          </div>
                        </td>
                        <td className="  px-4 py-1 text-sm">
                          <div className='flex items-center justify-center'>
                            <div onClick={() => askModal(process)} className="p-2 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                              <span className={`${deleteLoading === process._id ? "" : "hidden"}`}>
                                <Icon name={"spin_loader_1"} className="animate-spin" />
                              </span>

                              <span className={`cursor-pointer ${deleteLoading === process._id ? "hidden" : ""}`}>
                                <Icon name={"delete"} />
                              </span>
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
              
              
              <div className={` ${processes.length === 0 && !loading ? "" : "hidden"} py-10`}>
                <span className='text-gray-400 block text-center'>Henüz bir işlem adımı oluşturmadınız..</span>
              </div>
            </div>
            
            <Modal result={modalResult} data={isModal} />
      </>
    );
}

export default ProcessList;