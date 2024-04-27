// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // get the metadata field
    metadata = data.metadata

    // Filter the metadata for the object with the desired sample number
    results = metadata.filter(x => x.id == sample)[0]
    // console.log(results)
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    panel.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (k in results) {
      panel.append("h6").text(`${k}: ${results[k]}`)
    }

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
    let samples = data.samples
    console.log(samples)
    // Filter the samples for the object with the desired sample number
    results = samples.filter(x => x.id == sample)[0]
    console.log(results)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = results.otu_ids
    let otu_labels = results.otu_labels
    let sample_values = results.sample_values

    // Build a Bubble Chart
    let trace2 = {

    }
    let data2 = [trace2];
    let layout2 = {
      title: "Bubble Chart"
    }


    // Render the Bubble Chart
    Plotly.newPlot("bubble", data2, layout2);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // let sliced = results.slice(0,10)
    // bar_data = sliced.reverse()
 
    let trace1 = {
      x: otu_labels.map(otu_labels => otu_labels.count),
      y: otu_ids.map(row => row),
      type: "bar",
      orientation :"h",
      yticks: otu_ids.map(x => `OTU: ${otu_ids}`)
  };
  
  // Data trace array
  let data1 = [trace1];
  
  // Apply a title to the layout
  let layout1 = {
    title: "Bar Chart",
  };
  

    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart
    Plotly.newPlot("bar", data1, layout1);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the names field
    let names = data.names
    // console.log(names)
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      dropdown.append("option").text(names[i]).property("value", names[i])
      
    }

    // Get the first sample from the list


    // Build charts and metadata panel with the first sample
    buildMetadata(names[0])
    buildCharts(names[0])
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();
