const db = require('../config/db');

const FooterModel = {
    getFooterConfig: async () => {
        try {
            // Buscamos la sección Footer en la tabla sections o home_section_footer
            // Intentamos primero home_section_footer (nuevo esquema)
            try {
                const [rows] = await db.query('SELECT * FROM home_section_footer LIMIT 1');
                if (rows.length > 0) return rows[0];
            } catch (e) {
                // Si no existe, buscamos en la tabla sections (esquema antiguo)
                const [rows] = await db.query("SELECT * FROM sections WHERE section_name = 'Footer' LIMIT 1");
                if (rows.length > 0) return rows[0];
            }
            return {};
        } catch (error) {
            console.error('Error in getFooterConfig:', error);
            return {};
        }
    },

    getFooterLinks: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM footer_links WHERE is_active = 1 ORDER BY category, order_index');
            const grouped = {};
            rows.forEach(link => {
                if (!grouped[link.category]) grouped[link.category] = [];
                grouped[link.category].push(link);
            });
            return grouped;
        } catch (error) {
            console.error('Error in getFooterLinks:', error);
            return {};
        }
    }
};

module.exports = FooterModel;
