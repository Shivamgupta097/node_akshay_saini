const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked")
    let token = 'xyz';
    let isAutherized = token !== "xyz"
    if (isAutherized) {
        next()
    } else {
        res.status(401).json({ message: "Unautherized" })
    }
}

module.exports = adminAuth
