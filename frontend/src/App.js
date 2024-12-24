import './App.css';
import Footer from './Component/Footer';
import Form from './Component/Form';


function App() {
  return (
    <div className="App bg-slate-900 flex flex-col h-[100vh] overflow-auto justify-center items-center lg:h-[100vh] ">
      <Form/>
      <Footer/>
    </div>
  );
}

export default App;
