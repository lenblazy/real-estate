import validator from "email-validator";

export const login = (req, res) => {

    const { email, password } = req.body;

    // validations
    if (!validator.validate(email)) {
        return res.json({ error: "A valid Email is required" });
    }

    if (!email?.trim()) {
        return res.json({ error: "Email is required" });
    }

    if (!password.trim()) {
        return res.json({ error: "Password is required" });
    }

    if (password.length < 6) {
        return res.json({ error: "Password must be at least 6 characters" });
    }

    try {

    } catch (e) {

    }

}

