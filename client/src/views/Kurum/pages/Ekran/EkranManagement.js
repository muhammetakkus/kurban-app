import { NavLink } from "react-router-dom";
import Card from "../../../components/Card";
import Prev from "../../../components/Prev";
import Title from "../../../components/Title";

//import {NavLink} from 'react-router-dom'
function Ekran() {
    return (
      <Card>
          <div className="flex items-center justify-start mb-2">
            <Prev />
            <Title title={"Ekran Yönetimi"}/>
            <div className="flex flex-grow justify-end">
              <NavLink to={"/kurum/create-ekran"} className="text-purple-500 place-items-end">
                Ekran Oluştur+
              </NavLink>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    screen - 1
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span className="font-medium text-cyan-700 hover:text-cyan-900 cursor-pointer">
                        Sil
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    screen - 1
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span className="font-medium text-cyan-700 hover:text-cyan-900 cursor-pointer">
                        Sil
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    screen - 1
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span className="font-medium text-cyan-700 hover:text-cyan-900 cursor-pointer">
                        Sil
                      </span>
                    </div>
                  </div>
                </div>
              
            </div>
      </Card>
    );
  }
  
  export default Ekran;
  