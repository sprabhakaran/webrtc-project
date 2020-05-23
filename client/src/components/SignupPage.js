import React from "react"


import {Link} from "react-router-dom"


class SingupPage extends React.Component {

    render() {
        return (
            <div className="sign-up-page">
                    <div className="sign-up-box">
                        <form>
                               <h3>Create Account</h3>
                            <div>
                                <input placeholder="Email Address"></input>
                            </div>
                            <div>
                                <input type="password" placeholder="Password"></input>
                            </div>
                            <div>
                                <input type="password" placeholder="Repeat Password"></input>
                            </div>
                            <div className="right-align">
                                <button>Sign up</button>
                            </div>
                            <div className="right-align">
                                <Link to="/"> Back to login </Link>
                            </div>
                        </form>
                    </div>             
            </div>
        )
    }
}


export default SingupPage