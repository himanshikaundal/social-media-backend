module.exports = {
    success: function (data, message = "OK", statusCode = 200) {
        return this.status(statusCode).json({
            data: data,
            message: message,
            error: null,
            statusCode: statusCode
        });
    },
    error: function (message, statusCode = 500) {
        return this.status(statusCode).json({
            data: null,
            message: message,
            error: message,
            statusCode: statusCode
        });
    }
};