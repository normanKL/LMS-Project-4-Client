//- ./src/components/Footer.tsx

import React from 'react';
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer
            className="footer has-background-dark has-text-light"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '15px 0',
                fontSize: '16px',
            }}
        >
            <div className="content has-text-centered">
                <div className="columns is-mobile is-vcentered">
                    <div className='column' >
                        <p className='copyright'>© 2024 HugoLearn Portal - All Rights Reserved</p>
                    </div>
                    <div className='column' >
                        <a href="mailto:cheahhonyuen@gmail.com?subject=HBBC%20Portal%20Inquiry&body=I%20would%20like%20to%20inquire%20about...">
                            <button className="button is-small is-primary" style={{ fontSize: '15px', margin:'5px' }}>
                                Contact Helpdesk
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;