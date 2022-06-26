import { NavLink } from "react-router-dom";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";
import { useEffect, useState } from "react";
import EkranService from "../../../../services/EkranService";
import {useSelector} from "react-redux"

//import {NavLink} from 'react-router-dom'
function Ekran() {

  const kurum = useSelector((state) => state.auth.kurum)
  const [loading, setLoading] = useState(true);
  const [ekran, setEkran] = useState([]);

  useEffect(() => {
    const getEkran = async () => {
      const request = await EkranService.getAll({kurum_id: kurum._id});
      setLoading(false)
      if(request.status === 200) setEkran(request.data)
    }
    getEkran()
  }, [])

    return (
      <Card>
          <div className="flex items-center justify-start mb-2">
            <Prev />
            <Title title={"Ekran Yönetimi"}/>
            <div className="flex flex-grow justify-end">
              <NavLink to={"/kurum/create-ekran-static"} className="text-purple-500 place-items-end border-r border-r-purple-500 pr-4">
                Statik Ekran Oluştur+
              </NavLink>
              <NavLink to={"/kurum/create-ekran-dynamic"} className="text-purple-500 place-items-end pl-3">
                Dinamik Ekran Oluştur+
              </NavLink>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
             
              {ekran.map((screen) => (
                <div className="bg-white overflow-hidden shadow rounded-lg" key={screen._id}>
                  <div className="p-5">
                    {screen.screen_title}
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span className="font-medium text-cyan-700 hover:text-cyan-900 cursor-pointer">
                        Sil
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>

            <div className={`${loading ? "" : "hidden"} flex justify-center`}>
                <span>Yükleniyor...</span>
            </div>
      </Card>
    );
  }
  
  export default Ekran;
  