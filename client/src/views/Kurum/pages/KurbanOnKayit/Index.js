import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {useSelector} from "react-redux"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Input from "../../../components/Input"
import KurumService from '../../../../services/KurumService';
import Title from '../Setting/components/Title';

function KurbanOnKayit() {
    const param = useParams();
    const [loading, setLoading] = useState(false)
    const [kurum, setKurum] = useState({})
    const [send, setSend] = useState(false)
    const [errors, setError] = useState([]);

    const handleOnKayit = async (e) => {
        e.preventDefault();
        setLoading(true)
        formData.kurum_id = kurum?._id
        formData.email = kurum?.email
        console.log(kurum);
        const kayit = await KurumService.onKayitMail(formData)
        console.log(kayit);
        if(kayit.data.response) {
            setSend(true)
        }
    }

    const getKurum = async (kurum_id) => {
        const getKurum = await KurumService.get(kurum_id)
        setKurum(getKurum.data);
        console.log(getKurum);
    }

    
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        kurum_id: kurum?._id
    })
    
    const { full_name, phone } = formData

    /* */
    useEffect(() => {
        getKurum(param.kurum_id)
    }, [])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    return (
        <>

          <form onSubmit={handleOnKayit} id="onkayit_form">
            
            <Card className={'mt-10 mx-5'}>
              <h2 className={`flex justify-center text-xl font-semibold mb-8`}>{kurum?.kurum_name && kurum.kurum_name + ' - 2023 Kurban Ön Kayıt Formu'}</h2>

              {
                !send ?
                <>
                    <Input value={full_name} title="İsminiz" name="full_name" onChange={onChange} errors={errors} />
                    <Input value={phone} title="GSM" name="phone" onChange={onChange} errors={errors} />

                    <Button className={"mt-2 w-full"} disabled={loading}>
                        {loading ? '...' : 'ÖN KAYIT'}
                    </Button>
                </> 
                :   <>
                        <div className='flex justify-center text-l'>
                            <span>Başvurunuz alınmıştır sizlere en kısa sürede dönüş yapılacaktır.. Teşekkürler</span>
                        </div>
                    </>
              }
            </Card>    

          </form>
      </>
    );
  }
  
  export default KurbanOnKayit;