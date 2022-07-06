import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
//import axios from 'axios';
import BKurbanService from '../../../../services/BKurbanService';
import HisseGroupService from '../../../../services/HisseGroupService';
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import Card from "../../../components/Card"
import Prev from "../../../components/Prev"
import Title from "../../../components/Title"
import Textarea from "../../../components/Textarea"
//import Video from '../../../FrontSide/components/Video'
//import v from "../../../../assets/uploads/2022-07-02T22:58:49.534Z.mp4"

//import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';

function EditBuyukbas() {

    let location = useLocation();
    //const isKurumAuth = useSelector((state) => state.auth.isKurum)
    //const kurum = useSelector((state) => state.auth.kurum)
    const active_project_id = useSelector((state) => state.kurum.active_project_id)
    //if(isKurumAuth) axios.defaults.headers.common['Authorization'] = `Bearer ${kurum.token}`;

    const navigate = useNavigate()
    //const [v, setV] = useState(false);
    const [percentage, setUploadFileProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const [singleFile, setSingleFile] = useState('');
    const [kurbanImage, setKurbanImage] = useState('');
    const [img, setImg] = useState('');

    const [hisseGroupLoader, setHisseGroupLoader] = useState("Hisse grupları yükleniyor..");
    const [selected, setSelected] = useState("")
    const [hisse_groups, setHisseGroup] = useState([]);

    const [formData, setFormData] = useState({
      _id: '',
      kurban_kupe_no: '',
      net_hisse_fiyat: '',
      kurban_weight: '',
      kurban_note: '',
      file: '',
    })
    
    const { kurban_kupe_no, net_hisse_fiyat, kurban_weight, kurban_note, file, _id } = formData
    
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value, // verilen propslardan name'e göre value'değerini match edip eşleştiriyor
      }))
    }

    const getHisseGroups = async () => {
      const request = await HisseGroupService.getByProject({project_id: active_project_id});
      if(request.status === 200) {
        const hisseGroupLoaderMessage = request.data.length > 0 ? "Hisse grubu seçiniz" : "Listelenecek hisse grubu bulunamadı"
        setHisseGroupLoader(hisseGroupLoaderMessage)
        setHisseGroup(request.data)
      }
    }

    const handleDropDown = (e) => {
      setSelected(e.target.value)
    }
    
    /* */
    useEffect(() => {
      console.log(location.state)
      setSelected(location.state.kurban_hisse_group)
      setImg(location.state.kurban_image)
      // NavLink ile gelen location.state deki değerleri state'teki öğelere geçmek için bu kadar işlem yapmaya gerek var mı?
      Object.keys(formData).forEach(key => {
        setFormData((prevState) => ({
          ...prevState,
          [key]: location.state[key]
        }))
      });

      
      getHisseGroups()
    }, [])

    const KurbanImageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
        setKurbanImage(file)
      }
    }
    
    const SingleFileChange = (e) => {
      setSingleFile(e.target.files[0]);
      //setSingleProgress(0);
    }

    const uploadFileOption = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        const percent = Math.floor(((loaded/1000) * 100) / (total/1000))
        setUploadFileProgress(percent)
        console.log(percentage)
      }
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

        const upload = await BKurbanService.upload(form, _id, uploadFileOption);

        console.log("upload video")

        if(!upload.data.error) {
          navigate(`/kurum/dashboard/${active_project_id}`)
        } else {
          console.log(upload.data)
        }

      } else if(kurbanImage) {
        const imageForm = new FormData();
        imageForm.append('kurban_img', kurbanImage);

        const uploadImage = await BKurbanService.uploadImage(imageForm, _id);

        if(!uploadImage.data.error) {
          navigate(`/kurum/dashboard/${active_project_id}`)
        } else {
          console.log(uploadImage.data)
        }

      }
      else {
        // bütün inputlar boş olduğunda submit edilince state boşta kalıyor ve response dönmüyor bunun için önlem - thats sucks
        
        // update
        const response = await BKurbanService.update({...formData, kurban_hisse_group: selected});
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

              <label className="block text-sm mb-4">
                <span className={`text-gray-700 dark:text-gray-400`}>Hisse Grubu:</span>
            
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
                      {hisse_groups.map((hisse_group) => (
                        <option key={hisse_group._id} value={hisse_group.hisse_group_title}>{hisse_group.hisse_group_title}</option>
                      ))}
                  </select>

              </label>

              <Input value={kurban_kupe_no} title="Küpe No" name="kurban_kupe_no" onChange={onChange} errors={errors} />
              <Input type="number" value={net_hisse_fiyat} title="Net Hisse Fiyatı" name="net_hisse_fiyat" onChange={onChange} errors={errors} />
              <Input value={kurban_weight} title="Kurban KG" name="kurban_weight" onChange={onChange} errors={errors} />
              <Textarea value={kurban_note} title="Kurban Not" name="kurban_note" onChange={onChange} errors={errors} />
              
              
              <hr />

              <div className="flex justify-center my-4">
                <div className="mb-3 w-full">
                  <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700 text-sm">Kurban Fotoğrafı Yükle</label>
                  <input className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="formFile"
                  type="file"
                  name="kurban_img"
                  onChange={(e) => KurbanImageChange(e)}
                  /> 
                </div>
              </div>

              <img className={`${img ? '' : 'hidden'}`} src={img} alt="kurban_image" />

              <hr />

              <label className="block text-sm my-4">
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

            {/* 
            <div style={{ width: 100, height: 100 }} className={`mx-auto my-1 ${percentage > 0 ? '' : 'hidden'}`}>
              <CircularProgressbar value={percentage} text={`${percentage === 100 ? "Yönlendiriliyor.." : "%"+percentage } `} 
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: 'butt',
                  textSize: percentage === 100 ? "10px" : '16px',
                  pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                  textColor: '#555',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })} />
            </div>
            */}

              {/*location.state.video_path && <Video path={location.state.video_path ? '../../../../assets/uploads/' + location.state.video_path : ""} /> */}

             {location.state.video_path && <video width="750" height="500" controls className={`${location.state.video_path ? "" : "hidden"}`}>
                <source src={location.state.video_path ? location.state.video_path : ""} type="video/mp4" />
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