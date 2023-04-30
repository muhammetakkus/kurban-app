import {useState, useEffect} from 'react'
export default function CheckBox({title, value = false}) {
      const [check, setCheck] = useState(value)
      useEffect(() => {
        setCheck(value)
      }, [value])
    return (
      
        <label className="flex items-center dark:text-gray-400">
            <input type="checkbox"
                defaultChecked={check}
                onChange={e => {setCheck(!check); console.log(check);}}
                className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
            <span className="ml-2">
                {title}
            </span>
        </label>
   
    );
}