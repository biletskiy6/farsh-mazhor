export function validate(callback) {
  return new Promise((resolve, reject) => {
    this.$v.$touch()
    console.log(this.$v)
    if (this.$v.$invalid) return reject(new Error('Invalid'))
    resolve(callback())
  })
}
