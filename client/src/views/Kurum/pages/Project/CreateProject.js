import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ProjectService from "../../../../services/ProjectService";
import {useSelector} from "react-redux"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import axios from 'axios';
import Header from '../../components/Header'
import Prev from '../../../components/Prev'

function CreateProject() {
  
    const isKurumAuth = useSelector((state) => state.auth.isKurum)
    const kurum = useSelector((state) => state.auth.kurum)
    if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      project_name: ''
    })

    const { project_name } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // verilen propslardan name'e göre value'değerini match edip eşleştiriyor
      }))
    }

    /* */
    const createProject = async (e) => {
      e.preventDefault();
      
      if(project_name === '') { return; } 

      setLoading(true)
      const data = {
        project_name,
        kurum_id: kurum._id,
        uniq_project_code: 'xyzt'
      }
      const response = await ProjectService.create(data);
      
      console.log(response)

      if(response.status === 200 && !response.data.error) {
        navigate('/kurum/project')
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({project_name: response.data.error})
      }
    }

    return (
        <>
        <Header />
        <main className="h-full pb-16 overflow-y-auto">
          <div className="container p-6 mx-auto grid">
            <form onSubmit={createProject}>
              <h1 className="text-center text-xl mt-4 font-semibold ">Proje Oluştur</h1>
              
              <div className="flex justify-start">
                <Prev />
              </div>

              <Card>
                <Input value={project_name} title="Proje Başlığı" name="project_name" onChange={onChange} errors={errors} />
                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? 'Oluşturuluyor' : 'Oluştur'}
                </Button>
              </Card>
            </form>
          </div>
        </main>
        </>
    );
  }
  
  export default CreateProject;