export default function Card(props) {
    return (
      
        <div className={`${props.className} px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800`}>
            {props.children}
        </div>
   
    );
}