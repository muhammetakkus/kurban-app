import Loading from '../../../components/Loading';
import { NavLink } from 'react-router-dom'
import ProjectService from "../../../../services/ProjectService";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import {Icon} from "../../../../utils/SVG";
import Modal from '../../../molecules/modal';

function ProjectList() {
  const kurum = useSelector(state => state.auth.kurum)

  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState('');
  const [isDeleteModal, setDeleteModal] = useState({isOpen: false});
  const [deleteID, setDeleteID] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      console.log(kurum)
      const request = await ProjectService.getAll({kurum_id: kurum._id});
      if(request.status === 200) {
        setLoading(false)
        setProject(request.data)
      }
    }
    getProjects()
    
  }, [])

  const askDelete = (id) => {
    
    setDeleteID(id)
    setDeleteModal({isOpen: true, title: 'Proje Sil', message: `Bu proje ve ilgili kurban kayıtlarını silmek istediğinize emin misiniz?`})
  }

  const deleteProject = async (result) => {

    setDeleteModal({isOpen: false})

    if(result) {
      setDeleteLoading(deleteID)
      const res = await ProjectService.delete({kurum_id: kurum._id, id: deleteID});
      if(res.status === 200 && !res.data.error) {
        
        // remove item
        setProject(prevState => prevState.filter((prevItem) => prevItem._id !== deleteID))

      } else if(res.data.error) {
        console.log(res.data.error)
        setDeleteLoading(false)
      }
    }
  }
  
    return (
      <>
            <Loading loading={loading} />
            
            <ul className="mt-2">
              {projects && projects.map((project) =>  (
                <li className="flex justify-between items-center bg-white text-black border border-gray-200 rounded-md my-2 mx-1 md:mx-2 dark:text-gray-200  shadow-xs dark:bg-gray-800/95" key={project._id}>
                  <NavLink
                    to={`/kurum/dashboard/${project._id}`} 
                    className="p-3 block flex-grow"
                    >{project.project_name}</NavLink>
                    
                  
                  <span className={`animate-spin text-gray-700 text-xs px-2 ${deleteLoading === project._id ? "" : "hidden"}`}>
                    <Icon name={"spin_loader_1"} />
                  </span>

                  <span onClick={() => askDelete(project._id)} className={`mr-3 cursor-pointer ${deleteLoading === project._id ? "hidden" : ""}`}>
                    <Icon name={"delete"} />
                  </span>
                </li>)
              )}
            </ul>
            
            {projects.length === 0 && !loading? <span className='text-gray-400 block text-center'>Henüz bir proje oluşturmadınız..</span>: null}

            <Modal result={deleteProject} data={isDeleteModal} />
      </>
    );
}

export default ProjectList;