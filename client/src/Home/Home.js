import './Home.css'
import logo from './images/logo.png'
import homeProfile from './images/homeProfilePic.png'
function Home() {
  return (
    <div>
    <div id='wrapper'>
      <div className='description'>
        <h1>Upgrade your project</h1>
        <img src={logo} className='mainLogo' alt="logo" />
        <p>Designed to improve your teamwork experience, komanda offers a wide range of possibilities when it comes to project management.</p>
        <p>All within a couple of clicks.</p>
        <button className='homeButton'>Try Komanda</button>
      </div>
      <div className = 'sideProfile'>
        <img src={homeProfile} className='homeProfilePic' alt="You Profile Picture" />
        <h2>You! Yes, you!</h2>
        <button className='profileButton'>Profile</button>
      </div>
      <div id='wrapperTutorial'>
        <div className = 'tutorialVideo'>
          <iframe width="600" height="400" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ">
          </iframe>
        </div>
        <div className = 'tutorialText'>
          <h1 className = 'tutorialTitle'>Tutorial</h1>
          <p>Want to dive in and experience everything first hand? Here is a quick tutorial that will introduce to to the basics of this application.</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Home