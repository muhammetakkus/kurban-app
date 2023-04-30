export default function Button(props) {
    return (
      
        <button
        onClick={props.onClick}
        className={`${props.className} disabled:bg-purple-300 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple`}
        disabled={props.disabled}
        type={props.type}
        >{props.children}</button>
   
    );
}