wx.ready(function () {
  document.querySelector('#checkJsApi').onclick = function () {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };
  document.querySelector('#scanQRCode0').onclick = function () {
    wx.scanQRCode({
      desc: 'scanQRCode desc'
    });
  };
  document.querySelector('#scanQRCode1').onclick = function () {
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };
  wx.error(function (res) {
    alert(res.errMsg);
  });
