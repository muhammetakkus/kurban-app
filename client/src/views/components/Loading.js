export default function Loading({loading, className = ""}) {
    return (
      
        <div className={` ${loading ? '' : 'hidden'} ${className} relative text-center text-sm text-cool-gray-900`}>
            <span className='animate-pulse'>Yükleniyor</span>
        </div>
   
    );
}