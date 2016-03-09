var DashBoardEnvironment = {};
DashBoardEnvironment.baseUrl="http://localhost:7070/DashBoardService/"
DashBoardEnvironment.getUrl=function(url) {
	return this.baseUrl+url;
}
window.env = DashBoardEnvironment;	
