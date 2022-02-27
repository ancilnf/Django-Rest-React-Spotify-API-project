import React from "react";
import HomePage from "./HomePage";

// export default class App extends Component{
//     constructor(props){
//         super(props);
//     }

//     render() {
//         return <h1> Testing React Code </h1>
//     }
// }

// const appDiv = document.getElementById('root');
// render (<App />, appDiv);


const App = () => {

    return (
        <div className="center">
        <HomePage />
        </div>
      );

}

export default App;