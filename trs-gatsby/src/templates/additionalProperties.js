/** @jsx jsx */
import { jsx } from "theme-ui"
import "rheostat/initialize"
import "rheostat/css/rheostat.css"
import Layout from "../components/layout"
import PropertyTeaser from "../components/entity/property/propertyTeaser"
import React, { Component, Fragment } from "react"
import withURLSync from "./URLSync"
import PropTypes from "prop-types"
import Rheostat from "rheostat"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectNumericMenu,
  connectRefinementList,
  connectRange,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ONLY_API_KEY
)

const AdditionalProperties = props => (
  <Layout>
    <InstantSearch
      searchClient={searchClient}
      indexName="additional_properties"
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}
    >
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          sx={{
            width: "200px",
          }}
        >
          <h3>Property Search</h3>
          <SearchBox />
          <div>Price Range</div>
          <ConnectedRange attribute="field_price" />
        </div>
        <div
          sx={{
            width: "calc(100% - 240px)",
          }}
        >
          <div>
            <MyHits />
            <Pagination />
          </div>
        </div>
      </div>
    </InstantSearch>
  </Layout>
)

const MyHits = connectHits(({ hits }) => {
  const hs = hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />)
  return <div id="hits">{hs}</div>
})

function HitComponent({ hit }) {
  console.log(hit)
  return (
    <PropertyTeaser property={hit} className="hit">
      {hit.field_price}
    </PropertyTeaser>
  )
}

class Range extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
  }

  state = { currentValues: { min: this.props.min, max: this.props.max } }

  componentDidUpdate(prevProps) {
    {
      // console.log(this)
    }
    if (
      this.props.canRefine &&
      (prevProps.currentRefinement.min !== this.props.currentRefinement.min ||
        prevProps.currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      this.setState({
        currentValues: {
          min: this.props.currentRefinement.min,
          max: this.props.currentRefinement.max,
        },
      })
    }
  }

  onValuesUpdated = sliderState => {
    this.setState({
      currentValues: { min: sliderState.values[0], max: sliderState.values[1] },
    })
  }

  onChange = sliderState => {
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      this.props.refine({
        min: sliderState.values[0],
        max: sliderState.values[1],
      })
    }
  }

  render() {
    const { min, max, currentRefinement } = this.props
    const { currentValues } = this.state
    return min !== max ? (
      <div>
        <Rheostat
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        />
        <div className="rheostat-values">
          <div>{currentValues.min}</div>
          <div>{currentValues.max}</div>
        </div>
      </div>
    ) : null
  }
}

const ConnectedRange = connectRange(Range)

export default withURLSync(AdditionalProperties)