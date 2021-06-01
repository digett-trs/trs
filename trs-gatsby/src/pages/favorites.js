/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Layout from "../components/layout"
import PropertyTeaser from "../components/entity/property/propertyTeaser"

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: [{}],
    }
  }
  componentWillMount() {
    if (typeof window !== 'undefined' && window) {
      var favorites = JSON.parse(localStorage.getItem('Favorites'));
      console.log(favorites)
      this.setState({ favorites: favorites }, () => {
        console.log(this.state.favorites)
      })
    }
  }
  render() {
    return (
      <Layout>
        {this.state.favorites[0] &&
          this.state.favorites.map((fav, index) => (
            // <PropertyTeaser property={fav}></PropertyTeaser>
            'test'
          ))
        }
        {!this.state.favorites[0] &&

          <h3>No favorites added yet.</h3>
        }

      </Layout>

    )
  }
}
export default Favorites
