import { useEffect, useState } from 'react';
import './styles.scss';

export const Modal = ({ isOpen, onClose, options, selectedTask, onDelete, setTasks, allTasks }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [edit, setEdit] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen, edit])

    const handleClose = () => {
        setIsModalOpen(false);
        setEdit(false);
        onClose();
    }

    const handleDelete = () => {
        onDelete(selectedTask);
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setEditDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(allTasks, selectedTask)
        const updatedTasks = allTasks.map(task => {
            if (task.id === selectedTask.id) {
                return {
                    ...task,
                    title: editTitle,
                    description: editDescription
                };
            }
            return task;
        })
        setTasks(updatedTasks);
        onClose();
        setEdit(false);
    }

    return (
        isModalOpen && (
            <div className="modal-overlay">
                {
                    !options ?
                        <div className="modal-wrapper">
                            <h3 className="modal-wrapper__title">
                                Deseja excluir este item?
                            </h3>
                            <p className="modal-wrapper__task">
                                {
                                    selectedTask.description ? selectedTask.description : "Item sem descrição"
                                }
                            </p>
                            <div className="modal-wrapper__btns">
                                <button onClick={handleClose}>Não</button>
                                <button onClick={handleDelete}>Sim</button>
                            </div>
                        </div>
                        :
                        <div className="modal-wrapper">
                            <h3 className="modal-wrapper__title">
                                Deseja editar este item?
                            </h3>
                            {
                                !edit ?
                                    <p className="modal-wrapper__task">
                                        {
                                            selectedTask.description ? selectedTask.description : "Item sem descrição"
                                        }
                                    </p>
                                    : null
                            }

                            {
                                edit ?
                                    <>
                                        <form onSubmit={handleSubmit} className="modal-wrapper__form">
                                            <div className="modal-wrapper__form-inputs">
                                                <input
                                                    onChange={handleTitleChange}
                                                    placeholder={selectedTask.title}
                                                    value={editTitle}
                                                    type="text"
                                                    className="modal-wrapper__form-input"
                                                />
                                                <input
                                                    placeholder={selectedTask.description}
                                                    onChange={handleDescriptionChange}
                                                    value={editDescription}
                                                    type="text"
                                                    className="modal-wrapper__form-input"
                                                />
                                            </div>
                                            <div className="modal-wrapper__btns">
                                                <button type="button" onClick={handleClose}>Voltar</button>
                                                <button type="submit">Salvar</button>
                                            </div>
                                        </form>

                                    </>
                                    : null
                            }

                            {
                                !edit ?
                                    <div className="modal-wrapper__btns">
                                        <button onClick={handleClose}>Não</button>
                                        <button onClick={handleEdit}>Sim</button>
                                    </div>
                                    : null
                            }
                        </div>

                }
            </div>
        )
    )
}
