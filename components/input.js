export const Input = props => {
    return (
        <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">{props.label}</span>
            <div className={props.trailingIcon && `flex items-center`}>
                <div
                    className={`relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400 ${props.trailingIcon && 'w-full'}`}
                >
                    <input
                        className="block w-full pl-10 py-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                        placeholder={props.placeholder}
                        type={props?.type || 'text'}
                        onChange={props.onChange}
                        value={props.value}
                        readOnly={props.readOnly || false}
                    />
                    <div
                        className="absolute inset-y-0 flex items-center ml-3 pointer-events-none"
                    >
                        {props.icon}
                    </div>
                </div>
                {props.trailingIcon && <p className="ml-2">{props.trailingIcon}</p>}
            </div>
        </label>
    )
}

export const Select = props => {
    return (
        <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">{props.label}</span>
            <div
                className="relative text-gray-500 focus-within:text-blue-600 dark:focus-within:text-blue-400"
            >
                <select
                    onChange={props.onChange}
                    value={props.value}
                    className="block w-full pl-10 py-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                >
                    <option value="" disabled>-- Select {props.placeholder} --</option>
                    {
                        props.options && props.options.map((optionItem, index) => (
                            <option value={optionItem.value} key={index}>{optionItem.key}</option>
                        ))
                    }
                </select>
                <div
                    className="absolute inset-y-0 flex items-center ml-3 pointer-events-none"
                >
                    {props.icon}
                </div>
            </div>
        </label>
    )
}

export const Button = props => {
    return (
        <button className={`bg-${props.color}-400 px-4 py-2 text-${props.textColor} rounded hover:bg-${props.color}-500`} type={props.type}>
            <p className="py-1">{props.btnText}</p>
        </button>
    )
}