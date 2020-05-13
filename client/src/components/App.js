import React from "react"

import ContactsPane from "./ContactsPane"
import ViewArea from "./ViewArea"

class App extends React.Component{
    render(){
        return(
            <div className="app">
                <ContactsPane />
                <ViewArea />
            </div>
        )
    }
}

export default App