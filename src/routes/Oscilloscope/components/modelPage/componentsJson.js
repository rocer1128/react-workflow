const config = {
  projectId: 100,
  componentsJson: {
    "id": "001",
    "objects": [
      {
        "tag": "SvgImg",
        "id": "001",
        "styles": {
          "width": 788,
          "height": 431,
          "x": -6,
          "y": 52,
          "stroke": "",
          "strokeWidth": 3,
          "strokeDasharray": "",
          "strokeDashoffset": 0,
          "cursor": "pointer",
          "rotateAnimateDur": 0,
          "rotatestroke": "#A4D3EE",
          "rotatestrokeWidth": 3,
          "rotatestrokeDasharray": "10,6",
          "rotatestrokeDashoffset": 0,
          "imgIsRotate": false,
          "imgIsRotateDur": 0,
          "flashDur": 0,
          "image": "http://192.168.4.86:3000/uploads/resource/url/24/1_img_20170518_153340.png",
          "condition": "default"
        },
        "conditions": [
          {
            "name": "default",
            "url": "http://192.168.4.86:3000/uploads/resource/url/24/1_img_20170518_153340.png"
          }
        ]
      },
      {
        "styles": {
          "fontSize": 15,
          "fontFamily": "",
          "width": 34,
          "height": 35,
          "text": "",
          "x": 232,
          "y": 389,
          "fill": "#cc0000",
          "image": "",
          "textColor": "#FFFFFF",
          "stroke": "#A4D3EE",
          "strokeWidth": 3,
          "strokeDasharray": "",
          "strokeDashoffset": 0,
          "flash": false,
          "rotateAnimate": false,
          "cursor": "pointer",
          "filter": true,
          "condition": "default"
        },
        "conditions": [
          {
            "name": "flash",
            "flash": true,
            "flashDur": 500
          },
          {
            "name": "rotate",
            "rotateAnimate": true,
            "rotateAnimateDur": 15,
            "rotatestroke": "#A4D3EE"
          },
          {
            "name": "default",
            "fill": "#FF0000"
          },
          {
            "name": "channelOne",
            "fill": "#008B00",
            "text": "1"
          },
          {
            "name": "channelTwo",
            "fill": "#1C86EE",
            "text": "2"
          }
        ],
        "tag": "SvgCircle",
        "id": "002",
        "events": {
          "onClick": "this.bindDataNode(1049)"
        },
        "binds": {
          "condition": [
            "this.data(1049)===0?'channelOne':'';",
            "this.data(1049)===1?'channelTwo':'';",
            "this.isSelected()?'rotate':''"
          ]
        }
      },
      {
        "styles": {
          "text": "",
          "fontSize": 15,
          "fontFamily": "",
          "width": 36,
          "height": 35,
          "x": 255,
          "y": 390,
          "fill": "#cc0000",
          "image": "",
          "textColor": "#FFFFFF",
          "stroke": "#A4D3EE",
          "strokeWidth": 3,
          "strokeDasharray": "",
          "strokeDashoffset": 0,
          "flash": false,
          "rotateAnimate": false,
          "cursor": "pointer",
          "filter": true,
          "condition": "default"
        },
        "conditions": [
          {
            "name": "flash",
            "flash": true,
            "flashDur": 500
          },
          {
            "name": "rotate",
            "rotateAnimate": true,
            "rotateAnimateDur": 15,
            "rotatestroke": "#A4D3EE"
          },
          {
            "name": "default",
            "fill": "#FF0000"
          },
          {
            "name": "channelOne",
            "fill": "#008B00",
            "text": "1"
          },
          {
            "name": "channelTwo",
            "fill": "#1C86EE",
            "text": "2"
          }
        ],
        "tag": "SvgCircle",
        "id": "003",
        "events": {
          "onClick": "this.bindDataNode(1050)"
        },
        "binds": {
          "condition": [
            "this.data(1050)===0?'channelOne':'';",
            "this.data(1050)===1?'channelTwo':'';",
            "this.isSelected()?'rotate':''"
          ]
        }
      },
      {
        "styles": {
          "text": "",
          "fontSize": 15,
          "fontFamily": "",
          "width": 36,
          "height": 35,
          "x": 281,
          "y": 390,
          "fill": "#cc0000",
          "image": "",
          "textColor": "#FFFFFF",
          "stroke": "#A4D3EE",
          "strokeWidth": 3,
          "strokeDasharray": "",
          "strokeDashoffset": 0,
          "flash": false,
          "rotateAnimate": false,
          "cursor": "pointer",
          "filter": true,
          "condition": "default"
        },
        "conditions": [
          {
            "name": "flash",
            "flash": true,
            "flashDur": 500
          },
          {
            "name": "rotate",
            "rotateAnimate": true,
            "rotateAnimateDur": 15,
            "rotatestroke": "#A4D3EE"
          },
          {
            "name": "default",
            "fill": "#FF0000"
          },
          {
            "name": "channelOne",
            "fill": "#008B00",
            "text": "1"
          },
          {
            "name": "channelTwo",
            "fill": "#1C86EE",
            "text": "2"
          }
        ],
        "tag": "SvgCircle",
        "id": "004",
        "events": {
          "onClick": "this.bindDataNode(1051)"
        },
        "binds": {
          "condition": [
            "this.data(1051)===0?'channelOne':'';",
            "this.data(1051)===1?'channelTwo':'';",
            "this.isSelected()?'rotate':''"
          ]
        }
      },
      {
        "styles": {
          "height": 39,
          "width": 80,
          "x": 305,
          "y": 25,
          "defaultFill": "#999999",
          "condition": "default"
        },
        "tag": "SvgChannelMenu",
        "id": "017",
        "conditions": [
          {
            "name": "default",
            "show": false
          },
          {
            "name": "show",
            "show": true
          },
          {
            "name": "menu1",
            "text": "绑定通道1",
            "fill": "#228B22",
            "textColor": "#FFFFFF",
            "stroke": "#A4D3EE",
            "fontSize": 15,
            "fontFamily": "Verdana",
            "strokeWidth": 1,
            "channel": 0,
            "isBind": true
          },
          {
            "name": "menu2",
            "text": "解绑通道1",
            "fill": "#228B22",
            "textColor": "#FFFFFF",
            "stroke": "#A4D3EE",
            "fontSize": 15,
            "fontFamily": "Verdana",
            "strokeWidth": 1,
            "channel": 0,
            "isBind": false
          },
          {
            "name": "menu3",
            "text": "绑定通道2",
            "fill": "#00E5EE",
            "textColor": "#FFFFFF",
            "stroke": "#A4D3EE",
            "fontSize": 15,
            "fontFamily": "Verdana",
            "strokeWidth": 1,
            "channel": 1,
            "isBind": true
          },
          {
            "name": "menu4",
            "text": "解绑通道2",
            "fill": "#00E5EE",
            "textColor": "#FFFFFF",
            "stroke": "#A4D3EE",
            "fontSize": 15,
            "fontFamily": "Verdana",
            "strokeWidth": 1,
            "channel": 1,
            "isBind": false
          }
        ],
        "menus": [
          {
            "condition": "menu1"
          },
          {
            "condition": "menu2"
          },
          {
            "condition": "menu3"
          },
          {
            "condition": "menu4"
          }
        ],
        "binds": {
          "condition": [
            "this.isBindedDN()?'show':''"
          ]
        }
      }
    ],
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
