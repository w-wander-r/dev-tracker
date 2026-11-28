import './index.css';
function Header() {
    
    return(
        <header>
            <div className="header-wrapper">
                <img className="logo" src="/logo/dev-tracker-logo.svg" alt="DevTracker Logo" />
                <div className="login-btn-wrapper">
                    <button className='secondary-btn'>Sign in</button>
                    <button className='secondary-btn'>Sign up</button>
                </div>
            </div>
        </header>
    );
}

export default Header