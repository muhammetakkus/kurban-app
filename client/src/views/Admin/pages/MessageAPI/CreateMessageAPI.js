import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from '../../../components/Prev'
import Title from '../../../components/Title'
import MessageAPIService from '../../../../services/MessageAPIService';

function CreateMessageAPI() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      message_service_title: ''
    })

    const { message_service_title } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    /* */
    const createMessageAPI = async (e) => {
      e.preventDefault();
      
      if(message_service_title === '') { return; } 

      setLoading(true)

      const data = {
        message_service_title
      }
      const response = await MessageAPIService.create(data);
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
            <form onSubmit={createMessageAPI}>
              <Card>              
                <div className="flex items-center justify-start">
                  <Prev />
                  <Title title={"New Message API Service"}/>
                </div>

                <Input value={message_service_title} title="Message Service Title (must be same as the Message API Class Name)" pholder="Message Service Title" name="message_service_title" onChange={onChange} errors={errors} />

                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? '...' : 'Create'}
                </Button>
              </Card>
            </form>
        </>
    );
  }
  
  export default CreateMessageAPI;