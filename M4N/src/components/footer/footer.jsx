import './footer.css'
import m4nLogo from '../../assets/M4N logo.png'

function Footer(){
    return (
<footer className='footer'> {/* Footer container */}
    <div className='footer-content'> {/* Main content of the footer */}
        <div className='footer-left'> {/* Left section with logo and copyright */}
            <img src={m4nLogo} alt='M4N Logo' className='footer-logo' /> {/* Logo image */}
            <p className='copyright'> {/* Copyright text */}
                © 2025 M4N. This content is protected by copyright. Unauthorized use is prohibited.
            </p>
        </div>
        <div className='footer-right'> {/* Right section with links */}
            <ul className='footer-links'> {/* List of footer links */}
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href='/favorites'>Favorites</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/awards">Awards</a></li>
            </ul>
        </div>
    </div>
</footer>
    )
}
export default Footer