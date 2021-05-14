/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

class Favorite extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      fav: false,
    }
    this.setFavorite = this.setFavorite.bind(this)
  }
  componentWillMount() {
    var favorites = JSON.parse(localStorage.getItem('Favorites'));
    console.log(favorites)
    if (favorites !== null) {
      if (favorites.some(favorites => favorites.mlsid === this.props.property.mlsid)) {
        this.setState({ fav: true }, () => {
        })
      }
    }


  }

  setFavorite(property) {
    var favorites = JSON.parse(localStorage.getItem('Favorites'));
    if (favorites === null) {
      var detail = [property];
      localStorage.setItem('Favorites', JSON.stringify(detail));
      this.setState({ fav: true })
    }
    else {
      // console.log(favorites)
      // if (!favorites.some(function (obj) {
      //   return obj.mlsid === mls;
      // })) {
      //   favorites.push({ "mlsid": mls });
      // };

      // localStorage.setItem('Favorites', JSON.stringify(favorites));
      if (favorites.some(favorites => favorites.mlsid === this.props.property.mlsid)) {
        this.setState({ fav: false }, () => {
          const newList = favorites.filter((item) => item.mlsid !== property.mlsid);
          localStorage.setItem('Favorites', JSON.stringify(newList));
          console.log(newList)
        })
      }
      else {
        this.setState({ fav: true }, () => {
          favorites.push(property);
          localStorage.setItem('Favorites', JSON.stringify(favorites));
        })
      }

    }
  }
  render() {
    return (
      <div
        sx={{
          color: this.state.fav === true ? 'red' : 'green'
        }}
        onClick={() => { this.setFavorite(this.props.property) }}>{this.state.fav === true ? 'Remove from Favorites' : 'Add to Favorites'}</div>
      // <h2>test</h2>
    )
  }
}
export default Favorite
