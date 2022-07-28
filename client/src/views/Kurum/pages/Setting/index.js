import { useState } from "react";
import "./setting.scss"
import AccountSettings from "./components/AccountSettings"
import GeneralSettings from "./components/GeneralSettings"
import MessageSettings from "./components/MessageSettings"
export default function Index () {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab = (tab) => {
        setActiveTab(tab)
    }
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-row md:flex-col setting-menu gap-2 mb-4 md:mb-0 md:mr-2">
                <div className={`${ activeTab === "tab1" ? "active" : "" } card`} onClick={() => handleTab("tab1")}>
                    <span>Hesap Ayarları</span>
                </div>
                <div className={`${ activeTab === "tab2" ? "active" : "" } card`} onClick={() => handleTab("tab2")}>
                    <span>Genel Ayarlar</span>
                </div>
                <div className={`${ activeTab === "tab3" ? "active" : "" } card`} onClick={() => handleTab("tab3")}>
                    <span>Mesaj Ayarları</span>
                </div>
            </div>
            <div className="setting-content flex-1">
                {
                    activeTab === "tab1" ? <AccountSettings className={`tab1 px-7 py-5`} /> 
                    : (activeTab === "tab2")  ? <GeneralSettings className={`tab2 px-7 py-5`} />
                    : (activeTab === "tab3")  ? <MessageSettings className={`tab3 px-7 py-5`} />
                    : null
                }   
            </div>
        </div>
    )
}