const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth.php', (req, res) => {
    const userHwid = req.query.hwid;

    const rawHwids = process.env.ALLOWED_HWIDS || "abef8842331bfcdb0b676b40cfd2ba83bafd04d147d1c9c14fbe3b3370549a75";
    
    const allowedHwids = rawHwids.split(',').map(id => id.trim());

    if (userHwid && allowedHwids.includes(userHwid)) {
        res.send("ACCESS_GRANTED_SECURE_KEY_1337");
    } else {
        res.send("ACCESS_DENIED");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
