export default function Title (props) {
    return (
        <h4 className={`${props.className} text-xl px-4 font-semibold`}>{props.title}</h4>
    );
}