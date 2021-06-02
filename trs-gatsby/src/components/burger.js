/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

const Burger = () => {
  return (
    <div
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
        zIndex: "10",
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
        }}
      ></div>
    </div>
  )
}
export default Burger
