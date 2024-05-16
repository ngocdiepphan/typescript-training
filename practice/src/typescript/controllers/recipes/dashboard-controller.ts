import DashBoardView from "../../views/recipes/dashboard-view";

export default class DashBoardController {
  private dashboardView: DashBoardView;

  constructor(dashboardView: DashBoardView) {
    this.dashboardView = dashboardView;
  }

  init = async () => {
    this.dashboardView.bindCallback("newToggle");
  };
}
