import { useState, useEffect } from 'react';
import './styles.scss';
import { CheckSquare, PencilSimple, Plus, PlusCircle, Square, TrashSimple } from 'phosphor-react';
import { Modal } from '../Modal';

export const TaskList = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);// gerencia o modal
    const [options, setOptions] = useState(null); // gerencia estado da opção selecionada (editar ou remover)
    const [taskData, setTaskData] = useState(null); // gerenciar a tarefa clicada
    const [input, setInput] = useState(""); // gerenciar input da tarefa nova
    const [tasks, setTasks] = useState(data); // gerencia os dados das tarefas

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

    const handleTaskChange = (event) => {
        setInput(event.target.value);
    }

    const handleTaskSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            id: Math.floor(Math.random() * 10000),
            title: input,
            description: '',
            completed: false
        };
        setTasks([...tasks, newTask]);
        document.querySelector('form').classList.add('hidden');
        setInput('');
    }

    const handleAddTask = () => {
        document.querySelector('form').classList.remove('hidden');
    }

    return (
        <div className="tasklist">
            <h2 className="tasklist-title" >
                Otimize seu tempo e se organize com o nosso Planejador Diário.
            </h2>
            <form className="tasklist-form hidden" onSubmit={handleTaskSubmit}>
                <input
                    className="tasklist-form__input"
                    type="text"
                    placeholder="Digite sua tarefa"
                    onChange={handleTaskChange}
                    value={input}
                />
                <button className="tasklist-form__btn" type="submit">
                    Adicionar
                    <Plus size={28} weight="bold" />
                </button>
                <button type="button" onClick={() => {
                    document.querySelector('form').classList.add('hidden');
                }} className="tasklist-form__btn">
                    Cancelar
                </button>
            </form>

            <div className="tasklist-table">
                <Modal 
                    isOpen={isOpen} 
                    onClose={handleCloseModal} 
                    task={taskData} 
                    options={options} 
                />
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
                            tasks.map((item) => {
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
                        <tr id="newTask">
                            <td className="tasklist__newTask">Nova tarefa...</td>
                            <td></td>
                            <td className="tasklist__newTask-button">
                                <PlusCircle
                                    className="icon"
                                    weight="duotone"
                                    onClick={handleAddTask}
                                    size={40}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
