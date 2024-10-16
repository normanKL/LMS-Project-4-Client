// - ./src/components/Home.tsx

import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("auth/login");
    }

    const handleSignupClick = () => {
        navigate("auth/register");
    }

    return (
        <section
            className="hero is-black is-fullheight-with-navbar"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/772988/pexels-photo-772988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="hero-body has-text-centered">
                <div className="container">
                    <p className="title" style={{ fontSize: '50px', marginLeft: '300px' }}>№.1 HugoLearn</p>
                    <div className="buttons are-small is-centered" style={{ marginTop: '50px' }}>
                        <button
                            className="button is-white"
                            onClick={handleSignupClick}
                            style={{ marginRight: '40px', fontSize: '20px', marginLeft: '300px' }}
                        >
                            Sign Up
                        </button>
                        <button
                            className="button is-white is-small"
                            onClick={handleLoginClick}
                            style={{ fontSize: '20px' }}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;


