export const setPrices = (store, payload) => {
  const prices = payload
  store.setState({ prices })
}
