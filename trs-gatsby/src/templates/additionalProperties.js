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
  MenuSelect,
  RefinementList,
  SortBy,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
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
          <SearchBox
            searchAsYouType={false}
            translations={{
              placeholder: 'Search by word or phrase',
            }}
          />
          <h2>Sort By</h2>
          <SortBy
            defaultRefinement="additional_properties_price_desc"
            items={[
              { value: 'additional_properties_price_desc', label: 'Price: High to Low' },
              { value: 'additional_properties_price_asc', label: 'Price: Low to High' },
              { value: 'additional_properties_acreage_desc', label: 'Acreage: High to Low' },
              { value: 'additional_properties_acreage_asc', label: 'Acreage: Low to High' },
              { value: 'additional_properties_date_desc', label: 'Newest to Oldest' },
              { value: 'additional_properties_date_asc', label: 'Oldest to Newest' },
            ]}
          />
          <h3>Price Range</h3>
          <ConnectedRange attribute="field_price" />
          <h3>County</h3>
          <CustomRefinementList attribute="field_county" />
          <h3>Acreage Range</h3>
          <ConnectedRange attribute="field_acreage" />
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
  // console.log(hit)
  return (
    <PropertyTeaser property={hit} className="hit">
      {hit.field_price}
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
    console.log(data)
    this.setState({ selected: data }, () => {
      this.props.refine(this.state.selected)
      console.log(this.state.selected)
    })
  }
  render() {
    const { selected } = this.state
    const options = []
    this.props.items.map(item => {
      // console.log(item)
      options.push({ label: item.label, value: item.label })
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
    console.log(item)
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
