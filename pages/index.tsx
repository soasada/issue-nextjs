export default function Home() {
    const handleButtonClick = () => fetch('/api/hello', {
        method: 'POST',
        body: JSON.stringify({id: 'idtest'}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return (
        <button type="button" onClick={handleButtonClick}>
            Click this button to fail
        </button>
    )
}
