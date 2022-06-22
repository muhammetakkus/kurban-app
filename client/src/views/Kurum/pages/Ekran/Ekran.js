import { useEffect } from "react";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";



function Ekran() {

    useEffect(() => {
      
    }, [])

    return (
      <Card>
          <div className="flex items-center justify-start mb-2">
            <Prev />
            <Title title={"Ekran Gösterimi"}/>
          </div>

          <div id="dynamic-kurban-track-screen">

          </div>
      </Card>
    );
  }
  
  export default Ekran;
  