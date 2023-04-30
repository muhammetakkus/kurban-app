export default function AccountSettings(props) {

    return (
        <section className={`card p-4 ${props.className} `}>
            HESAP AYARLARI
            
            <ul>
                <li>KURUM FULL_NAME</li>
                <li>KURUM EMAIL</li>
                <li>KURUM USERNAME</li>
                <li>KURUM GSM</li>
            </ul>
        </section>
    )
}