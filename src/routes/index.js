// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout";
import Home from "./Home";
import CounterRoute from "./Counter";
import ResourceRoute from "./Resource";
import WidgetRoute from "./Widget";
import DataRoute from "./DataSource";
import ProjectRoute from "./Project";
import Workbench from "./Workbench";
import RuntimerPage from "./RuntimerPage";
import ProjectMonitor from "./ProjectMonitor";
import RealTimePage from "./RealTimePage";
import DataLinkRoute from "./DataLink";
import EquipmentPage from "./EquipmentPage";
import Oscilloscope from "./Oscilloscope";
import Gis from "./Gis";
import Calender from "./Calender";
import StoredProgramControl from "./StoredProgramControl";
import Repair from "./Repair";
import RepairDevice from "./RepairDevice";
import RepairList from "./RepairList";
import RepairForm from "./RepairForm";
import RepairLib from "./RepairLib";
import DeviceInfo from "./DeviceInfo";
import MachineRepair from "./MachineRepair";
import ModuleList from "./ModuleList";
import ModuleRepair from "./ModuleRepair";
import ServiceLib from "./ServiceLib";
import RepairAllocate from "./RepairAllocate";
import Message from "./Message";
import Stoppage from "./Stoppage";
import ConfirmDeviceInfo from "./ConfirmDeviceInfo";

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: "/",
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    CounterRoute(store),
    ResourceRoute(store),
    WidgetRoute(store),
    ProjectRoute(store),
    RealTimePage(store),
    DataRoute(store),
    Workbench(store),
    DataLinkRoute(store),
    ProjectMonitor(store),
    RuntimerPage(store),
    EquipmentPage(store),
    Oscilloscope(store),
    Gis(store),
    Calender(store),
    StoredProgramControl(store),
    Repair(store),
    RepairDevice(store),
    RepairList(store),
    RepairForm(store),
    RepairLib(store),
    DeviceInfo(store),
    ServiceLib(store),
    MachineRepair(store),
    ModuleRepair(store),
    ModuleList(store),
    RepairAllocate(store),
    Message(store),
    Stoppage(store),
    ConfirmDeviceInfo(store),
  ],
  onEnter: (nextState, replace) => {
    const { auth } = store.getState();
    if (!auth || !auth.user) {
      // oops, not logged in, so can't be here!
      if (
        nextState.location.pathname !== "/" &&
        // nextState.location.pathname !== "/deviceinfo" &&
        nextState.location.pathname !== "/projectMonitor" &&
        nextState.location.pathname !== "/storedprogramcontrol"
        // nextState.location.pathname !== "/message" &&
        // nextState.location.pathname !== "/stoppage" &&
        // nextState.location.pathname !== "/machinerapire" &&
        // nextState.location.pathname !== "/modulelist" &&
        // nextState.location.pathname !== "/repairdevice" &&
        // nextState.location.pathname !== "/repairallocate" &&
        // nextState.location.pathname !== "/repairlist" &&
        // nextState.location.pathname !== "/modulerapire" &&
        // nextState.location.pathname !== "/confirmdeviceinfo" &&
        // nextState.location.pathname !== "/rapireform"
      ) {
        replace("/");
      }
    }
  },
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
