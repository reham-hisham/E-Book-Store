class response {
  static success = function (data, res) {
    res.status(200).send({
      apiStatus: true,
      data: data,
      message: "success",
    });
  };
  static fail = function (e, res) {
    res.status(500).send({
      apiStatus: false,
      data: e.message,
      message: "error ",
    });
  };
}
module.exports = response;
