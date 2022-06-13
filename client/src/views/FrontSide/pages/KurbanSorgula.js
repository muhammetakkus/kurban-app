import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from '../../components/Card'
import Input from '../../components/Input'
import Title from "../../components/Title";

export default function KurbanInfo() {

  const [kurban_code, setKurbanCode] = useState(''); 
  const navigate = useNavigate()

  useEffect(() => {
    
  },[])

  const onChange = (e) => {
    setKurbanCode(e.target.value)
  }

  const handleKurbanSorgula = (e) => {
    e.preventDefault();
    navigate(`/kurban-info/${kurban_code}`)
  }

  return (
    <div className="flex justify-center">
      <Card className="mx-10 lg:w-2/4">
      <Title title={"Kurbanınızın Durumunu Sorgulayın"} className="text-3xl" />
      <form onSubmit={handleKurbanSorgula} className="p-6">
        <Input title="Kurban Kodu" value={kurban_code} name="kurban_code" onChange={onChange} pholder="Sizinle paylaşılan kurban kodunu giriniz.." />
        <Button type="submit" className="w-full">Sorgula</Button>
      </form>
    </Card> 
    </div>
  )
}