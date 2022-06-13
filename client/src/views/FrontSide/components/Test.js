  import {MainContext} from '../pages/context'
  import {useContext} from 'react'
    
  function Test() {
    
    const { deger } = useContext(MainContext)

    return (
      <div>
        Test Component - {deger}
      </div>
    );
  }
  
  export default Test;
  