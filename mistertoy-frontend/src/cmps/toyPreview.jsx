export function ToyPreview({ toy }) {
    return <section className="toy-preview">
        <h2>{toy.name}</h2>
        <span>{toy.price}$</span>
    </section>
}