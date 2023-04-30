export default function Textarea(props) {
    const {
        title,
        className = "",
        type = 'text',
        name = "",
        value = "",
        pholder = "",
        onChange,
        errors = []
      } = props;
    return (
      
        <>
            <label className="block text-sm mb-4">
                <span className={`text-gray-700 dark:text-gray-400`}>{title}:</span>
                <textarea
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                className={` ${errors[name] ? "!border-pink-600" : ""} ${className} border-gray-400/30 rounded-[0.250rem] block w-full mt-1 text-md dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray`} placeholder={pholder}></textarea>
            
                { errors[name]
                ? <span className="text-pink-600 text-sm block py-1">{errors[name]}</span>
                : null
                }
            </label>    
        </>
   
    );
}