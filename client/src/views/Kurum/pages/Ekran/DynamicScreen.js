
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BKurbanService from "../../../../services/BKurbanService"

export default function DynamicScreen (props) {

    const [kurban, setKurban] = useState([]);
    const project_id = useSelector(state => state.kurum.active_project_id)
    //const kurum = useSelector(state => state.auth.kurum)


        // iki kez çalışıyor
        useEffect(() => {
            const getKurban = async () => {
                if(props.screen.self) {
                    const request = await BKurbanService.getForEkran({ process_id: props.screen.process._id, project_id: project_id, self: true });
                    if(request.status === 200) {
                        setKurban(request.data)
                        console.log(request.data)
                    }
                } else {
                    const request = await BKurbanService.getForEkran({ process_id: props.screen.process._id, project_id: project_id, self: false });
                    if(request.status === 200) {
                        setKurban(request.data)
                        console.log(request.data)
                    }
                }
              }
            getKurban()
            console.log(props)
          }, []);
    
    return (
        <div>
            <h2><b>{props.screen.screen_title}</b> EKRANI - {props.screen.process.process_title} işlemi</h2>
            <ul>
                {kurban.map(item => (
                    <div key={item.uniq_kurban_code}>
                        <li key={item._id}>KURBAN NO: {item.kurban_no}</li>
               
                            {item.hisse.map(value => (
                                    <i key={value._id}>{`${value.hissedar_full_name} - ${value.hissedar_gsm}`}</i>                             
                            ))}
                    </div>
                ))}
            </ul>
        </div>
    )
}


