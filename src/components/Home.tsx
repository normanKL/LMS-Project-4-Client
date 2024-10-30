// - ./src/components/Home.tsx

import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import './Home.css'

function Home() {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("auth/login");
    }

    const handleSignupClick = () => {
        navigate("auth/register");
    }

    return (
        <>
            <section
                className="hero is-black is-fullheight-with-navbar"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/772988/pexels-photo-772988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-body">
                    <div className="container">
                        <div className="sub-container">
                            <p className="title">№.1 HugoLearn</p>
                            <div className="buttons mt-5">
                                <button
                                    className="button"
                                    onClick={handleSignupClick}
                                >
                                    Sign Up
                                </button>
                                <button
                                    className="button"
                                    onClick={handleLoginClick}
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;


