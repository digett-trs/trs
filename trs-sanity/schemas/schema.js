// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import siteSettings from "./siteSettings";
import page from "./page";
import menuItemSub from "./menuItemSub";
import menuItemItem from "./menuItemItem";
import menuItem from "./menuItem";
import menu from "./menu";
import county from "./county";
import region from "./region";
import propertyType from "./propertyType";
import property from "./property";
import team from "./team";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    siteSettings,
    page,
    menuItemSub,
    menuItemItem,
    menuItem,
    menu,
    county,
    region,
    propertyType,
    property,
    team,
  ]),
});
