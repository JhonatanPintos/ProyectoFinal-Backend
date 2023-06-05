import { Product, Cart, User, Message, Mock } from '../dao/factory.js'

import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'
import MessageRepository from './messages.repository.js'
import CartRepository from './carts.repository.js'
import MockRepository from "./mock.repository.js"

export const ProductService = new ProductRepository(new Product)
export const UserService = new UserRepository(new User)
export const MessageService = new MessageRepository(new Message)
export const CartService = new CartRepository(new Cart)
export const MockService = new MockRepository(new Mock)
