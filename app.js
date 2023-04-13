console.log("Hello Back to School");
let viz;
//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard option
//3. Create a variable to store the URL - if it doesn't load might need to specify height and width

const containerDiv = document.getElementById("vizContainer"); //define a constant to store the content option to be referenced in js
const options = {
  device: "desktop", //recognized by the JavaScript API
  height: "900px",
  width: "1400px",
};

const url =
  "https://public.tableau.com/views/EmbeddingDashboard-B2S/EmbeddingDashboard?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";

const exportpdfbutton = document.getElementById("exportPDF"); //connect with the button defined in html
const exportpptbutton = document.getElementById("exportPPT");

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options); // this function is in the JS API - must be exactly the same name
}

initViz();
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction); //listen to the action done on the button and reference what function to perform when the action is done
exportpptbutton.addEventListener("click", exportPPTfunction);

document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function exportPDFfunction() {
  //define the function - what dialog to show
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[0];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Viz Filtered Successfully!🥳")); //apply filters after loading viz - refer API webpage
}
