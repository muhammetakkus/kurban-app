import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from '../../../components/Prev'
import Title from '../../../components/Title'
import MessageService from '../../../../services/MessageService';
import Textarea from '../../../components/Textarea';

function EditMessageTemplate() {
    const kurum = useSelector((state) => state.auth.kurum)
    let location = useLocation();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      message_title: '',
      message_content: '',
      _id: ''
    })

    const { message_title, message_content, _id } = formData

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
    const editMessageTemplate = async (e) => {
      e.preventDefault();

      //if(message_title === location.state.message_title) { navigate(-1) }
      
      if(message_title === '') return

      setLoading(true)

      const data = {
        _id,
        message_title,
        message_content,
        kurum_id: kurum._id,
      }
      const response = await MessageService.update(data);
      console.log(response)

      if(response.status === 200 && !response.data.error) {
        navigate(-1)
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({message_title: response.data.error})
      }
    }

    return (
        <>
            <form onSubmit={editMessageTemplate}>
              <Card>              
                <div className="flex items-center justify-start">
                  <Prev />
                  <Title title={"Mesaj Şablonu Düzenle"}/>
                </div>

              
                <Input value={message_title} title="Mesaj Başlığı" name="message_title" onChange={onChange} errors={errors} />
                <Textarea value={message_content} title="Mesaj İçeriği" name="message_content" onChange={onChange} errors={errors} />
                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? 'Düzenleniyor..' : 'Düzenle'}
                </Button>
              </Card>
            </form>
        </>
    );
  }
  
  export default EditMessageTemplate;