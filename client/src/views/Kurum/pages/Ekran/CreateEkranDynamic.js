import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import axios from 'axios';
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from "../../../components/Prev"
import Title from "../../../components/Title"
import ProcessService from '../../../../services/ProcessService';
import EkranService from '../../../../services/EkranService';

function CreateBuyukbas() {
  
  const isKurumAuth = useSelector((state) => state.auth.isKurum)
  const kurum = useSelector((state) => state.auth.kurum)
  const project_id = useSelector(state => state.kurum.active_project_id)

  if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [hisseGroupLoader, setProcessLoader] = useState("İşlem adımları yükleniyor..");
  const [selected, setSelected] = useState("")
  const [processes, setProcesses] = useState([]);
  const [errors, setError] = useState([]);
  const [formData, setFormData] = useState({
      screen_title: ''
    })

    const { screen_title } = formData

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const handleDropDown = (e) => {
      setSelected(e.target.value)
    }

    /* */
    useEffect(() => {
      const getProcesses = async () => {
        const request = await ProcessService.getAll({kurum_id: kurum._id});
        if(request.status === 200) {
          const processLoaderMessage = request.data.length > 0 ? "İşlem adımı seçiniz" : "Listelenecek işlem adımı bulunamadı"
          setProcessLoader(processLoaderMessage)
          setProcesses(request.data)
        }
      }
      getProcesses()
    }, [])
    /* */
    const createEkran = async (e) => {
      e.preventDefault();

      setLoading(true)
      const data = {
        kurum_id: kurum._id,
        project_id: project_id,
        type: "dynamic",
        screen_title: screen_title,
        process: selected,
        self: false,
      }
      const response = await EkranService.create(data);
      
      console.log(response)

      if(response.status === 200 && !response.data.error) {
        navigate(`/kurum/ekran-management`)
      } else if(response.data.error) {
        console.log(response.data.error)
        setLoading(false)
        setError({key: response.data.error}) // input name key olarak verilecek
      }

      
    }

    return (
        <>
          <form onSubmit={createEkran}>
            <Card>
              <div className="flex items-center">
                <Prev />
                <Title title={"Dinamik Ekran Oluştur"} />
              </div>
              
            <label className="block text-sm mb-4">
                <span className={`text-gray-700 dark:text-gray-400`}>Kesim Adımı:</span>
                
       

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
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" disabled={!hisseGroupLoader}>
                      <option value="">{hisseGroupLoader}</option>
                      {processes.map((process) => (
                        <option key={process._id} value={process._id}>{process.process_title}</option>
                      ))}
                  </select>

            </label>

              <Input value={screen_title} title="Ekran Başlığı" name="screen_title" onChange={onChange} errors={errors} />
              <Button className={"mt-2 w-full"} disabled={loading}>
                {loading ? 'Oluşturuluyor' : 'Oluştur'}
              </Button>
            </Card>    
          </form>
      </>
    );
  }
  
  export default CreateBuyukbas;