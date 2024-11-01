exports.getAllData = async (req, res, next) => {
    try {
        console.log("get data for admin")
    } catch (error) {
        next(error)
    }
};