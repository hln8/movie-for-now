import './notFound.css'

function NotFound(){
    return(
        <div className='container-404'>
            <div className='content-404'>
                <h1>We couldn't find what you were looking for.</h1>
                <p>Unfortunately the page you were looking for could not be found. It may be
                temporarily unavailable, moved or no longer exist.</p>
                <p>Check the URL you entered for any mistakes and try again. Alternatively, take a look around the rest of our site.</p>
            </div>
        </div>
    )
}
export default NotFound