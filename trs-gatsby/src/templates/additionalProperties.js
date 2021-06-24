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
import Select from "react-select"
import MultiSelect from "@khanacademy/react-multi-select"
import qs from "qs"

import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectNumericMenu,
  connectStats,
  connectRefinementList,
  connectRange,
  MenuSelect,
  RefinementList,
  SortBy,
  Stats,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
class AdditionalProperties extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      filtersOpen: false,
    }
    this.toggleFilters = this.toggleFilters.bind(this)
  }
  toggleFilters() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen,
    }))
  }
  componentDidUpdate() {
    // if (typeof window !== "undefined" && window) {
    //   var searchState = JSON.parse(localStorage.getItem("searchState"))
    //   if(searchState !== this.props.location.search){
    //     localStorage.setItem("searchState", this.props.location.search)
    //   }
    //   if(searchState = this.props)
    //   console.log(this.props)
    //   // this.props.searchState
    //   // this.setState({ fav: true })
    // }
    if (typeof window !== "undefined" && window) {
      var searchState =
        window.location.pathname + "?" + qs.stringify(this.props.searchState)
      localStorage.setItem("searchState", searchState)
    }
  }

  render() {
    const Stats = ({ nbHits }) => <p>{nbHits} results</p>
    const CustomStats = connectStats(Stats)
    return (
      <Layout>
        <InstantSearch
          searchClient={searchClient}
          indexName="additional_properties"
          searchState={this.props.searchState}
          createURL={this.props.createURL}
          onSearchStateChange={this.props.onSearchStateChange}
        >
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: ["column", "column", "row"],
            }}
          >
            <div
              sx={{
                width: ["100%", "100%", "200px"],
                zIndex: "0",
              }}
            >
              <h3>Property Search</h3>
              <div
                sx={{
                  border: "thin solid blue",
                  display: ["inline-block", "inline-block", "none"],
                  padding: "5px 10px",
                  marginBottom: "20px",
                }}
                onClick={() => {
                  this.toggleFilters()
                }}
              >
                Filters
              </div>
              <div
                sx={{
                  width: "100%",
                  height: "100%",
                  zIndex: "10002",
                  position: ["fixed", "fixed", "relative"],
                  top: "0px",
                  left: "0px",
                  backgroundColor: "white",
                  animation: "0.3s ease-out 0s 1 normal none",
                  display: [
                    this.state.filtersOpen ? "block" : "none",
                    this.state.filtersOpen ? "block" : "none",
                    "block",
                  ],
                }}
              >
                <div
                  sx={{
                    padding: "0px",
                  }}
                >
                  <div
                    sx={{
                      border: "thin solid blue",
                      display: ["inline-block", "inline-block", "none"],
                      padding: "5px 10px",
                      marginBottom: "20px",
                    }}
                    onClick={() => {
                      this.toggleFilters()
                    }}
                  >
                    Done
                  </div>
                  <CustomStats />
                  <SearchBox
                    searchAsYouType={false}
                    translations={{
                      placeholder: "Search by word or phrase",
                    }}
                  />
                  <h2>Sort By</h2>
                  <SortBy
                    defaultRefinement="additional_properties_price_desc"
                    items={[
                      {
                        value: "additional_properties_price_desc",
                        label: "Price: High to Low",
                      },
                      {
                        value: "additional_properties_price_asc",
                        label: "Price: Low to High",
                      },
                      {
                        value: "additional_properties_acreage_desc",
                        label: "Acreage: High to Low",
                      },
                      {
                        value: "additional_properties_acreage_asc",
                        label: "Acreage: Low to High",
                      },
                      {
                        value: "additional_properties_date_desc",
                        label: "Newest to Oldest",
                      },
                      {
                        value: "additional_properties_date_asc",
                        label: "Oldest to Newest",
                      },
                    ]}
                  />
                  <h3>Price Range</h3>
                  <ConnectedRange attribute="price" />
                  <h3>County</h3>
                  <CustomRefinementList attribute="county" />
                  <h3>Acreage Range</h3>
                  <ConnectedRange attribute="acreage" />
                  <h3>Status</h3>
                  <RefinementList
                    sx={{
                      textTransform: "capitalize",
                    }}
                    attribute="status"
                  />
                  <ClearRefinements />
                </div>
              </div>
            </div>
            <div
              sx={{
                width: ["100%", "100%", "calc(100% - 240px)"],
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
  }
}
const MyHits = connectHits(({ hits }) => {
  const hs = hits.map(hit => <HitComponent key={hit.objectID} hit={hit} />)
  return <div id="hits">{hs}</div>
})

function HitComponent({ hit }) {
  return (
    <PropertyTeaser property={hit} className="hit">
      {hit.price}
    </PropertyTeaser>
  )
}

class Consumer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      selected: [],
    }
    this.changed = this.changed.bind(this)
  }

  changed(data) {
    this.setState({ selected: data }, () => {
      this.props.refine(this.state.selected)
    })
  }
  render() {
    const { selected } = this.state
    const options = []
    console.log(this.props.items)
    this.props.items.map(item => {
      options.push({
        label: item.label + " (" + item.count + ")",
        value: item.label,
      })
    })

    return (
      <MultiSelect
        options={options}
        selected={selected}
        onSelectedChanged={this.changed}
        overrideStrings={{
          selectSomeItems: "Select County",
          allItemsAreSelected: "All Counties are Selected",
          selectAll: "Select All",
          search: "Search",
        }}
      />
    )
  }
}
class RefinementListDis extends Component {
  constructor(props) {
    super(props)
    // this.state = { value: '' };
    this.state = {
      value: "",
      selectedOption: null,
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleSelectChange(item) {
    this.setState(
      {
        value: item,
      },
      this.props.refine(item.length > 0 ? item[item.length - 1].value : "")
    )
  }

  render() {
    const { selectedOption } = this.state
    return (
      // <Select
      //   options={this.props.items}
      //   value={selectedOption}
      //   isMulti={true}
      //   onChange={this.setSelectedOption}
      // />
      <Select
        isMulti={true}
        value={this.state.value}
        options={this.props.items}
        onChange={this.handleSelectChange}
      />
    )
  }
}
const CustomRefinementList = connectRefinementList(Consumer)

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
    ) : (
      <div
        sx={{
          pointerEvents: "none",
          opacity: "0.5",
        }}
      >
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
    )
  }
}

const ConnectedRange = connectRange(Range)

export default withURLSync(AdditionalProperties)
