const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auth.php', (req, res) => {
    const userHwid = req.query.hwid ? req.query.hwid.trim().toLowerCase() : "";
    const rawHwids = process.env.ALLOWED_HWIDS || "";
    
    // Переменная для хранения найденной роли
    let userRole = null;

    // Парсим строку вида: hwid:role,hwid:role
    const entries = rawHwids.split(',').map(item => item.trim());
    
    for (const entry of entries) {
        const [hwid, role] = entry.split(':');
        if (hwid && hwid.trim().toLowerCase() === userHwid) {
            userRole = role ? role.trim().toLowerCase() : 'user'; // по умолчанию 'user'
            break;
        }
    }

    if (userRole) {
        // Если HWID найден, отдаем JSON с успешным статусом и ролью
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
