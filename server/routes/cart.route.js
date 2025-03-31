import express, { Router } from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js'
import authUser from '../middleware/auth.js'

const cartRouter = Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter