import { createContext, useState } from "react"

export const ModalContext = createContext()

const ModalContextProvider = props => {
    const [open, setIsOpen] = useState(false)

    const open_modal = () => {
        setIsOpen(true)
    }

    const close_modal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider value={{ open, open_modal, close_modal }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider