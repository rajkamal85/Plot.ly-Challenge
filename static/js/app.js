function init() {
    var dropdown = d3.select('#selDataset')

    d3.json("data/samples.json").then((importedData) => {
        importedData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value")
        })

        buildPlot(importedData.names[0]);
        panel(importedData.names[0]);
    })
}


function optionChanged(testid) {
     buildPlot(testid);
     panel(testid);
}

function buildPlot(testid) {

    d3.json("data/samples.json").then((importedData) => {
        //console.log(importedData);
        // wfreq = filtereddata.metadata.map(d => d.wfrep)
        // console.log(wfreq)

        var filtereddata = importedData.samples.filter(d => d.id == testid)[0]

        //console.log(filtereddata)
        //console.log(filtereddata.otu_ids)

        //Bar Plot
        xvalues = filtereddata.sample_values.slice(0,10).reverse()
        yvalues = filtereddata.otu_ids.map(i => `OTU ${i}`).slice(0,10).reverse()
        text = filtereddata.otu_labels.slice(0,10)

        var trace = {
            x : xvalues,
            y : yvalues,
            text : text,
            name : "Top 10 OTUs",
            type : "bar",
            orientation : "h"
        }
        
        var layout = {
            title: "Top 10 OTUs for Subject",
            automargin : true
        };

        Plotly.newPlot("bar", [trace], layout);


        //Bubble Plot 
        var trace1 = {
            x : filtereddata.otu_ids,
            y : filtereddata.sample_values,
            text : filtereddata.otu_labels,
            mode : 'markers',
            marker : {
                size : filtereddata.sample_values,
                color : filtereddata.otu_ids,
            }
        }
        
        var layout1 = {
            xaxis:{title: "OTU ID"},
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', [trace1], layout1);
    })
    
}

function panel(testid) {
    d3.json("data/samples.json").then((importedData) => {
        metadata = importedData.metadata.filter(d => d.id == testid)[0]
        //console.log(metadata)

        var meta_info = d3.select("#sample-metadata")

        meta_info.html("")

        Object.entries(metadata).forEach((d) => {
            meta_info.append("h5").text(`${d[0]} : ${d[1]}`);
        });
    })
}

init();

