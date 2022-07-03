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
//import Video from '../../../FrontSide/components/Video'
//import v from "../../../../assets/uploads/2022-07-02T22:58:49.534Z.mp4"
function EditBuyukbas() {

    let location = useLocation();
    //const isKurumAuth = useSelector((state) => state.auth.isKurum)
    //const kurum = useSelector((state) => state.auth.kurum)
    const active_project_id = useSelector((state) => state.kurum.active_project_id)
    //if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;

    const navigate = useNavigate()
    //const [v, setV] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [singleFile, setSingleFile] = useState('');
    const [formData, setFormData] = useState({
      _id: '',
      kurban_kupe_no: '',
      net_hisse_fiyat: '',
      kurban_weight: '',
      kurban_note: '',
      file: ''
    })
    
    const { kurban_kupe_no, net_hisse_fiyat, kurban_weight, kurban_note, file, _id } = formData
    
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // verilen propslardan name'e göre value'değerini match edip eşleştiriyor
      }))
    }
    
    /* */
    useEffect(() => {
      console.log(location.state)
      // NavLink ile gelen location.state deki değerleri state'teki öğelere geçmek için bu kadar işlem yapmaya gerek var mı?
      Object.keys(formData).forEach(key => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: location.state[key]
        }))
      });
    }, [])

    const SingleFileChange = (e) => {
      setSingleFile(e.target.files[0]);
      //setSingleProgress(0);
    }

    /* */
    const editKurban = async (e) => {
      e.preventDefault();
      
      setLoading(true)
    
      // eğer video dosyası seçilmişse
      if(singleFile) {
        const form = new FormData();
        form.append('file', singleFile);
        
        console.log(singleFile)

        const upload = await BKurbanService.upload(form, _id);

        console.log("upload video")

        if(!upload.data.error) {
          navigate(`/kurum/dashboard/${active_project_id}`)
        } else {
          console.log(upload.data)
        }

      } else {
        const response = await BKurbanService.update(formData);
        if(response.status === 200 && !response.data.error) {
          navigate(`/kurum/dashboard/${active_project_id}`)
        } else if(response.data.error) {
          console.log(response.data.error)
          setLoading(false)
          setError({key: response.data.error}) // input name key olarak verilecek
        }
      }
      
    }

    return (
        <>

          <form onSubmit={editKurban} id="kurban_edit_form" encType="multipart/form-data">
            <Card>
              <div className="flex items-center">
                <Prev />
                <Title title={"Kurban Düzenle"} />
              </div>
              <input type={"hidden"} value={_id} name="_id"/>
              <Input value={kurban_kupe_no} title="Küpe No" name="kurban_kupe_no" onChange={onChange} errors={errors} />
              <Input type="number" value={net_hisse_fiyat} title="Net Hisse Fiyatı" name="net_hisse_fiyat" onChange={onChange} errors={errors} />
              <Input value={kurban_weight} title="Kurban KG" name="kurban_weight" onChange={onChange} errors={errors} />
              <Textarea value={kurban_note} title="Kurban Not" name="kurban_note" onChange={onChange} errors={errors} />
              
              <label className="block text-sm mb-4">
                <span className={`text-gray-700 dark:text-gray-400`}>Kurban Kesim Videosu:</span>
                <input
                type="file"
                value={file}
                name="file"
                onChange={(e) => SingleFileChange(e)}
                className={`mt-1 block w-full text-md border-gray-400/30 rounded-[0.250rem] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input`}
                accept="video/*"
                />
            </label>


              {/*location.state.video_path && <Video path={location.state.video_path ? '../../../../assets/uploads/' + location.state.video_path : ""} /> */}
             
             {location.state.video_path && <video width="750" height="500" controls className={`${location.state.video_path ? "" : "hidden"}`}>
                <source src={location.state.video_path ? require('../../../../assets/uploads/' + location.state.video_path) : ""} type="video/mp4" />
            </video>}
              
         

              <Button className={"mt-2 w-full"} disabled={loading}>
                {loading ? 'Düzenleniyor' : 'Düzenle'}
              </Button>
            </Card>    
          </form>
      </>
    );
  }
  
  export default EditBuyukbas;