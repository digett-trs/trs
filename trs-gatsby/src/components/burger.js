/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

class Burger extends React.Component {
  clickMe = () => {
    this.props.clickMe()
  }
  render() {
    return (
      <div
        onClick={this.clickMe}
        sx={{
          display: ["flex", "none", "none"],
          flexDirection: "column",
          justifyContent: "space-around",
          width: "2rem",
          height: "2rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0",
          zIndex: "1001",
          transition: "all 0.3s linear",
          right: [this.props.open ? "15px" : "0px", "null", "null"],
          top: [this.props.open ? "15px" : "0px", "null", "null"],
          position: [this.props.open ? "fixed" : "relative", "null", "null"],
          transformOrigin: "1px",
        }}
      >
        <div
          sx={{
            width: "2rem",
            height: "0.25rem",
            background: "black",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            transform: [
              this.props.open ? "rotate(45deg)" : "rotate(0)",
              "null",
              "null",
            ],
          }}
        ></div>
        <div
          sx={{
            width: "2rem",
            height: "0.25rem",
            background: "black",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            opacity: [this.props.open ? "0" : "1", "null", "null"],
            transform: [
              this.props.open ? "translateX(20px)" : "translateX(0)",
              "null",
              "null",
            ],
          }}
        ></div>
        <div
          sx={{
            width: "2rem",
            height: "0.25rem",
            background: "black",
            borderRadius: "10px",
            transition: "all 0.3s linear",
            position: "relative",
            transformOrigin: "1px",
            transform: [
              this.props.open ? "rotate(-45deg)" : "rotate(0)",
              "null",
              "null",
            ],
          }}
        ></div>
      </div>
    )
  }
}
export default Burger
