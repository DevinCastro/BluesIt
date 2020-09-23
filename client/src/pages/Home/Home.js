import React, { useState } from 'react'
import API from '../../utils/API'

const Home = () => {

  const [mediaState, setMediaState] = useState({
    search: '',
    media: []
  })

  mediaState.handleInputChange = event => {
    setMediaState({ ...mediaState, [event.target.name]: event.target.value })
  }

//   mediaState.handleSearchOMDB = event => {
//     event.preventDefault()
//     API.getMedia(mediaState.search)
//       .then(({ data }) => {
//         setMediaState({ ...mediaState, media: data, search: '' })
//       })
//       .catch(err => console.error(err))
//   }

//   mediaState.handleSaveMedia = imdbID => {
//     const saveMedia = mediaState.media.filter(x => x.imdbID === imdbID)[0]
//     API.saveMedia(saveMedia)
//       .then(() => {
//         const media = mediaState.media.filter(x => x.imdbID !== imdbID)
//         setMediaState({ ...mediaState, media })
//       })
//   }

  return (
    <>
    <Router>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>My App</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink><Link className="link" to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link className="link" to="/portfolio">Portfolio</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link className="link" to="/contact">Contact</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contact" component={Contact} />
      </Switch>
      </div>
    </Router>
    
    <h1>Search for Movies & TV Shows</h1>
    <form>
      <p>
        <label htmlFor="search">search</label>
        <input 
          type="text" 
          name="search"
          value={mediaState.search}
          onChange={mediaState.handleInputChange} />
      </p>
      <p>
        <button onClick={mediaState.handleSearchOMDB}>Search OMDB</button>
      </p>
    </form>
    {
      mediaState.media.length > 0 ? (
        mediaState.media.map(media => (
          <div key={media.imdbID}>
            <img src={media.poster} alt={media.title} />
            <h3>{media.title}</h3>
            <h4>Type: {media.type}</h4>
            <h4>Year: {media.year}</h4>
            <h5>imdbID: {media.imdbID}</h5>
            <button onClick={() => mediaState.handleSaveMedia(media.imdbID)}>Save</button>
          </div>
        ))
      ) : null
    }
    </>
  )
}

export default Home