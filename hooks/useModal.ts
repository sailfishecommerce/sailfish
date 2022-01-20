import { useState } from "react";

export default function useModal() {
    const [modal, setModal] = useState(false);

    function toggleModal() {
        setModal(!modal);
    }

    return {
        modal,
        toggleModal,
    };
}
