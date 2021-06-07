/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "./layout"
import { Link, ModalRoutingContext } from "gatsby-plugin-modal-routing-3"

const ConditionalLayout = ({ children, ...rest }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) =>
      modal ? (
        <div
          sx={{
            zIndex: "1",
            position: "relative",
          }}
        >
          <Link to={closeTo}>Close</Link>
          {children}
        </div>
      ) : (
        <Layout {...rest}>{children}</Layout>
      )
    }
  </ModalRoutingContext.Consumer>
)

export default ConditionalLayout
