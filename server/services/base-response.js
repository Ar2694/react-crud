class BaseResponse {

  /**
   *
   * @param {*} httpCode String http status code
   * @param {*} message Message you want the user to see
   * @param {*} data you can only return an actual data object or null; intended to help the UI handle requests
   */

  constructor (httpCode, message, data, token) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.token = token;
  }

  /**
   * Description: toObject function, part of the BaseResponse class
   * @returns new object literal with all the BaseResponse fields (httpCode, message, data, timestamp)
   */

  toObject()
  {
    return {
      "httpCode": this.httpCode,
      "message": this.message,
      "data": this.data,
      "token": this.token || null,
      "timestamp": new Date().toLocaleDateString()
      
    }
  }
}

module.exports = BaseResponse;
