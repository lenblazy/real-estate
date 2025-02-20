export const login = (req, res) => {
    res.json({
        ...req.body,
        message: "Logged in successfully"
    })
}

