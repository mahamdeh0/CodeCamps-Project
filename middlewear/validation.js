const methods = ['body', 'params', 'headers', 'query'];

const validation = (schema) => {
    return (req, res, next) => {
        let validarray = []; // Moved inside the function to ensure it's reset for each request

        methods.forEach(key => {
            if (schema[key]) {
                const { error } = schema[key].validate(req[key], { abortEarly: false });
                if (error) {
                    error.details.forEach(detail => {
                        validarray.push({ message: detail.message, path: detail.path });
                    });
                }
            }
        });

        if (validarray.length > 0) {
            res.status(400).json({ message: 'Validation error', errors: validarray });
        } else {
            next();
        }
    }
};

module.exports = { validation };
