import logo from './logo.svg';
import './App.css';
//import Todolist from "../src/components/TodoList";
import CityList from "../src/components/CityList";
//import Counter from "../src/components/Counter";
//import Toggle from "../src/components/Toggle";
const cities=["newyork","london","beirut","dubai","paris","barcelona"]

function App() {
  return (
  <>
    <div className='App'>
      <CityList cities={cities} />
    </div>
  </>
  );
}

export default App;
