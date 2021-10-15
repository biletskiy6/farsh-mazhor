import crudStore from "./generic"
const crudInstance = crudStore({
  url: "products",
  name: "products",
})
export default {
  ...crudInstance,
  getters: {
    ...crudInstance.getters,
    image: () => (item) => {
      if (item.cover_image) {
        return `${process.env.BASE_URL}/public/products/${item.cover_image}`
      } else {
        return "/image-placeholder.jpg"
      }
    },
  },
}
