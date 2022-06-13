import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
import axios from 'axios';
import HisseService from '../../../services/HisseService';
import Input from "../../components/Input"
import Button from "../../components/Button"
import Card from "../../components/Card"
import Prev from "../../components/Prev"
import Title from "../../components/Title"
import Textarea from "../../components/Textarea"

function CreateHisse() {
  const location = useLocation()
  //const { location_state } = location.state

  const isKurumAuth = useSelector((state) => state.auth.isKurum)
  const kurum = useSelector((state) => state.auth.kurum)
  const active_project_id = useSelector((state) => state.kurum.active_project_id)
  if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState([]);
  const [formData, setFormData] = useState({
      hissedar_full_name: "",
      hissedar_address: "",
      hissedar_gsm: '',
      hissedar_note: "",
      referans_full_name: "",
      referans_gsm: '',
      kapora: 0,
      is_vekalet: false
    })

    const { hissedar_full_name, hissedar_address, hissedar_gsm, referans_full_name, referans_gsm, kapora, hissedar_note, is_vekalet} = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // verilen propslardan name'e göre value'değerini match edip eşleştiriyor
      }))
    }

    /* */
    useEffect(() => {
      console.log(location)
    }, [])
    /* */
    const createKurban = async (e) => {
      e.preventDefault();
      
      setLoading(true)
      const data = {
        kurum_id: kurum._id,
        project_id: active_project_id,
        kurban_id: location.state.kurban_id,
        hissedar_full_name,
        hissedar_gsm,
        hissedar_address,
        kapora,
        referans_full_name,
        referans_gsm,
        is_vekalet,
        hissedar_note
      }
      const response = await HisseService.create(data);
      
      console.log(response)

      if(response.status === 200 && !response.data.error) {
        navigate(`/kurum/dashboard/${active_project_id}`)
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({key: response.data.error}) // input name key olarak verilecek
      }
    }

    return (
        <>
          <form onSubmit={createKurban}>
            <Card>
              <div className="flex items-center">
                <Prev />
                <Title title={`${location.state.kurban_no}.Kurban - Hisse Kayıt (1/7)`} />
              </div>
              

              <Input value={hissedar_full_name} title="*Hissedar tam ismi" name="hissedar_full_name" onChange={onChange} errors={errors} />
              <Input value={hissedar_gsm} title="*Hissedar GSM" name="hissedar_gsm" onChange={onChange} errors={errors} />
              <hr className='mb-4 mt-6' />
              <Input value={kapora} title="Kapora" name="kapora" onChange={onChange} errors={errors} />
              <Textarea value={hissedar_address} title="Hissedar adresi" name="hissedar_address" onChange={onChange} errors={errors} />
              <Input value={referans_full_name} title="Referans tam ismi" name="referans_full_name" onChange={onChange} errors={errors} />
              <Input type="number" value={referans_gsm} title="Referans GSM" name="referans_gsm" onChange={onChange} errors={errors} />
              <Textarea value={hissedar_note} title="Hissedar not" name="hissedar_note" onChange={onChange} errors={errors} />
              <p>
                <input type="checkbox" id="vekalet" value={is_vekalet}/><label htmlFor='vekalet'> Vekaleti alınmıştır</label>
              </p>

              <Button className={"mt-2 w-full"} disabled={loading}>
                {loading ? 'Oluşturuluyor' : 'Oluştur'}
              </Button>
            </Card>    
          </form>
      </>
    );
  }
  
  export default CreateHisse;