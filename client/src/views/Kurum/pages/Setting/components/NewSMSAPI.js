import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import Input from "../../../../components/Input"
import Button from "../../../../components/Button"
import Card from "../../../../components/Card"
import Prev from '../../../../components/Prev'
import Title from '../../../../components/Title'
import MessageAPIService from '../../../../../services/MessageAPIService';
import SMSService from '../../../../../services/SMSService';

function NewSMSAPI() {
    const kurum = useSelector((state) => state.auth.kurum)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [selected, setSelected] = useState("")
    const [message_template_holder, setMessageTemplateHolder] = useState('Yükleniyor..');
    const [SMSs, setSMSs] = useState([]);
    const [formData, setFormData] = useState({
      message_service_origin: '',
      message_service_username: '',
      message_service_password: '',
    })

    const { message_service_origin,
      message_service_username,
      message_service_password, } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const handleDropDown = (e) => {
      setSelected(e.target.value)
    }

    useEffect(() => {
      const getSMSs = async () => {
        console.log(kurum)
        const request = await MessageAPIService.getAll();
        if(request.status === 200) {
          setSMSs(request.data)
          request.data.length === 0 ? setMessageTemplateHolder('Herhangi SMS API seçmediniz..') : setMessageTemplateHolder('SMS API Firmanızı Seçiniz')
        }
      }
      getSMSs()
    }, [])

    /* */
    const createProcess = async (e) => {
      e.preventDefault();
      
      if(selected === '') { return; } 

      setLoading(true)


      const data = {
        kurum_id: kurum._id,
        message_api_title: SMSs.find(sms => sms._id === selected).message_service_title,
        message_service_origin,
        message_service_username,
        message_service_password,
        message_api: selected
      }
      
      const response = await SMSService.create(data);
      
      if(response.status === 200 && !response.data.error) {
        navigate(-1)
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({process_title: response.data.error})
      }
    }

    return (
        <>
            <form onSubmit={createProcess}>
              <Card>              
                <div className="flex items-center justify-start">
                  <Prev />
                  <Title title={"SMS API Oluştur"}/>
                </div>

                <label className="block text-sm mb-4">
                  <span className={`text-gray-700 dark:text-gray-400`}>SMS API Firmanızı Seçiniz:</span>
                  <select value={selected} onChange={(e) => handleDropDown(e)} className="border-gray-400/30 rounded-[0.250rem] form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                      <option value="">{message_template_holder}</option>
                      {SMSs.map((sms) => (
                        <option key={sms._id} value={sms._id}>{sms.message_service_title}</option>
                      ))}
                  </select>
                </label>

                <Input value={message_service_username} title="SMS API Hesap kullanıcı adı" pholder="SMS API Hesap kullanıcı adı" name="message_service_username" onChange={onChange} errors={errors} />
                <Input value={message_service_password} title="SMS API Hesap kullanıcı şifresi" pholder="SMS API Hesap kullanıcı şifresi" name="message_service_password" onChange={onChange} errors={errors} />
                <Input value={message_service_origin} title="SMS API Mesaj Başlığınız" pholder="SMS API Origin/Originator/Başlık" name="message_service_origin" onChange={onChange} errors={errors} />
                
                <Button className={"mt-2 w-full"} disabled={loading}>
                  {loading ? 'Oluşturuluyor..' : 'Oluştur'}
                </Button>
              </Card>
            </form>
        </>
    );
  }
  
  export default NewSMSAPI;