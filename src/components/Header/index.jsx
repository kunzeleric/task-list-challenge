import './styles.scss';

export const Header = () => {
    return (
        <header className="header-tasks">
            <ul className="header-tasks-menu">
                <li id="unactive">Organização</li>
                <li id="active">Tarefas</li>
            </ul>
        </header>
    )
}
