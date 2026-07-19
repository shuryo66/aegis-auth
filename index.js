const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth.php', (req, res) => {
    const userHwid = req.query.hwid ? req.query.hwid.trim().toLowerCase() : "";
    const backupHwids = "abef8842331bfcdb0b676b40cfd2ba83bafd04d147d1c9c14fbe3b3370549a75:coder:Администратор:1";
    const rawHwids = process.env.ALLOWED_HWIDS || backupHwids;
    
    let userData = null;
    const entries = rawHwids.split(',');
    
    for (const entry of entries) {
        const cleanEntry = entry.trim();
        if (!cleanEntry) continue;

        const parts = cleanEntry.split(':');
        const hwid = parts[0] ? parts[0].trim().toLowerCase() : "";
        const role = parts[1] ? parts[1].trim().toLowerCase() : "user";
        const name = parts[2] ? parts[2].trim() : "Unknown";
        const uid = parts[3] ? parts[3].trim() : "0";

        if (hwid === userHwid) {
            userData = { role, name, uid };
            break;
        }
    }

    if (userData) {
        res.json({
            key: "ACCESS_GRANTED_SECURE_KEY_1337",
            role: userData.role,
            name: userData.name,
            uid: userData.uid
        });
    } else {
        res.json({
            key: "ACCESS_DENIED",
            role: "none",
            name: "none",
            uid: "0"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
