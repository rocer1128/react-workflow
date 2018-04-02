import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { wildfoxConfig } from "../../config/web.config";
import { START, CONNECTED, END, INIT_DATA_SUCCESS, GET_PROJECT_DSMAP_SUCCESS, connecting, connected, mergeData, initData, getDsMap, mergeAlertData, setAlertMesage } from "../routes/RuntimerPage/modules/runtimer";

const SOCKJS_URL = wildfoxConfig.SockJsURL;

const newConnection = () => {
  const conn = Stomp.over(new SockJS(SOCKJS_URL));
  conn.heartbeat.outgoing = 0;
  conn.heartbeat.incoming = 0;
  // conn.debug = () => null;
  return conn;
};

export default function mqMiddleware() {
  let stomp = null;
  return ({ dispatch, getState }) => next => (action) => {
    switch (action.type) {
      case START:
        dispatch(connecting(action.projectId));
        dispatch(getDsMap(action.projectId));
        stomp = newConnection();
        stomp.connect({
          login: wildfoxConfig.username,
          passcode: wildfoxConfig.password,
        }, () => {
          dispatch(connected());
        });
        break;
      case CONNECTED:
        next(action);
        dispatch(initData(getState().test.projectId));
        break;
      case INIT_DATA_SUCCESS:
      case GET_PROJECT_DSMAP_SUCCESS:
        next(action);
        const { dsMap, data, isConnected, projectId, alertData } = getState().test;

        if (isConnected === true && dsMap && data) {
          stomp.subscribe(`/topic/${projectId}.data`, ({ body }) => {
            dispatch(mergeData(Object.assign(data, JSON.parse(body))));
          });

          stomp.subscribe(`/topic/${projectId}.alert`, ({ body }) => {
            if (body) {
              console.log("--------alertMessage", body);
              const newAlertMessage = JSON.parse(body);
              dispatch(setAlertMesage(newAlertMessage));

              if (("data_node_id" in newAlertMessage) && ("level" in newAlertMessage)) {
                const newAlertMes = {
                  [newAlertMessage.data_node_id]: newAlertMessage.level,
                };

                dispatch(mergeAlertData(Object.assign(alertData, newAlertMes)));
              }
            }
          });
        }
        break;
      case END:
        if (stomp) {
          stomp.disconnect();
        }
        next(action);
        break;
      default:
        return next(action);
    }
  };
}
