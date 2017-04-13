/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).*/

$(function() {
    // Graph margin settings
    var margin = {
        top: 10,
        right: 10,
        bottom: 150,
        left: 60
    };

    // SVG width and height
    var width = 960;
    var height = 500;

    // Graph width and height - accounting for margins
    var drawWidth = width - margin.left - margin.right;
    var drawHeight = height - margin.top - margin.bottom;

    /************************************** Create chart wrappers ***************************************/
    // Create a variable `svg` by selecting the element with id `vis` and appending an svg
    // Set the width and height to your `width` and `height` variables
    let svg = d3.select('#vis')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Append a `g` element to your svg in which you'll draw your bars. Store the element in a variable called `g`, and
    // Transform the g using `margin.left` and `margin.top`
    let g = svg.append('g')
        .attr('width', drawWidth)
        .attr('height', drawHeight)
        .attr('transform', `translate(${margin.left}, ${margin.right})`);


    // Load data in using d3's csv function.
    d3.csv('data/prepped_data.csv', function(error, data) {

        console.log(`Draw height: ${drawHeight}`);
        console.log(`Draw width: ${drawWidth}`);

        /************************************** Defining scales ***************************************/
        // Find the maximum GDP value for the maximum of the x Scale, and multiply it by 1.05 (to add space)
        let gdp_max = d3.max(data, data => +data.gdp) * 1.05;
        console.log(`GDP max: ${gdp_max}`);

        // Find the minimum GDP value for the minimum of the x Scale, and multiply it by .85 (to add space)
        let gdp_min = d3.min(data, data => +data.gdp) * 0.85;
        console.log(`GDP min: ${gdp_min}`);

        // Use `d3.scaleLog` to define a variable `xScale` with the appropriate domain and range
        let xScale = d3.scaleLog()
            .domain([gdp_min, gdp_max])
            .range([0, drawWidth]);

        console.log(`Min of x-scale: ${xScale(gdp_min)}`);
        console.log(`Max of x-scale: ${xScale(gdp_max)}`);

        // Find the maximum life expectance value for the maximum of the y Scale, and multiply it by 1.05 (to add space)
        let life_max = d3.max(data, data => +data.life_expectancy) * 1.05;

        // Find the minimum life expectance value for the minimum of the y Scale, and multiply it by .9 (to add space)
        let life_min = d3.max(data, data => +data.life_expectancy) * 0.9;


        // Use `d3.scaleLinear` to define a variable `yScale` with the appropriate domain and range
        let yScale = d3.scaleLinear()
            .domain([life_min, life_max])
            .range([drawHeight, 0]);

        /************************************** Defining axes ***************************************/

        // Define x axis using d3.axisBottom, assigning the scale as the xScale
        let xAxis = d3.axisBottom(xScale);

        // Define y axis using d3.axisLeft(), assigning the scale as the yScale
        let yAxis = d3.axisLeft(yScale);

        /************************************** Rendering axes and labels ***************************************/

        // Append a g to your SVG as an x axis label, specifying the 'transform' attribute to position it
        // Make sure to use the `.call` method to render the axis in the label

        let xAxisLabel = svg.append('g')
            .attr('transform', `translate(${margin.left},${drawHeight + margin.top})`)
            .attr('class', 'xaxis')
            .call(xAxis);

        // Append a g to your SVG as a y axis label, specifying the 'transform' attribute to position it
        // Make sure to use the `.call` method to render the axis in the label
        let yAxisLabel = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('class', 'yaxis')
            .attr(yAxis);


        // Append a text element to your svg to label your x axis, and place it in the proper location


        // Append a text element to your svg to label your y axis, and place it in the proper location


        /************************************** Data Join ***************************************/

        // Select all circles and bind data


        // Use the .enter() method to get your entering elements, and assign their positions
        // Assign a 'title' property equal to the 'country' property (for hovers)


        // Use the .exit() and .remove() methods to remove elements that are no longer in the data


        /* For easy hovers, let's use jQuery to select all circles and apply a tooltip
        If you want to use bootstrap, here's a hint:
        http://stackoverflow.com/questions/14697232/how-do-i-show-a-bootstrap-tooltip-with-an-svg-object
        */

    });
});