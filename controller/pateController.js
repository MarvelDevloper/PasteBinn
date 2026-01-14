const { asyncHandler, ApiError } = require("../middleware/ErrorHander")
const Paste = require("../model/pasteModel")
const { nanoid } = require('nanoid')


exports.addLink = async (req, res) => {
    const { text, status, expiration } = req.body
    const userId = req.userid
    const uniqueId = generateUniqueUrl()

    if (!text || !status) {
        throw new ApiError('all fields required')
    }

    // expiration in minutes from the request
    const expirationMinutes = parseInt(expiration) || 1; // default 10 day
    const expiresAt = new Date(Date.now() + expirationMinutes * 24 * 60 * 60 * 1000);

    const paste = new Paste({ userId, text, status, uniqueId, expiresAt })

    await paste.save()
    return res.status(200).json({ url: `https://pastebinn.onrender.com/user/pastebin/${uniqueId}` })
}


exports.getLink = asyncHandler(async (req, res) => {
    const uniqueId = req.params.id
    const userId = req.userid

    if (!uniqueId) {
        throw new ApiError('No Text Found or maybe text Expires', 404)
    }

    const existPaste = await Paste.findOne({ uniqueId: uniqueId }).populate('userId')

    if (!existPaste) {
        throw new ApiError('No Text Found or maybe text Expires', 404)
    }

    if (existPaste.status == 'private') {
        if (existPaste.userId.toString() !== userId.toString()) {
            throw new ApiError('Unauthorized content', 401)
        }
    }
    return res.status(200).json({ data: existPaste })
})


exports.getallLinks = asyncHandler(async (req, res) => {

    const existPaste = await Paste.find({}).populate('userId')

    if (!existPaste) {
        throw new ApiError('No Text Found or maybe text Expires', 404)
    }

    const publicPaste = existPaste.filter((paste) => {
        return paste.status === 'public'
    })

    return res.status(200).json({ publicPastes: publicPaste })
}),


    exports.getUserPaste = asyncHandler(async (req, res) => {
        const userId = req.userid

        const allPastes = await Paste.find({ userId: userId }).populate('userId')


        return res.status(200).json({ paste: allPastes })
    })


exports.deletePaste = asyncHandler(async (req, res) => {
    const userId = req.userid

    const pasteId = req.params.pasteId

    if (!pasteId) {
        throw new ApiError('all fields required', 404)
    }

    const existPaste = await Paste.findById(pasteId)

    if (!existPaste) {
        throw new ApiError('paste not found!')
    }

    const isValid = (existPaste.userId.toString() == userId)

    if (!isValid) {
        throw new ApiError('not allowed to delete the paste', 401)
    }
    const deletePastes = await Paste.findByIdAndDelete(pasteId)

    if (!deletePastes) {
        throw new ApiError('failed to delete the paste', 400)
    }
    return res.status(200).json({ paste: 'paste deleted successfully!' })
})


exports.updatePaste = asyncHandler(async (req, res) => {
    const userId = req.userid

    const pasteId = req.params.pasteId

    if (!pasteId) {
        throw new ApiError('all fields required', 404)
    }

    const existPaste = await Paste.findById(pasteId)

    if (!existPaste) {
        throw new ApiError('paste not found!')
    }

    const isValid = (existPaste.userId.toString() == userId)

    if (!isValid) {
        throw new ApiError('not allowed to update the paste', 401)
    }

    const updatePastes = await Paste.findByIdAndUpdate(pasteId, req.body, { new: true })

    if (!updatePastes) {
        throw new ApiError('failed to update the paste', 400)
    }
    return res.status(200).json({ paste: 'paste update successfully!' })
})


const generateUniqueUrl = () => {
    const id = nanoid(5)
    console.log(id)
    return id
}
