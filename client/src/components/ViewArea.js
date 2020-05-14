import React from "react"

import ViewAreaTop from "./ViewAreaTop"
import ViewAreaBody from "./ViewAreaBody"
import ViewAreaFooter from "./ViewAreaFooter"



class ViewArea extends React.Component {
    render() {
        return (
            <div className="view-area">
                <ViewAreaTop selectedContact={this.props.selectedContact} />
                <ViewAreaBody />
                <ViewAreaFooter />
            </div>
        )
    }
}

export default ViewArea