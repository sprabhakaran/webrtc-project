import React from "react"

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
                                <a href="#">forgot password?</a>
                            </div>
                            <div className="right-align">
                                <button>Sign In</button>
                            </div>
                            <div className="right-align">
                                <a href="#">create account</a>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>
        )
    }
}


export default LoginPage