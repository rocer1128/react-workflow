export default function wechatMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      const { wechat, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!wechat) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({
        ...rest,
        type: REQUEST
      });

      const actionPromise = wechat(client);
      actionPromise.then(
        (result) => {
          next({
            ...rest,
            result,
            type: SUCCESS
          })
        },
        (error) => next({
          ...rest,
          error,
          type: FAILURE
        })
      ).catch((error) => {
        console.error("MIDDLEWARE ERROR:", error);
        next({
          ...rest,
          error,
          type: FAILURE
        });
      });

      return actionPromise;
    };
  };
}