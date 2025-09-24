import './footer.css'
import m4nLogo from '../../assets/M4N logo.png'

function Footer(){
    return (
        <footer className='footer'>
        <div className='footer-content'>
            <div className='footer-left'>
            <img src={m4nLogo} alt='M4N Logo' className='footer-logo' />
            <p className='copyright'>© 2025 M4N. This content is protected by copyright. Unauthorized use is prohibited. </p>
        </div>
        <div className='footer-right'>
            <ul className='footer-links'>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#extra">Extra</a></li>
            </ul>
        </div>
    </div>
</footer>
    )
}
export default Footer