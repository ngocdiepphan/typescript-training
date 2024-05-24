import DashBoardView from "../../views/dashboards/toggle";

export default class DashBoardController {
  private dashboardView: DashBoardView;

  constructor(dashboardView: DashBoardView) {
    this.dashboardView = dashboardView;
  }

  init = async () => {
    this.dashboardView.bindCallback("newToggle", () => {});
    this.dashboardView.bindCallback("closeToggle", () => {});
    this.dashboardView.bindCallback("menuToggle", () => {});
  };
}
