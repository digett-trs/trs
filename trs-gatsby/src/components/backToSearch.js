/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"

class BackToSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchState: "/properties",
    }
  }
  componentWillMount() {
    if (typeof window !== "undefined" && window) {
      var searchState = JSON.parse(localStorage.getItem("searchState"))
      console.log(searchState)
      // this.setState({ searchState: searchState })
    }
  }
  render() {
    return "test"
  }
}
export default BackToSearch
