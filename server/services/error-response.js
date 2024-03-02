class ErrorResponse {

  /**
   *
   * @param {*} httpCode String http status code
   * @param {*} message Message you want the user to see
   * @param {*} data you can only return an actual data object or null; intended to help the UI handle requests
   */

  constructor(httpCode, message, data, isError) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.isError = isError
  }

  /**
   * Description: toObject function, part of the ErrorResponse class
   * @returns new object literal with all the ErrorResponse fields (httpCode, message, data, timestamp)
   */
  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString(),
      "isError": this.isError || false
    }
  }
}

module.exports = ErrorResponse;
