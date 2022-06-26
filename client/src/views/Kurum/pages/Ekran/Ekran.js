import { useEffect, useState } from "react";
import EkranService from "../../../../services/EkranService";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";
import {useSelector} from "react-redux"
import DynamicScreen from "./DynamicScreen"

import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';
import "./ekran.css"
import ProcessService from "../../../../services/ProcessService";
function Ekran() {


    const kurum = useSelector((state) => state.auth.kurum)
    const [ekran, setEkran] = useState([]);
    const [process, setProcess] = useState([]);

    useEffect(() => {
      getEkran()
      getProcess()
    }, [])
    
    const getEkran = async () => {
      const request = await EkranService.getAll({kurum_id: kurum._id});
      console.log(request.data)
      if(request.status === 200) setEkran(request.data)
    }
    
    const getProcess = async () => {
      const request = await ProcessService.getAll({kurum_id: kurum._id});
      //console.log(request.data)
      if(request.status === 200) setProcess(request.data)
    }
    
    return (
      <Card>
          <div className="flex items-center justify-start mb-2">
            <Prev />
            <Title title={"Ekran Gösterimi"}/>
          </div>

          <div id="dynamic-kurban-track-screen overflow-hidden">
          <Slider
            autoplay={ekran.length > 0 ? true : false} // çalışmıyor
            speed={300}
            autoplaySpeed={3000}
            pauseOnHover={false}
           >
            {ekran.map((screen) => (
              <div className="slide border border-pink-500 overflow-hidden" key={screen._id}>
                {
                  screen.type === "dynamic" 
                  ? <DynamicScreen screen={screen} />
                  : <img className={"w-full"} src={screen.static_screen_image} alt="ekran" />
                }
                {screen.screen_type}
              </div>
            ))}
            </Slider>
          </div>
      </Card>
    );
  }
  
  export default Ekran;
  