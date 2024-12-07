export function Footer() {
    const date = new Date();
    return (
        <footer className="footer app">
            {date.getFullYear() + " frnco® "}
        </footer>
    );
}
