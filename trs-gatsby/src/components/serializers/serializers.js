import * as React from "react"
import Image from "./image"
const sanityConfig = { projectId: "5b1rgyjn", dataset: "production" }
const Serializers = {
  container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  types: {
    image: Image,
  },
}

export default Serializers
