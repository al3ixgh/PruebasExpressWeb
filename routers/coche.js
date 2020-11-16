const express = require('express')
const router = new express.Router()
const Coche = require('../models/coche')

router.post('/coches', async (req, res) => {
    const coche = new Coche(req.body)

    try {
        await coche.save()
        res.status(201).send(coche)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/coches', async (req, res) => {
    try {
        const coches = await Coche.find({})
        res.send(coches)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/coches/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const coche = await Coche.findById(_id)

        if (!coche) {
            return res.status(404).send()
        }

        res.send(coche)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/coches/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['marca', 'modelo']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const coche = await Coche.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!coche) {
            return res.status(404).send()
        }

        res.send(coche)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/coches/:id', async (req, res) => {
    try {
        const coche = await Coche.findByIdAndDelete(req.params.id)

        if (!coche) {
            res.status(404).send()
        }

        res.send(coche)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router 