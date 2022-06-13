import { useEffect } from "react";
 
import Card from "../../components/Card"
import Prev from "../../components/Prev"
import Title from "../../components/Title"

function Hissedar() {


  useEffect(() => {
    
  }, [])
  
    return (
      <>
      <Card>              
          <div className="flex items-center justify-start">
            <Prev />
            <Title title={"Hissedarlar"}/>
          </div>
        
          <div className="container">
            hissedars will be listed soon..
          </div>
        </Card>
      </>
    );
}

export default Hissedar;