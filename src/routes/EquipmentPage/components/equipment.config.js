const config = {
  projectId: 6,
  componentsJSon: {
    "id": "001",
    "objects": [{
      "tag": "BackgroundImage",
      "id": "001",
      "styles": {
        "width": 600,
        "height": 400,
        "x": -4,
        "y": 27,
        "url": "http://192.168.4.86:3000/uploads/resource/url/1/9_img_20170421_091625.jpeg",
        "condition": "default"
      },
      "conditions": [{
        "name": "default",
        "url": "http://192.168.4.86:3000/uploads/resource/url/1/9_img_20170421_091625.jpeg"
      }]
    }, {
      "styles": {
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "14",
        "strokeDasharray": "",
        "x": 95,
        "y": 222,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "002",
      "events": {
        "onClick": "this.bindDataNode(90)"
      },
      "binds": {
        "condition": [
          "this.data(91)===1?'open':'default'",
          "this.isSelected()?'rotate':''",
          "this.alert(91)>0?'flash':''"
        ]
      }
    }, {
      "styles": {
        "x": 126,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "10",
        "strokeDasharray": "",
        "y": 222,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "003",
      "events": {
        "onClick": "this.bindDataNode(92)"
      },
      "binds": {
        "condition": [
          "this.data(93)===1?'open':'default'",
          "this.isSelected()?'rotate':''",
          "this.alert(93)>0?'flash':''"
        ]
      }
    }, {
      "styles": {
        "y": 271,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "16",
        "strokeDasharray": "",
        "x": 126,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "004",
      "events": {
        "onClick": "this.bindDataNode(94)"
      },
      "binds": {
        "condition": [
          "this.data(95)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "y": 222,
        "fontSize": "15",
        "width": 31,
        "height": 33,
        "text": "34",
        "strokeDasharray": "",
        "x": 193,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "005",
      "events": {
        "onClick": "this.bindDataNode(96)"
      },
      "binds": {
        "condition": [
          "this.data(97)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "x": 227,
        "y": 222,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "30",
        "strokeDasharray": "",
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "006",
      "events": {
        "onClick": "this.bindDataNode(98)"
      },
      "binds": {
        "condition": [
          "this.data(99)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "36",
        "strokeDasharray": "",
        "x": 227,
        "y": 271,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "007",
      "events": {
        "onClick": "this.bindDataNode(100)"
      },
      "binds": {
        "condition": [
          "this.data(101)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "813",
        "strokeDasharray": "",
        "x": 171,
        "y": 299,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "008",
      "events": {
        "onClick": "this.bindDataNode(102)"
      },
      "binds": {
        "condition": [
          "this.data(103)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "y": 222,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "24",
        "strokeDasharray": "",
        "x": 295,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "009",
      "events": {
        "onClick": "this.bindDataNode(104)"
      },
      "binds": {
        "condition": [
          "this.data(105)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "x": 327,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "20",
        "strokeDasharray": "",
        "y": 222,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "010",
      "events": {
        "onClick": "this.bindDataNode(106)"
      },
      "binds": {
        "condition": [
          "this.data(107)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "y": 271,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "26",
        "strokeDasharray": "",
        "x": 327,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "011",
      "events": {
        "onClick": "this.bindDataNode(108)"
      },
      "binds": {
        "condition": [
          "this.data(109)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "44",
        "strokeDasharray": "",
        "x": 394,
        "y": 222,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "012",
      "events": {
        "onClick": "this.bindDataNode(110)"
      },
      "binds": {
        "condition": [
          "this.data(111)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "y": 222,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "40",
        "strokeDasharray": "",
        "x": 428,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "013",
      "events": {
        "onClick": "this.bindDataNode(112)"
      },
      "binds": {
        "condition": [
          "this.data(113)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "x": 428,
        "y": 271,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "46",
        "strokeDasharray": "",
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "014",
      "events": {
        "onClick": "this.bindDataNode(114)"
      },
      "binds": {
        "condition": [
          "this.data(115)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "x": 377,
        "y": 299,
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "824",
        "strokeDasharray": "",
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "015",
      "events": {
        "onClick": "this.bindDataNode(116)"
      },
      "binds": {
        "condition": [
          "this.data(117)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "fontSize": "15",
        "width": 35,
        "height": 35,
        "text": "80",
        "strokeDasharray": "",
        "x": 501,
        "y": 234,
        "fill": "#cc0000",
        "image": "",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "strokeWidth": 3,
        "strokeDashoffset": "0",
        "cursor": "pointer",
        "filter": true,
        "condition": "default"
      },
      "conditions": [{
        "name": "flash",
        "flash": true,
        "flashDur": "500"
      }, {
        "name": "rotate",
        "rotateAnimate": true,
        "rotateAnimateDur": 15,
        "rotatestroke": "#A4D3EE"
      }, {
        "name": "default",
        "fill": "#FF0000"
      }, {
        "name": "open",
        "fill": "#008B00"
      }],
      "tag": "SvgCircle",
      "id": "016",
      "events": {
        "onClick": "this.bindDataNode(118)"
      },
      "binds": {
        "condition": [
          "this.data(119)===1?'open':'default'",
          "this.isSelected()?'rotate':''"
        ]
      }
    }, {
      "styles": {
        "height": 39,
        "width": 40,
        "x": 456,
        "y": 48,
        "condition": "default"
      },
      "tag": "SvgSwitch",
      "id": "017",
      "conditions": [{
        "name": "default",
        "url": "http://192.168.4.86:3000/uploads/resource/url/1/9_img_20170420_112155.png",
        "show": false
      }, {
        "name": "show",
        "show": true
      }, {
        "name": "menu1",
        "text": "打开",
        "fill": "#228B22",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "fontSize": 15,
        "fontFamily": "Verdana",
        "strokeWidth": 1
      }, {
        "name": "menu2",
        "text": "关闭",
        "fill": "#EE4000",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "fontSize": 15,
        "fontFamily": "Verdana",
        "strokeWidth": 1
      }, {
        "name": "menu3",
        "text": "取消",
        "fill": "#EEB422",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "fontSize": 15,
        "fontFamily": "Verdana",
        "strokeWidth": 1
      }, {
        "name": "menu4",
        "text": "恢复",
        "fill": "#00E5EE",
        "textColor": "#FFFFFF",
        "stroke": "#A4D3EE",
        "fontSize": 15,
        "fontFamily": "Verdana",
        "strokeWidth": 1
      }],
      "menus": [{
        "condition": "menu1",
        "events": {
          "onClick": "this.yk(1).clearAll();"
        }
      }, {
        "condition": "menu2",
        "events": {
          "onClick": "this.yk(0).clearAll();"
        }
      }, {
        "condition": "menu3",
        "events": {
          "onClick": "this.clearAll();"
        }
      }, {
        "condition": "menu4",
        "events": {
          "onClick": "this.clearAlert(0).clearAll();"
        }
      }],
      "binds": {
        "condition": [
          "this.isBindedDN()?'show':''"
        ]
      }
    }],
    "styles": {
      "height": "500",
      "viewBox": "-4 27 600 400",
      "width": "500",
      "x": 0,
      "y": 0
    },
    "tag": "Cell"
  }
}
export default config;
