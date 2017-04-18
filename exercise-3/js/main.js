/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).
		The letiable "data" is accessible to you, as you read it in from data.js
*/
$(function() {
    // Read in prepped_data file
    d3.csv('data/prepped_data.csv', function(error, allData) {
        // letiables that should be accesible within the namespace
        let xScale, yScale, currentData;

        // Track the sex (male, female) and drinking type (any, binge) in letiables
        let sex = 'female';
        let type = 'binge';

        // Margin: how much space to put in the SVG for axes/titles
        let margin = {
            left: 70,
            bottom: 100,
            top: 50,
            right: 50,
        };

        // Height/width of the drawing area for data symbols
        let height = 600 - margin.bottom - margin.top;
        let width = 1000 - margin.left - margin.right;


        // Append all non-data placeholder elements for you chart (svg, g, axis labels, axes), but do not call the axis functions that render them.
        let svg = d3.select('#vis')
            .append('svg')
            .attr('height', 600)
            .attr('width', 1000);

        let g = svg.append('g')
            .attr(`transform', 'translate(${margin.left}, ${margin.top})`)
            .attr('height', height)
            .attr('width', width);

        let xAxisLabel = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
            .attr('class', 'axis');

        let yAxisLabel = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);


        let xAxisText = svg.append('text')
            .attr('transform', `translate(${margin.left + width / 2}, ${margin.top + height + 40})`)
            .attr('class', 'title');

        let yAxisText = svg.append('text')
            .attr('transform', `translate(${margin.left - 40}, ${margin.top + height / 2}) rotate(-90)`)
            .attr('class', 'title');

        // Write a function for setting the scales based on the current data selection.
        let setScales = data => {
            let states = data.map(obj => obj.state);

            xScale = d3.scaleBand()
                .range([0, width])
                .domain([states]);

            let yMin = d3.min(data, obj => +obj.percent);
            let yMax = d3.max(data, obj => +obj.percent);

            yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, yMax]);

        };

        // Write a function for updating your axis elements (both the axes, and their labels).
        let setAxes = () => {
            let xAxis = d3.axisBottom()
                .scale(xScale);
            
            let yAxis = d3.axisLeft()
                .scale(yScale);

            xAxisLabel.transition().duration(1500).call(xAxis);
            yAxisLabel.transition().duration(1500).call(yAxis);

            xAxisText.text('State')
            yAxisText.text(`Percent Drinking (${sex}, ${type})`);
        };


        // Write a function to filter down your data to the current selection based on the current sex and type
        let filterData = () => {
            currentData = allData.filter(obj => obj.type == type && obj.sex == sex);
        };

        // Write a reusable function to perform your data-join. Within this function you should set your scales and update your axes.
        let draw = data => {
            setScales(data);
            setAxes();

        };

        // Assign an event handler to your input elements to set the sex and/or type, filter your data, then update your chart.
        $("input").on('change', function() {
            // Get value, determine if it is the sex or type controller
            let val = $(this).val();
            let isSex = $(this).hasClass('sex');
        

            // Filter data, update chart
            filterData();
            draw(currentData);
        });

    });
});