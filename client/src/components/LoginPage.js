import React from "react"

import {Link} from "react-router-dom"

class LoginPage extends React.Component {

    render() {
        return (
            <div className="login-page">
          
                <div>
                    <div className="login-box">
                        <form>
                            <div>
                                <input placeholder="Email Address"></input>
                            </div>
                            <div>
                                <input type="password" placeholder="Password"></input>
                            </div>
                            <div className="right-align">
                                <Link to="/forgot-password"> Forgot password </Link>
                            </div>
                            <div className="right-align">
                                <button>Sign In</button>
                            </div>
                            <div className="right-align">
                            <Link to="/sign-up" > Create account </Link>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>
        )
    }
}


export default LoginPage