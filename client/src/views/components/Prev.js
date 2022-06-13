import { useNavigate } from 'react-router-dom'

export default function Prev (props) {
    const navigate = useNavigate()
    return (
      
        <div className="flex justify-start">
            <span onClick={() => navigate(-1)} className="cursor-pointer my-4 bg-white p-1 rounded-sm text-center dark:bg-gray-800/90 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            </span>
        </div>
    );
}