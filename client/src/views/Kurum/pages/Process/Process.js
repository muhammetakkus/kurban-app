import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProcessList from "./ProcessList";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";
 
function Process() {


  useEffect(() => {
    
  }, [])
  
    return (
        <Card>
          <div className="flex items-center justify-start mb-2">
            <Prev />
            <Title title={"İşlem Adımları"}/>
            <div className="flex flex-grow justify-end">
              <NavLink to={"/kurum/create-process"} className="text-purple-500 text-right">
                İşlem Adımı Oluştur+
              </NavLink>
            </div>
          </div>

          <ProcessList />
        </Card>
    );
}

export default Process;