import './about.css'

function About(){
    return(
        <div className='about-container'>
            <h1 className='main-title'>about</h1>
            <div className='section-box'>
                <h2 className='section-title'>Our Achievements</h2>
                <p>We have created a modern movie and series build a plateform where users can browse,rate,and discover new films and shows. we focused on delivering a smooth and interactive user experience</p>
                </div>
                <div className='section-box'>
                    <h2 className='section-title'>The Team</h2>
                    <ul className='team-list'>
                        <li>Majd Al-Qadasi</li>
                        <li>Markb Hajam</li>
                        <li>Mohammed Al-Wareeth</li>
                        <li>Mohammed Sabor</li>
                        <li>Najie Al-Leswas</li>
                    </ul>
                </div>
                <div className='section-box'>
                    <h2 className='section-title'>Technologies Used</h2>
                    <h1>REACT , Vite</h1>
                </div>
        </div>
    )
}
export default About