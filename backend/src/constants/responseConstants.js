const _ = require("lodash");
const responseConstants = {
  unauthorized:()=> _.clone({
    status: false,
    message: "unauthorized",
  }),
  created: (data, message = "created") => {
    return _.clone({
      status: true,
      data,
      message,
    });
  },
  notFound: (message = "not found", data = null) => {
    return _.clone({
      status: false,
      message,
      data,
    });
  },
  hasError: ( message,data=null) => {
    return _.clone({
      message,
      data,
      status: false,
    });
  },
};

module.exports = { responseConstants };
