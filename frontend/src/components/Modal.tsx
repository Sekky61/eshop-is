
const CloseButton = () => {
    return (
        <div className="surface-2 rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:surface-4 ">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}

const Modal = ({ handleClose, show, children }: any) => {
    if (!show) return (<></>);

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-500/50 ">
            <div className="w-full h-full flex justify-center items-center">
                <section className="relative ">
                    {children}
                    <button type="button" onClick={handleClose} className="absolute top-0 right-0 m-1">
                        <CloseButton></CloseButton>
                    </button>
                </section>
            </div>
        </div>
    );
};


export default Modal;
