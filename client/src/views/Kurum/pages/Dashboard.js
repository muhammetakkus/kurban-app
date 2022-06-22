//import {NavLink} from 'react-router-dom'
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch} from "react-redux"
//import DashboardWidget from "../components/DashboardWidget"
import BuyukBasKurbanList from "./BuyukBasKurban/BuyukBasKurbanList"
import {setActiveProjectID} from  "../../../store/reducers/kurum.dashboard"
import Button from "../../components/Button";
/* Örnek Redux kullanımı - hem redux metodlarını çağırmak gerekiyor hem de reducer dosyanı */


function Dashboard() {
  const dispatch = useDispatch()
  
  // project_id
  let { project_id } = useParams();

  useEffect(() => {
    console.log(project_id);
    dispatch(setActiveProjectID(project_id))
  }, [])

    return (
      <>
            {/* <DashboardWidget /> */}

            <div className="flex justify-end ">
              <NavLink to={"/kurum/create-buyukbas"}>
                <Button className="py-2.5 mb-3">Kurban Oluştur+</Button>
              </NavLink>
            </div>

            <BuyukBasKurbanList project_id={project_id} />
      </>
    );
  }
  
  export default Dashboard;