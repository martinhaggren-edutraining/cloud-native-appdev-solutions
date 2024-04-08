const env = require('env-var');

const port = env.get('PORT').default('80').asPortNumber()
const ddbTable = env.get('CONTENT_NAME_DDB_TABLE_NAME').asString()

module.exports = {
    port,
    ddbTable
};