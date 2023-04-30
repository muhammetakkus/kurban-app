export default function Title (props) {
    return (
        <h4 className={`${props.className} text-xl font-semibold`}>{props.title}</h4>
    );
}