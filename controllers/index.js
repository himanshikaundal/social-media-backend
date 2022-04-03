module.exports = {
    home: (req, res) => {
        res.json({ title: `Welcome to ${process.env.APP_NAME}` });
    }
}