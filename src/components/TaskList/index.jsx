import { useState, useEffect } from 'react';
import './styles.scss';
import { CheckSquare, PencilSimple, Plus, PlusCircle, Square, TrashSimple } from 'phosphor-react';
import { Modal } from '../Modal';

export const TaskList = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);// gerencia o modal
    const [options, setOptions] = useState(null); // gerencia estado da opção selecionada (editar ou remover)
    const [selectedTask, setSelectedTask] = useState(null); // gerenciar a tarefa clicada
    const [input, setInput] = useState(""); // gerenciar input da tarefa nova
    const [tasks, setTasks] = useState(data); // gerencia os dados das tarefas

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleRemoveModal = (item) => {
        setOptions(false);
        handleOpenModal();
        setSelectedTask(item);
    }

    const handleEditModal = (item) => {
        setOptions(true);
        setSelectedTask(item);
        handleOpenModal();
    }

    const handleTaskChange = (event) => {
        setInput(event.target.value);
    }

    const handleTaskSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            id: Math.floor(Math.random() * 1000),
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

    const handleDeleteTask = (task) => {
        const tasksWithoutDeletedOne = tasks.filter(item => item.id !== task.id);
        setTasks(tasksWithoutDeletedOne);
        setIsOpen(false);
    }

    const handleCheckTask = (item) => {
        setSelectedTask(item);
        const updatedTasks = tasks.map(task => {
            if(task.id === item.id){
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        })

        setTasks(updatedTasks);
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
                    selectedTask={selectedTask} 
                    options={options}
                    onDelete={handleDeleteTask}
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
                                                    ? <CheckSquare onClick={() => handleCheckTask(item)} className="icon" weight="regular" />
                                                    : <Square onClick={() => handleCheckTask(item)} className="icon" weight="regular" />
                                            }
                                        </td>
                                        <td className="tasklist-table__options">
                                            <TrashSimple
                                                className="icon"
                                                onClick={() => handleRemoveModal(item)}
                                                weight="fill"
                                            />
                                            <PencilSimple
                                                className="icon"
                                                onClick={() => handleEditModal(item)}
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
