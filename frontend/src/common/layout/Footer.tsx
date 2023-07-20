const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="border-t mt-10 py-4 px-1">
            <div className="small-container flex-col">
                <div>
                    <span>
                        PIS project 2023&nbsp;
                    </span>
                    <a target="_blank" href="https://github.com/Sekky61/pis-project" rel="noreferrer noopener" className="underline hover:font-bold">Github</a>
                </div>
            </div>
        </div>
    )
}

export default Footer