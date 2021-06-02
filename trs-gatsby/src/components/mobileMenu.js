// /** @jsx jsx */
// import { jsx } from "theme-ui"
// import * as React from "react"
// import { StaticQuery, graphql } from "gatsby"
// import { Link } from "gatsby"

// const MobileMenu = () => {
//   return (
//     <StaticQuery
//       query={graphql`
//         query MenuQuery {
//           sanityMenu {
//             title
//             _rawChildren(resolveReferences: { maxDepth: 10 })
//           }
//         }
//       `}
//       render={data => {
//         data.sanityMenu._rawChildren.map((menuItem, index) => (
//           <div
//             key={index}
//             sx={{
//               width: "calc(100% / 7)",
//               position: "relative",
//               "&:hover > div": {
//                 display: "block",
//                 visibility: "visible",
//                 opacity: 1,
//               },
//             }}
//           >
//             <Link
//               sx={{
//                 color: "black",
//                 textDecoration: "none",
//               }}
//               to={"/" + menuItem.children.document.slug.current}
//             >
//               {menuItem.children.title}
//             </Link>
//             {menuItem.children.submenu && (
//               <div
//                 sx={{
//                   visibility: "hidden",
//                   opacity: 0,
//                   position: "absolute",
//                   transition: "all 0.5s ease",
//                   paddingTop: "1rem",
//                   left: 0,
//                   display: "none",
//                   minWidth: "300px",
//                 }}
//               >
//                 {menuItem.children.submenu.map((menuSubItem, index) => (
//                   <Link
//                     sx={{
//                       color: "black",
//                       textDecoration: "none",
//                       display: "block",
//                       padding: "10px 0px",
//                       backgroundColor: "white",
//                     }}
//                     to={"/" + menuSubItem.document.slug.current}
//                   >
//                     {menuSubItem.document.title}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       }}
//     />
//   )
// }

// export default Menu
