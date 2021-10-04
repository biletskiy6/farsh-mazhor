import crudStore from "./generic"
const crudInstance = crudStore({
  url: "categories",
  name: "categories",
})
export default {
  ...crudInstance,
}
