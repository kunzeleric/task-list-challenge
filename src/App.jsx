import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import { db } from './mock/DATA_MOCK.js';

function App() {
  return (
    <>
      <Header />
      <TaskList data={db} />
    </>
  );
}

export default App;
