import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from '../../../components/Prev'
import Title from '../../../components/Title'
import MessageAPIService from '../../../../services/MessageAPIService';

function EditMessageAPI() {
    let location = useLocation();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      _id: '',
      message_service_title: ''
    })

    const { message_service_title, _id } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    useEffect(() => {
      Object.keys(formData).forEach(key => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: location.state[key]
        }))
      });
    }, [])

    /* */
    const editMessageAPI = async (e) => {
      e.preventDefault();
      
      if(message_service_title === '') { return; } 

      setLoading(true)

      const data = {
        message_service_title,
        _id
      }
      const response = await MessageAPIService.update(data);
      console.log(response)

      if(response.status === 200 && !response.data.error) {
        navigate(-1)
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({message_service_title: response.data.error})
      }
    }

    return (
        <>
            <form onSubmit={editMessageAPI}>
              <Card>              
                <div className="flex items-center justify-start">
                  <Prev />
                  <Title title={"New Message API Service"}/>
                </div>

                <Input value={message_service_title} title="Message Service Title (must be same as the Message API Class Name)" pholder="Message Service Title" name="message_service_title" onChange={onChange} errors={errors} />

                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? '...' : 'Edit'}
                </Button>
              </Card>
            </form>
        </>
    );
  }
  
  export default EditMessageAPI;