const multer = require("multer");
const path = require("path");

module.exports = multer({
    storage: multer.diskStorage({
        // destination:function(req,file,cb){
        //     cb(null,'public/')
        // },
        // filename: function(req,file,cb){
        //     let ext=path.extname(file.originalname)
        //     cb(null,  Date.now()+ '-'+ ext)
        //   }

    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});
