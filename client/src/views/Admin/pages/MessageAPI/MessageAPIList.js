
 import Loading from '../../../components/Loading';
 import MessageAPIService from "../../../../services/MessageAPIService";
 import React, { useEffect, useState } from "react";
 import {useSelector} from "react-redux"
 import {Icon} from "../../../../utils/SVG";
 import Modal from '../../../molecules/modal';
 import {NavLink} from 'react-router-dom'

function MessageAPIList() {
  const admin = useSelector(state => state.admin)

  const [messageAPIs, setMessageAPIs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState('');

  const [deleteObj, setDeleteObj] = useState({});
  const [isModal, setModal] = useState({isOpen: false, title: '', message: ''});

  const getMessageAPI = async () => {
    console.log(admin)
    const request = await MessageAPIService.getAll();
    if(request.status === 200) {
      setLoading(false)
      setMessageAPIs(request.data)
    }
  }

  useEffect(() => {
    
    getMessageAPI()
    
  }, [])

  const askModal = (item) => {
    console.log(item)
    setDeleteObj({})
    setDeleteObj(item)
    setModal({isOpen: true, title: 'Delete Message API', message: `[${item.message_service_title}] is deleting. Are you sure?`})
  }

  const modalResult = async (result) => {

    setModal({isOpen: false})

    if(result) {
      setDeleteLoading(deleteObj._id)
      const deleteRecord = await MessageAPIService.delete(deleteObj._id);
      if(deleteRecord.status === 200) {
        setMessageAPIs( messageAPIs.filter( e => e._id !== deleteRecord.data._id  ) );
        setDeleteLoading(false)
      }
    }
  }


  
    return (
      <>
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-[1px] border-gray-400/20">
              <div className={`${loading || messageAPIs?.length === 0 ? "hidden" : ""} w-full overflow-x-auto`}>
                <table className="w-full whitespace-no-wrap  ">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800" lang="tr" >
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Message API Title</th>
                      <th className="px-4 py-3 text-center" colSpan={2}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {messageAPIs && messageAPIs?.map((message_api, index) =>  (
                      <tr className="text-gray-700 dark:text-gray-400" key={message_api._id}>
                        <td className="px-4 py-1">
                          <div className="flex items-center text-sm">
                            <div>
                              <span>{index+1}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-1 text-l">
                          <span>{message_api.message_service_title}</span>
                        </td>
                        <td className={`px-4 py-1 text-sm`}>
                          <div className='flex items-center justify-center'>
                            <NavLink to={"/admin/edit-message-api"} state={message_api}>
                              <div className="p-2 m-1 cursor-pointer text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                  <Icon name="edit" />
                              </div>
                            </NavLink>
                          </div>
                        </td>
                        <td className={`px-4 py-1 text-sm`}>
                          <div className='flex items-center justify-center'>
                            <div onClick={() => askModal(message_api)} className="p-2 m-1 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                              <span className={`${deleteLoading === message_api._id ? "" : "hidden"}`}>
                                <Icon name={"spin_loader_1"} className="animate-spin" />
                              </span>

                              <span className={`cursor-pointer ${deleteLoading === message_api._id ? "hidden" : ""}`}>
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
              
              
              <div className={` ${messageAPIs?.length === 0 && !loading ? "" : "hidden"} py-10`}>
                <span className='text-gray-400 block text-center'>Henüz bir işlem adımı oluşturmadınız..</span>
              </div>
            </div>
            
            <Modal result={modalResult} data={isModal} />
      </>
    );
}

export default MessageAPIList;