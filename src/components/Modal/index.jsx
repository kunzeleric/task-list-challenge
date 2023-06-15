import { useEffect, useState } from 'react';
import './styles.scss';

export const Modal = ({ isOpen, onClose, options, task, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

    const handleClose = () => {
        setIsModalOpen(false);
        onClose();
    }

    const handleDelete = () => {
        onDelete(task);
    }

    return (
        isModalOpen && (
            <div className="modal-overlay">
                {
                    !options ?
                        <div className="modal-wrapper">
                            <h3 className="modal-wrapper__title">
                                "Deseja excluir este item?"
                            </h3>
                            <p className="modal-wrapper__task">
                                {
                                    task.description ? task.description : "Item sem descrição"
                                }</p>
                            <div className="modal-wrapper__btns">
                                <button onClick={handleClose}>Não</button>
                                <button onClick={handleDelete}>Sim</button>
                            </div>
                        </div>
                        :
                        <div className="modal-wrapper">
                            <h3 className="modal-wrapper__title">
                                "Deseja editar este item?"
                            </h3>
                            <p className="modal-wrapper__task">
                                {
                                    task.description ? task.description : "Item sem descrição"
                                }</p>
                            <div className="modal-wrapper__btns">
                                <button onClick={handleClose}>Não</button>
                                <button>Sim</button>
                            </div>
                        </div>
                }
            </div>
        )
    )
}
