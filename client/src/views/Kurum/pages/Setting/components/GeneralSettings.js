export default function GeneralSettings(props) {
    console.log('general settings')
    return (
        <section className={`card p-4 ${props.className} `}>
            kayıt esnasında otomatik mesaj gönder checkbox? - kayıt mesajıda custom seçilsin<br />
        </section>
    )
}