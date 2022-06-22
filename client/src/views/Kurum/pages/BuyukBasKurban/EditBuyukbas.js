import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
//import axios from 'axios';
import BKurbanService from '../../../../services/BKurbanService';
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from "../../../components/Prev"
import Title from "../../../components/Title"
import Textarea from "../../../components/Textarea"

function EditBuyukbas() {

    let location = useLocation();
    
    //const isKurumAuth = useSelector((state) => state.auth.isKurum)
    //const kurum = useSelector((state) => state.auth.kurum)
    const active_project_id = useSelector((state) => state.kurum.active_project_id)
    //if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
      _id: '',
      kurban_kupe_no: '',
      net_hisse_fiyat: '',
      kurban_weight: '',
      kurban_note: ''
    })
    
    const { kurban_kupe_no, net_hisse_fiyat, kurban_weight, kurban_note } = formData
    
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // verilen propslardan name'e göre value'değerini match edip eşleştiriyor
      }))
    }

    /* */
    useEffect(() => {
      // NavLink ile gelen location.state deki değerleri state'teki öğelere geçmek için bu kadar işlem yapmaya gerek var mı?
      Object.keys(formData).forEach(key => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: location.state[key]
        }))
      });
    }, [])

    /* */
    const editKurban = async (e) => {
      e.preventDefault();
      
      setLoading(true)

      const response = await BKurbanService.update(formData);
      
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

          <form onSubmit={editKurban}>
            <Card>
              <div className="flex items-center">
                <Prev />
                <Title title={"Kurban Düzenle"} />
              </div>
              
              <Input value={kurban_kupe_no} title="Küpe No" name="kurban_kupe_no" onChange={onChange} errors={errors} />
              <Input value={net_hisse_fiyat} title="Net Hisse Fiyatı" name="net_hisse_fiyat" onChange={onChange} errors={errors} />
              <Input value={kurban_weight} title="Kurban KG" name="kurban_weight" onChange={onChange} errors={errors} />
              <Textarea value={kurban_note} title="Kurban Not" name="kurban_note" onChange={onChange} errors={errors} />
              <Button className={"mt-2 w-full"} disabled={loading}>
                {loading ? 'Düzenleniyor' : 'Düzenle'}
              </Button>
            </Card>    
          </form>
      </>
    );
  }
  
  export default EditBuyukbas;