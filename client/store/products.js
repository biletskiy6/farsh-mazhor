import crudStore from "./generic"
const crudInstance = crudStore({
  url: "products",
  name: "products",
})
export default {
  ...crudInstance,
}
