const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Bojuto API",
            description: "Bojuto API Information",
            contact: {
                name: "Bojuto Dev Team"
            }
        },
        servers: [
            {
                url: "http://localhost:5000"
            },
            {
                url: "https://bojuto.lm.r.appspot.com/"
            } 
        ]
    },
    apis: ["routes/*js"]
}

module.exports = swaggerOptions;