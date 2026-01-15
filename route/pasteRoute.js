const express=require('express')
const { addLink, getLink, getallLinks, getUserPaste, deletePaste, updatePaste } = require('../controller/pateController')
const { verifyAccessToken } = require('../Auth/verifyToken')
const pasteRoute=express.Router()


pasteRoute.post('/pastebin',verifyAccessToken,addLink)
pasteRoute.get('/pastebin/:id',verifyAccessToken,getLink)
pasteRoute.get('/pastebin',verifyAccessToken,getallLinks)
pasteRoute.get('/get-user-paste',verifyAccessToken,getUserPaste)
pasteRoute.delete('/delete-paste/:pasteId',verifyAccessToken,deletePaste)
pasteRoute.patch('/update-paste/:pasteId',verifyAccessToken,updatePaste)

module.exports=pasteRoute