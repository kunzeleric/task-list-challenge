import { useEffect, useState } from 'react';
import './styles.scss';

export const Modal = ({ isOpen, onClose, options, task }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

    const handleClose = () => {
        setIsModalOpen(false);
        onClose();
    }

    return (
        isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-wrapper">
                    <h3 className="modal-wrapper__title">
                        {
                            !options ? "Deseja excluir este item?" : "Deseja editar este item?"
                        }
                    </h3>
                    <p className="modal-wrapper__task">{task.description}</p>
                    <div className="modal-wrapper__btns">
                        <button onClick={handleClose}>Não</button>
                        <button>Sim</button>
                    </div>
                </div>
            </div>
        )
    )
}
