import MessageService from "../../../../services/MessageService";
import { useEffect, useState } from "react";
import Card from "../../../components/Card"
import Prev from "../../../components/Prev"
import Title from "../../../components/Title"
import {Icon} from "../../../../utils/SVG";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux"
import Loading from '../../../components/Loading';
import Modal from '../../../molecules/modal';

function MessageTemplate() {

  const kurum = useSelector(state => state.auth.kurum)

  const [messageTemplates, setMessageTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [deleteObj, setDeleteObj] = useState({});
  const [isModal, setModal] = useState({isOpen: false, title: '', message: ''});

  useEffect(() => {
    const getMessageTemplate = async () => {
      console.log(kurum)
      const request = await MessageService.getAll({kurum_id: kurum._id});
      if(request.status === 200) {
        setLoading(false)
        setMessageTemplates(request.data)
      }
    }
    getMessageTemplate()
    
  }, [])

  /* Delete Process */
  const askModal = (item) => {
    console.log(item)
    setDeleteObj({})
    setDeleteObj(item)
    setModal({isOpen: true, title: 'Mesaj Şablonu Sil', message: `[${item.message_title}] - şablonunu silmek istediğinize emin misiniz?`})
  }

  const modalResult = async (result) => {

    setModal({isOpen: false})

    if(result) {
      setDeleteLoading(deleteObj._id)
      const deleteRecord = await MessageService.delete(deleteObj._id);
      if(deleteRecord.status === 200) {
        setMessageTemplates( messageTemplates.filter( e => e._id !== deleteRecord.data._id  ) );
        setDeleteLoading(false)
      }
    }
  }
    return (
      <>
          <Card>              
          <div className="flex items-center justify-start">
            <Prev />
            <Title title={"Mesaj Şablonları"}/>
            <NavLink to={"/kurum/create-message-template"} className="text-purple-500 flex-grow text-right">
                Mesaj Şablonu Oluştur+
            </NavLink>
          </div>

        
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {messageTemplates.map((message) => (
            <li key={message._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">{message.message_title}</h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      ?
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">{message.message_content}</p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <NavLink state={message} to={"/kurum/edit-message-template"} className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                      <Icon name="edit" size="5" className="text-gray-400" />
                      <span className="ml-3">Düzenle</span>
                    </NavLink>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex" onClick={() => askModal(message)}>
                    <button type="button" className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                      <Icon name="delete" size="5" className={`${deleteLoading === message._id ? 'hidden' : ''} text-gray-400`}  />
                      <Icon name="spin_loader_1" size="5" className={`${deleteLoading === message._id ? '' : 'hidden'} text-gray-400`}  />
                      <span className="ml-3">Sil</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
            
          <div className={` ${messageTemplates.length === 0 && !loading ? "" : "hidden"} py-10`}>
            <span className='text-gray-400 block text-center'>Henüz bir Mesaj Şablonu oluşturmadınız..</span>
          </div>

          <Loading loading={loading} />

          <Modal result={modalResult} data={isModal} />
        
        </Card>
      </>
    );
}

export default MessageTemplate;