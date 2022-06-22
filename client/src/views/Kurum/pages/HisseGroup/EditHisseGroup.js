import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import HisseGroupService from "../../../../services/HisseGroupService";
import {useSelector} from "react-redux"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from '../../../components/Prev'
import Title from '../../../components/Title'

function EditHisseGroup() {
    const active_project_id = useSelector((state) => state.kurum.active_project_id)
    let location = useLocation();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      hisse_group_title: '',
      _id: ''
    })

    const { hisse_group_title, _id } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    /* */
    useEffect(() => {
      Object.keys(formData).forEach(key => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: location.state[key]
        }))
      });
    }, [])

        /* */
        const editHisseGroup = async (e) => {
          e.preventDefault();
    
          if(hisse_group_title === location.state.hisse_group_title) { navigate(-1) }
          
          if(hisse_group_title === '') { return; } 
    
          setLoading(true)
    
          const data = {
            _id,
            hisse_group_title,
            project_id: active_project_id
          }
          const response = await HisseGroupService.update(data);
          console.log(response)
    
          if(response.status === 200 && !response.data.error) {
            navigate(-1)
          } else if(response.data.error) {
            console.log(response.data.error)
            setLoading(false)
            setError({hisse_group_title: response.data.error})
          }
        }

    return (
        <>
            <form onSubmit={editHisseGroup}>
              <Card>              
                <div className="flex items-center justify-start">
                  <Prev />
                  <Title title={"Hisse Grubu Düzenle"}/>
                </div>

              
                <Input value={hisse_group_title} title="Hisse grubu" pholder={"Hisse grubu giriniz (bkz: 5.000 - 6.000)"} name="hisse_group_title" onChange={onChange} errors={errors} />
                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? 'Düzenleniyor..' : 'Düzenle'}
                </Button>
              </Card>
            </form>
        </>
    );
  }
  
  export default EditHisseGroup;