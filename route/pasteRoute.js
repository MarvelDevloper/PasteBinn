const express=require('express')
const verifyToken = require('../middleware/verifyToken')
const { addLink, getLink, getallLinks, getUserPaste, deletePaste, updatePaste } = require('../controller/pateController')
const pasteRoute=express.Router()


pasteRoute.post('/pastebin',verifyToken,addLink)
pasteRoute.get('/pastebin/:id',verifyToken,getLink)
pasteRoute.get('/pastebin',verifyToken,getallLinks)
pasteRoute.get('/get-user-paste',verifyToken,getUserPaste)
pasteRoute.delete('/delete-paste/:pasteId',verifyToken,deletePaste)
pasteRoute.patch('/update-paste/:pasteId',verifyToken,updatePaste)

module.exports=pasteRoute