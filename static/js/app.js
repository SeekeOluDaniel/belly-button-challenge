// Use D3 to read in data from the samples endpoint
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samples).then(function (data) {
    console.log(data);
    const sample_id = "940"
    const sample = data.samples.filter(element => element.id == sample_id)[0]
    console.log(sample);
    fillDropdown(data);
    createChart(data.names[0]);

    createTable(data.names[0]);
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
    createTable(id);
}

function createChart(id) {
    console.log("Creating Charts:");

    d3.json(samples).then(function (data) {

        const sample = data.samples.filter(element => element.id == id)[0]
        console.log(sample);

        let x = sample.otu_ids.map(s => "OTU " + s).slice(0, 10).reverse();
        console.log(x);

        let y = sample.sample_values.slice(0, 10).reverse();
        console.log(y);

        let trace1 = {
            x: y,
            y: x,
            text: sample.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: "h"
        };

        let data1 = [trace1];

        let layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", data1, layout);

        let trace2 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels,
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,

            }
        };

        var data = [trace2];

        var bubblelayout = {
            title: 'Bubble Chart',
            showlegend: false,
        };

        Plotly.newPlot('bubble', data, bubblelayout);


    });
}

function createTable(id) {
    d3.json(samples).then(function (data) {

        const metadata = data.metadata.filter(element => element.id == id)
        let result = metadata[0]
        let panel = d3.select("#sample-metadata");
        panel.html("")
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })

        var wfreq = result.wfreq
        var gaugedata = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: wfreq,
                title: { text: "Belly Button Scrubs per Week", font: { size: 24 } },
                gauge: {
                    axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 2], color: "red" },
                        { range: [2, 4], color: "orange" },
                        { range: [4, 6], color: "cyan" },
                        { range: [6, 8], color: "royalblue" },
                        { range: [8, 10], color: "green" },
                        
                    ],
                    
                    
                }
            }
        ];

        var gaugelayout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };

        Plotly.newPlot('gauge', gaugedata, gaugelayout);

    });
}