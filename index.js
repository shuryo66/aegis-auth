const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth.php', (req, res) => {
    const userHwid = req.query.hwid ? req.query.hwid.trim().toLowerCase() : "";
    
    const backupHwids = "abef8842331bfcdb0b676b40cfd2ba83bafd04d147d1c9c14fbe3b3370549a75:coder";
    const rawHwids = process.env.ALLOWED_HWIDS || backupHwids;
    
    let userRole = null;

    const entries = rawHwids.split(',');
    
    for (const entry of entries) {
        const cleanEntry = entry.trim();
        if (!cleanEntry) continue;

        const parts = cleanEntry.split(':');
        const hwid = parts[0] ? parts[0].trim().toLowerCase() : "";
        const role = parts[1] ? parts[1].trim().toLowerCase() : "user";

        if (hwid === userHwid) {
            userRole = role;
            break;
        }
    }

    if (userRole) {
        res.json({
            status: "success",
            key: "ACCESS_GRANTED_SECURE_KEY_1337",
            role: userRole
        });
    } else {
        res.json({
            status: "error",
            message: "ACCESS_DENIED"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
