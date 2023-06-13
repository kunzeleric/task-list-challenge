import { useState } from 'react';
import './styles.scss';
import { CheckSquare, PencilSimple, Plus, Square, TrashSimple } from 'phosphor-react';
import { Modal } from '../Modal';

export const TaskList = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(null);
    const [taskData, setTaskData] = useState(null);

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleRemove = (item) => {
        setOptions(false);
        handleOpenModal();
        setTaskData(item);
    }

    const handleEdit = (item) => {
        setOptions(true);
        handleOpenModal();
        setTaskData(item);
    }


    return (
        <div className="tasklist">
            <h2 className="tasklist-title" >
                Otimize seu tempo e se organize com o nosso Planejador Diário.
            </h2>
            <div className="tasklist-table">
                <Modal isOpen={isOpen} onClose={handleCloseModal} task={taskData} options={options} />
                <table>
                    <thead>
                        <tr className="tasklist-table__header">
                            <th>Tarefa</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td className="tasklist-table__status">
                                            {
                                                item.completed === true
                                                    ? <CheckSquare className="icon" weight="regular" />
                                                    : <Square className="icon" weight="regular" />
                                            }
                                        </td>
                                        <td className="tasklist-table__options">
                                            <TrashSimple
                                                className="icon"
                                                onClick={() => handleRemove(item)}
                                                weight="fill"
                                            />
                                            <PencilSimple
                                                className="icon"
                                                onClick={() => handleEdit(item)}
                                                weight="fill"
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td className="tasklist__newTask">Nova tarefa...</td>
                            <td></td>
                            <td className="tasklist__newTask-button">
                                <Plus weight="bold" size={28} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
