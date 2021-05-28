const express = require("express");
const router = express.Router();
const axios = require("axios");

const API = "http://service.shmetro.com/i/sm?method=doGetAllLineStatus";

router.get("/", function (req, res, next) {
  axios.post(API)
    .then(function (response) {
      console.log(response.data)
      let data = response.data.map(function(item){
        let status;
        if (item.status == '') {
          status = '运行良好！'
        } else {
          status = '目前有故障哦！'
        }
        return {
          name: item.disLine,
          status: status
        }
      });
      let date = new Date().toISOString();
      res.render("index", {
        title: "Tencent CloudBase + Express",
        data: data,
        date: date
      });
    });
});

module.exports = router;
