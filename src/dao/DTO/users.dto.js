export default class UserDTO {

    constructor(user) {
        this.id = user.id || user._id || null
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.age = user.age
        this.password = user.password
        this.role = user.role
        this.cart = user.cart
    }
}