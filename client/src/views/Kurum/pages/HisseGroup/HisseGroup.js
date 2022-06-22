import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HisseGroupList from "./HisseGroupList";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";
 
function Process() {


  useEffect(() => {
    
  }, [])
  
    return (
      <>
          <Card>
            <div className="flex items-center justify-start mb-2">
              <Prev />
              <Title title={"Hisse Grupları"}/>
              <div className="flex flex-grow justify-end">
                <NavLink to={"/kurum/create-hisse-grup"} className="text-purple-500 text-right">
                  Hisse Grubu Oluştur+
                </NavLink>
              </div>
            </div>

            <HisseGroupList />
          </Card>
      </>
    );
}

export default Process;