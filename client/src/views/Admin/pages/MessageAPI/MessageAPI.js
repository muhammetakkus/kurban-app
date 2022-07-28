import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MessageAPIList from "./MessageAPIList";
import Card from "../../../components/Card";
import Title from "../../../components/Title";
 
function MessageAPI() {


  useEffect(() => {
    
  }, [])
  
    return (
        <Card>
          <div className="flex items-center justify-start mb-2">
            <Title title={"Message APIs"}/>
            <div className="flex flex-grow justify-end">
              <NavLink to={"/admin/create-message-api"} className="text-purple-500 text-right">
                Message API+
              </NavLink>
            </div>
          </div>

          <MessageAPIList />
        </Card>
    );
}

export default MessageAPI;