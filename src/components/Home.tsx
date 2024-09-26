// - ./src/components/Home.tsx

import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSignupClick = () => {
        navigate("/signup");
    }

    return (
        <section
            className="hero is-black is-fullheight-with-navbar"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="hero-body has-text-centered">
                <div className="container">
                    <p className="title" style={{ fontSize: '50px', marginLeft: '300px' }}>HBBC Licensing Portal</p>
                    <div className="buttons are-small is-centered" style={{ marginTop: '100px' }}>
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


