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
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
      }
    },
  },
}
