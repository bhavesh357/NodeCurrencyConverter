const { 
    createLogger,
    transports,
    format 
} =require('winston');

module.exports = logger = createLogger({
    transports:[
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())    
        })
        ]
})