import React, { Component, PropTypes } from "react";

export default class SvgInstrumentPanel extends Component {
  static panels = ["IDPanel", "SizePanel", "ArrangePanel", "BindPanel"];

  static defaultProps = {
    currentVal: 0,
    max: 100,
    min: 0,
    refHandler: {},
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentVal: PropTypes.number.isRequired,
    max: PropTypes.number,
    min: PropTypes.number,
    refHandler: PropTypes.object,
  };

  render() {
    const { x, y, width, height, max, min, currentVal, refHandler } = this.props;
    const cosVal = Math.cos(((currentVal.toFixed(1) - min) * (280 / (max - min)) + 130) * Math.PI / 180);
    const sinVal = Math.sin(((currentVal.toFixed(1) - min) * (280 / (max - min)) + 130) * Math.PI / 180);
    const valTransform = `matrix(${cosVal.toFixed(6)},${sinVal.toFixed(6)},${(-1 * sinVal).toFixed(6)},${cosVal.toFixed(6)},0,0)`;

    return (
      <svg
        x={x}
        y={y}
        height={height}
        width={width}
        viewBox={"0 0 300 300"}
        {...refHandler}
        id="raphael-paper-886"
        style={{ overflow: "hidden", userSelect: "none", cursor: " default", position: "relative", backgroundColor: " rgb(255, 255, 255)" }}
      >
        <defs>
          <radialGradient id="886-xr___50__0.5_0.5__rgba_161_160_255_1__70-rgba_106_111_166_1__100-rgba_161_160_255_1__100" r="50%" cx="0.5" cy="0.5" fx="0.5" fy="0.5">
            <stop offset="70%" stopColor="#a1a0ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#6a6fa6" stopOpacity="1" />
            <stop offset="100%" stopColor="#a1a0ff" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="886-270-rgba_106_111_166_1_-rgba_161_160_255_1_" x1="1.8369701987210297e-16" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a6fa6" stopOpacity="1" />
            <stop offset="100%" stopColor="#a1a0ff" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="886-xr____0.5_0.5_objectBoundingBox_rgba_0_0_0_1__80-rgba_44_107_178_1__95-rgba_19_95_171_1__100" gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" fx="0.5" fy="0.5">
            <stop offset="80%" stopColor="#000000" stopOpacity="1" />
            <stop offset="95%" stopColor="#2c6bb2" stopOpacity="1" />
            <stop offset="100%" stopColor="#135fab" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="886-xr____0.5_0.5_objectBoundingBox_rgba_255_255_255_1__20-rgba_212_212_212_1__100" gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" fx="0.5" fy="0.5">
            <stop offset="20%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4d4d4" stopOpacity="1" />
          </radialGradient>
        </defs>
        <g className="raphael-group-887-background">
          <rect x="0" y="0" width="300" height="300" stroke="none" fillOpacity="0.5" fill="#ffffff" rx="0" ry="0" style={{ stroke: "none", fillOpacity: 0.5, fill: "rgb(255, 255, 255)" }} />
          <rect
            x="0"
            y="0"
            width="300"
            height="300"
            stroke="#767575"
            strokeOpacity="0.5"
            strokeWidth="0"
            fill="none"
            rx="0"
            ry="0"
            style={{ stroke: " rgb(118, 117, 117)", strokeOpacity: 0.5, fill: "none" }}
          />
        </g>
        <g className="raphael-group-975-annotations" x="0" y="0" transform="matrix(1,0,0,1,151.8072,151.8072)">
          <circle
            cx="0"
            cy="0"
            r="144.57831325301206"
            fill="url('#886-xr____0.5_0.5_objectBoundingBox_rgba_0_0_0_1__80-rgba_44_107_178_1__95-rgba_19_95_171_1__100')"
            stroke="#2c6bb2"
            strokeOpacity="1"
            strokeLinecap="round"
            strokeWidth="1.4457831325301205"
            opacity="1"
            fillOpacity="1"
            style={{ stroke: "rgb(44, 107, 178)", strokeOpacity: 1, strokeLinecap: " round", opacity: 1, fillOpacity: 1 }}
          />
          <circle
            cx="0"
            cy="0"
            r="130.12048192771084"
            fill="url('#886-xr____0.5_0.5_objectBoundingBox_rgba_255_255_255_1__20-rgba_212_212_212_1__100')"
            stroke="#2c6bb2"
            strokeOpacity="1"
            strokeLinecap="round"
            strokeWidth="1.4457831325301205"
            opacity="1"
            fillOpacity="1"
            style={{ stroke: "rgb(44, 107, 178)", strokeOpacity: 1, strokeLinecap: " round", opacity: 1, fillOpacity: 1 }}
          />
          <path
            d="M-65.06024096385548,112.68764290207152A130.12048192771084,130.12048192771084,0,1,1,65.06024096385543,112.68764290207153L61.44578313253013,106.42721829640088A122.89156626506023,122.89156626506023,0,1,0,-61.445783132530174,106.42721829640087Z"
            fill="#51884f"
            stroke="#51884f"
            strokeOpacity="1"
            strokeLinecap="round"
            strokeWidth="1.4457831325301205"
            fillOpacity="0.5"
            style={{ fill: "rgb(81, 136, 79)", stroke: "rgb(81, 136, 79)", strokeOpacity: 1, strokeLinecap: " round", fillOpacity: 0.5 }}
          />
        </g>
        <g className="raphael-group-888-dataset" transform="matrix(1,0,0,1,5,5)">
          <path
            d="M77.10736762435114,229.8722890129012A108.43373493975903,108.43373493975903,0,1,1,216.5882433949567,229.8041257927536L209.6101419470273,221.50443610504453A97.59036144578313,97.59036144578313,0,1,0,84.0773537534823,221.56578300317736Z"
            fill="#a1a0ff"
            stroke="#8080cc"
            fillOpacity="1"
            strokeWidth="0"
            strokeOpacity="1"
            style={{ fill: "rgb(161, 160, 255)", stroke: " rgb(128, 128, 204)", fillOpacity: 1, strokeOpacity: 1 }}
          />
          <path
            d="M216.5882433949567,229.8041257927536A108.43373493975903,108.43373493975903,0,0,1,216.50709020697417,229.8722890129012L209.537104077843,221.56578300317736A97.59036144578313,97.59036144578313,0,0,0,209.6101419470273,221.50443610504453Z"
            fill="#a1a0ff"
            stroke="#8080cc"
            fillOpacity="1"
            strokeWidth="0"
            strokeOpacity="1"
            style={{ fill: "rgb(161, 160, 255)", stroke: " rgb(128, 128, 204)", fillOpacity: 1, strokeOpacity: 1 }}
          />
          <g className="raphael-group-897-tickmark">
            <path
              d="M77.10736762435114,229.8722890129012L81.28935930182983,224.8883854070669"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="85.82759471479744"
              y="210.8029137226534"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.506038722653386" x="85.82759471479744">
                {min}
              </tspan>
            </text>
            <path
              d="M46.26922058914353,187.42722097280972L52.30150108873468,184.9900214493809"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="58.84764251977248"
              y="175.54709698481918"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.500221984819177" x="58.84764251977248">
                {min + (max - min) / 10}
              </tspan>
            </text>
            <path
              d="M38.96750532151253,135.47281723603754L45.43788873716154,136.15288193681505"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="52.45945296229176"
              y="132.39261469875095"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.501989698750947" x="52.45945296229176">
                {min + (max - min) / 10 * 2}
              </tspan>
            </text>
            <path
              d="M56.91158851812801,86.17185384052142L62.3053269419801,89.8099763450299"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="68.15853197230847"
              y="91.4421389254709"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.5046389254709" x="68.15853197230847">
                {min + (max - min) / 10 * 3}
              </tspan>
            </text>
            <path
              d="M95.90067391478296,51.065923665899476L98.95506721483574,56.81040198088526"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="102.2696495737819"
              y="62.28237319064826"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.501123190648258" x="102.2696495737819">
                {min + (max - min) / 10 * 4}
              </tspan>
            </text>
            <path
              d="M146.80722891566265,38.373493975903614L146.80722891566265,44.87951807228916"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="146.80722891566265"
              y="50.93975903614458"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.50225903614458" x="140.80722891566265">
                {min + (max - min) / 10 * 5}
              </tspan>
            </text>
            <path
              d="M197.71378391654235,51.065923665899476L194.6593906164896,56.810401980885274"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="191.3448082575434"
              y="62.28237319064826"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.501123190648258" x="182.3448082575434">
                {min + (max - min) / 10 * 6}
              </tspan>
            </text>
            <path
              d="M236.70286931319725,86.1718538405214L231.30913088934517,89.80997634502987"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="225.45592585901682"
              y="91.44213892547087"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.504638925470871" x="212.45592585901682">
                {min + (max - min) / 10 * 7}
              </tspan>
            </text>
            <path
              d="M254.64695250981276,135.47281723603757L248.17656909416377,136.15288193681505"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="241.15500486903352"
              y="132.39261469875095"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.501989698750947" x="230.15500486903352">
                {min + (max - min) / 10 * 8}
              </tspan>
            </text>
            <path
              d="M247.34523724218175,187.42722097280975L241.3129567425906,184.99002144938092"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="234.76681531155282"
              y="175.5470969848192"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.500221984819206" x="220.76681531155282">
                {min + (max - min) / 10 * 9}
              </tspan>
            </text>
            <path
              d="M216.50709020697417,229.8722890129012L212.32509852949545,224.8883854070669"
              fill="none"
              stroke="#646f8f"
              strokeOpacity="1"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ fill: "none", stroke: "rgb(100, 111, 143)", strokeOpacity: 1, strokeLinecap: "round" }}
            />
            <text
              x="207.78686311652785"
              y="210.8029137226534"
              stroke="none"
              fill="#646f8f"
              textAnchor="start"
              style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "10px" }}
              fontFamily="Verdana,sans"
              fontSize="10px"
            >
              <tspan dy="10.506038722653386" x="190.78686311652785">
                {max}
              </tspan>
            </text>
          </g>
          <g className="raphael-group-899-pointers" transform="matrix(1,0,0,1,146.8072,146.8072)">
            <path
              d="M103.01204819277109,-1.4457831325301205L103.01204819277109,1.4457831325301205L0,1.8072289156626506L0,-1.8072289156626506Z"
              fill="url('#886-270-rgba_106_111_166_1_-rgba_161_160_255_1_')"
              stroke="#999999"
              opacity="1"
              fillOpacity="1"
              strokeOpacity="0"
              strokeWidth="1"
              transform={valTransform}
              style={{ stroke: "rgb(153, 153, 153)", opacity: 1, fillOpacity: 1, strokeOpacity: 0 }}
            />
          </g>
          <circle
            cx="146.80722891566265"
            cy="146.80722891566265"
            r="10.120481927710843"
            fill="url('#886-xr___50__0.5_0.5__rgba_161_160_255_1__70-rgba_106_111_166_1__100-rgba_161_160_255_1__100')"
            stroke="#bebcb0"
            opacity="1"
            fillOpacity="1"
            strokeWidth="1"
            strokeOpacity="0"
            style={{ stroke: "rgb(190, 188, 176)", opacity: 1, fillOpacity: 1, strokeOpacity: 0 }}
          />
        </g>
        <rect x="122.3" y="200.5030" rx="10" ry="10" width="62" height="40" style={{ fill: "transparent", stroke: "green", strokeWidth: 3, opacity: 0.3 }} />
        <text
          x="140.3"
          y="217.5030"
          stroke="none"
          fill="#646f8f"
          textAnchor="start"
          style={{ stroke: " none", fill: "rgb(100, 111, 143)", textAnchor: "start", fontFamily: "Verdana, sans", fontSize: "20px" }}
          fontFamily="Verdana,sans"
          fontSize="20px"
        >
          <tspan dy="10.500221984819206" x="130.3">
            {currentVal.toFixed(1)}
          </tspan>
        </text>
      </svg>
    );
  }
}
