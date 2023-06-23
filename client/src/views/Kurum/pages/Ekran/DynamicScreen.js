
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BKurbanService from "../../../../services/BKurbanService"
import io from 'socket.io-client'

export default function DynamicScreen (props) {

    const [kurban, setKurban] = useState([]);
    const project_id = useSelector(state => state.kurum.active_project_id)
    const kurum = useSelector(state => state.auth.kurum)
    


        const getKurban = async () => {
            if(props.screen.self) {
                const request = await BKurbanService.getForEkran({ process_id: props.screen.process._id, project_id: project_id, kurum_id: kurum._id, self: true });
                if(request.status === 200) {
                    setKurban(request.data)
                }
            } else {
                const request = await BKurbanService.getForEkran({ process_id: props.screen.process._id, project_id: project_id, kurum_id: kurum._id, self: false });
                if(request.status === 200) {
                    setKurban(request.data)
                    console.log(request.data)
                }
            }
        }
        // iki kez çalışıyor
        useEffect(() => {
            getKurban()

            console.log(props)
            runSocket()
            
          }, []);

          const runSocket = () => {
              /* SOCKET.IO */
            //const socket = io.connect(process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_API_PROD_BASE_URL : process.env.REACT_APP_API_LOCAL_BASE_URL, { transports : ['websocket'] })
            const socket = io.connect('http://188.132.238.149', { transports : ['websocket'], path: '/api/socket.io' })
            socket.on(props.screen.process._id, () => {
                console.log("dynamic screen tetiklendi.");
                getKurban()
            });
          }
           

    return (
        <div>
            <h2>
                <b>{props.screen.screen_title}</b> EKRANI - {props.screen?.process?.process_title} işlemi
            </h2>
            
            <div className="flex mt-5">
           
                <div className="font-bold border-r-2 border-r-gray-400 px-8">
                    <h4 className="text-4xl">KURBAN NO:</h4>
                    <h4 className="text-[28rem]">{kurban[0]?.kurban_no}</h4>
                </div>
        
                <div className="px-6 pt-2 text-2xl">
                    <ul>
                        {kurban[0]?.hisse.map(value => (
                            <li key={value._id} className="py-2">
                                {`${value.hissedar_full_name} - ${value.hissedar_gsm}`}
                            </li>
                        ))}
                    </ul>
                </div>
       
            </div>
            
        </div>
    )
}