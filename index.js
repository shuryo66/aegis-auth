const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth.php', (req, res) => {
    const userHwid = req.query.hwid;

    const rawHwids = process.env.ALLOWED_HWIDS || "";
    
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
