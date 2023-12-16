// Use D3 to read in data from the samples endpoint
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samples).then(function(data) {
    console.log(data);
    const sample_id = "940"
    const sample = data.samples.filter(element => element.id == sample_id) [0]
    console.log(sample);
    fillDropdown(data);
    createChart(data.names[0]);
});

function fillDropdown(data) {
    console.log("Fill dropdown running");
    console.log(data);
    console.log(data.names);
    let sel = document.getElementById("selDataset");

    data.names.forEach(name => {
        let opt = document.createElement("option");
        opt.innerText = name;
        opt.value = name;
        sel.appendChild(opt);
        
    });
};

function optionChanged(id) {
    createChart(id);
}

function createChart(id) {
    console.log("Creating Charts:");
    
    d3.json(samples).then(function(data) {
        
        const sample = data.samples.filter(element => element.id == id) [0]
        console.log(sample);
        
        let x = sample.otu_ids.map(s => "OTU " + s).slice(0, 10).reverse();
        console.log(x);

        let y = sample.sample_values.slice(0, 10).reverse();
        console.log(y);

        let trace1 = {
            x: y,
            y: x,
            type: 'bar',
            orientation: "h"
          };
          
          let data1 = [trace1];
          
          let layout = {
            title: "Top 10 OTUs"
          };
          
          Plotly.newPlot("bar", data1, layout);
    });
}