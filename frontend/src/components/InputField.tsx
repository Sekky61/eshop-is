
const InputField = ({ register, errors, name, labelText, type, decimal }: any) => {

    const inputType = type ? type : "text";

    const isDecimal = decimal ? true : false;

    let aditional = undefined;
    if (inputType == "number") {
        aditional = {
            valueAsNumber: true,
        };
    }
    const spreadResult = register(name, aditional);


    const hasError = errors[name] ? true : false;
    return (
        <div className="w-full">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelText}</label>
            <input type={inputType} id={name} step={isDecimal ? ".01" : null} {...spreadResult} className={"w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block " + (hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "")} />
            <p className="text-xs my-0.5 text-red-500">{errors[name] ? errors[name].message : ''}</p>
        </div >
    );
}

export default InputField;