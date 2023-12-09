// Use D3 to read in data from the samples endpoint
const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(samples).then(function(data) {
    console.log(data);
    const sample_id = "940"
    const sample = data.samples.filter(element => element.id == sample_id) [0]
    console.log(sample);
});

