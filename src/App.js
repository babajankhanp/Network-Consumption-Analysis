import logo from './logo.svg';
import './App.css';
import UsageMaps from './Components/UsageMaps';

function App() {
  return (
    <div className="App">
     <head>
      <title>Usage Maps Application</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A powerful tool for visualizing usage maps and statistics." />
      <link rel="icon" href="/favicon.ico" />
      <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments) };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    </head>
    <UsageMaps />
    </div>
  );
}

export default App;
