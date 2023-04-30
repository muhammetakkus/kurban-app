import Loading from '../../../components/Loading';
import HisseGroupService from "../../../../services/HisseGroupService";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import {Icon} from "../../../../utils/SVG";
import Modal from '../../../molecules/modal';
import {NavLink} from 'react-router-dom'

function ProcessList() {
  const active_project_id = useSelector(state => state.kurum.active_project_id)

  const [hisse_groups, setHisseGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState('');

  const [deleteObj, setDeleteObj] = useState({});
  const [isModal, setModal] = useState({isOpen: false, title: '', message: ''});

  useEffect(() => {
    const getHisseGroup = async () => {
      const request = await HisseGroupService.getByProject({project_id: active_project_id});
      if(request.status === 200) {
        setLoading(false)
        setHisseGroup(request.data)
      }
    }
    getHisseGroup()
    
  }, [])

  /* Delete Process */
  const askModal = (item) => {
    console.log(item)
    setDeleteObj({})
    setDeleteObj(item)
    setModal({isOpen: true, title: 'İşlem Adımı Sil', message: `[${item.hisse_group_title}] - hisse grubunu silmek istediğinize emin misiniz?`})
  }

  const modalResult = async (result) => {
    setModal({isOpen: false})
    if(result) {
      setDeleteLoading(deleteObj._id)
      const deleteRecord = await HisseGroupService.delete(deleteObj._id);
      if(deleteRecord.status === 200) {
        setHisseGroup( hisse_groups.filter( e => e._id !== deleteRecord.data._id  ) );
        setDeleteLoading(false)
      }
    }
  }
  
    return (
      <>
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-[1px] border-gray-400/20">
              <div className={`${loading || hisse_groups.length === 0 ? "hidden" : ""} w-full overflow-x-auto`}>
                <table className="w-full whitespace-no-wrap  ">
                  <thead>
                    <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800" lang="tr" >
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3 text-center">Hisse Grubu</th>
                      <th className="px-4 py-3 text-center" colSpan={2}>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {hisse_groups && hisse_groups.map((hisse_group, index) =>  (
                      <tr className="text-gray-700 dark:text-gray-400" key={hisse_group._id}>
                        <td className="px-4 py-2">
                          <span>{index+1}</span>
                        </td>
                        <td className="px-2 py-2 text-l text-center">
                          <span>{hisse_group.hisse_group_title}</span>
                        </td>
                        <td className="py-2 text-sm">
                          <div className='flex items-center justify-center'>
                            <div className="p-2 cursor-pointer text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                              <NavLink to={"/kurum/edit-hisse-grup"} state={hisse_group}>
                                <Icon name="edit" />
                              </NavLink>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 text-sm">
                          <div className='flex items-center justify-center'>
                            <div className="p-2 cursor-pointer text-red-500 bg-red-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                              <span className={`animate-spin ${deleteLoading === hisse_group._id ? "" : "hidden"}`}>
                                <Icon name={"spin_loader_1"} />
                              </span>

                              <span onClick={() => askModal(hisse_group)} className={`cursor-pointer ${deleteLoading === hisse_group._id ? "hidden" : ""}`}>
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
              
              
              <div className={` ${hisse_groups.length === 0 && !loading ? "" : "hidden"} py-10`}>
                <span className='text-gray-400 block text-center'>Henüz bir Hisse Grubu oluşturmadınız..</span>
              </div>
            </div>

            <Modal result={modalResult} data={isModal} />
      </>
    );
}

export default ProcessList;