/**
 * Gross Domestic Product.
 */
var json_data = [{'values': [{'x': '2010', 'y': 0.5}, {'x': '2011', 'y': 0.6},
    {'x': '2012', 'y': 0.4}, {'x': '2013', 'y': 0.6}, {'x': '2014', 'y': 0.8},
    {'x': '2015', 'y': 0.3}, {'x': '2016', 'y': 0.4}], 'key': 'Quarter 1 (Jan to Mar)'},
    {'values': [{'x': '2010', 'y': 1.0}, {'x': '2011', 'y': 0.1}, {'x': '2012', 'y': -0.1},
        {'x': '2013', 'y': 0.5}, {'x': '2014', 'y': 0.9}, {'x': '2015', 'y': 0.5},
        {'x': '2016', 'y': 0.7}], 'key': 'Quarter 2 (Apr to June)'}, {'values': [{'x': '2010', 'y': 0.6},
        {'x': '2011', 'y': 0.4}, {'x': '2012', 'y': 1.1}, {'x': '2013', 'y': 0.8}, {'x': '2014', 'y': 0.8},
        {'x': '2015', 'y': 0.3}, {'x': '2016', 'y': 0.5}], 'key': 'Quarter 3 (July to Sept)'},
    {'values': [{'x': '2010', 'y': 0.1}, {'x': '2011', 'y': 0.2}, {'x': '2012', 'y': -0.2},
        {'x': '2013', 'y': 0.5}, {'x': '2014', 'y': 0.8}, {'x': '2015', 'y': 0.7}, {'x': '2016', 'y': 0.0}],
        'key': 'Quarter 4 (Oct to Dec)'}];

var chart;
nv.addGraph(function() {
    chart = nv.models.multiBarChart()
        .barColor(d3.scale.category20().range())
        .duration(300)
        .margin({bottom: 100, left: 70})
        .rotateLabels(45)
        .groupSpacing(0.1);

    chart.reduceXTicks(false).staggerLabels(true);

    chart.xAxis
        // .axisLabel("Years")
        .axisLabelDistance(35)
        .showMaxMin(false)
        .tickFormat(d3.format(''));

    chart.yAxis
        .axisLabel("Quarter-on-quarter percentage increase.")
        .axisLabelDistance(-5)
        .tickFormat(function (d){
            return d3.format("+.1%")(d/100);
        });

    chart.dispatch.on('renderEnd', function(){
        nv.log('Render Complete');
    });

    d3.select('#gdp1 svg')
        .attr("height", "500")
        .datum(json_data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    chart.dispatch.on('stateChange', function(e) {
        nv.log('New State:', JSON.stringify(e));
    });
    chart.state.dispatch.on('change', function(state){
        nv.log('state', JSON.stringify(state));
    });

    return chart;
});

var chart2;
var json_data2;

nv.addGraph(function() {
    chart2 = nv.models.lineChart()
        .options({
            duration: 200,
            useInteractiveGuideline: true
        });

    quarters = ['2008 Q1', '2008 Q2', '2008 Q3', '2008 Q4', '2009 Q1', '2009 Q2', '2009 Q3', '2009 Q4', '2010 Q1',
        '2010 Q2', '2010 Q3', '2010 Q4', '2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
        '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2', '2013 Q3', '2013 Q4', '2014 Q1', '2014 Q2', '2014 Q3',
        '2014 Q4', '2015 Q1', '2015 Q2', '2015 Q3', '2015 Q4', '2016 Q1', '2016 Q2', '2016 Q3', '2016 Q4'];
    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart2.xAxis
        // .axisLabel("")

        .tickValues([0, 4, 8, 12, 16, 20, 24, 28, 32])
        .tickFormat(function (d) {
            return quarters[d]
        })
        .staggerLabels(true);

    chart2.yAxis
        .axisLabel('Growth Index')
        .tickFormat(function(d) {
            if (d == null) {
                return 'N/A';
            }
            return d3.format(',.2f')(d);
        });

    json_data2 = [{'key': 'Manufacturing', 'values': [{'y': 100.0, 'x': 0}, {'y': 98.5, 'x': 1}, {'y': 97.2, 'x': 2},
        {'y': 92.7, 'x': 3}, {'y': 87.6, 'x': 4}, {'y': 87.9, 'x': 5}, {'y': 87.5, 'x': 6}, {'y': 88.9, 'x': 7},
        {'y': 89.9, 'x': 8}, {'y': 91.6, 'x': 9}, {'y': 92.8, 'x': 10}, {'y': 93.7, 'x': 11}, {'y': 94.0, 'x': 12},
        {'y': 94.4, 'x': 13}, {'y': 93.9, 'x': 14}, {'y': 93.7, 'x': 15}, {'y': 94.1, 'x': 16}, {'y': 92.5, 'x': 17},
        {'y': 92.8, 'x': 18}, {'y': 91.2, 'x': 19}, {'y': 91.0, 'x': 20}, {'y': 91.7, 'x': 21}, {'y': 91.9, 'x': 22},
        {'y': 92.3, 'x': 23}, {'y': 93.8, 'x': 24}, {'y': 94.3, 'x': 25}, {'y': 94.6, 'x': 26}, {'y': 94.9, 'x': 27},
        {'y': 94.9, 'x': 28}, {'y': 94.4, 'x': 29}, {'y': 94.0, 'x': 30}, {'y': 94.1, 'x': 31}, {'y': 93.8, 'x': 32},
        {'y': 95.3, 'x': 33}, {'y': 94.5, 'x': 34}], 'color': '#EF9CFB', 'strokeWidth': 1.5},
        {'key': 'Production', 'values': [{'y': 100.0, 'x': 0}, {'y': 99.1, 'x': 1}, {'y': 97.8, 'x': 2},
            {'y': 93.4, 'x': 3}, {'y': 89.2, 'x': 4}, {'y': 89.4, 'x': 5}, {'y': 88.5, 'x': 6}, {'y': 89.3, 'x': 7},
            {'y': 91.0, 'x': 8}, {'y': 91.9, 'x': 9}, {'y': 92.1, 'x': 10}, {'y': 93.1, 'x': 11}, {'y': 92.4, 'x': 12},
            {'y': 91.5, 'x': 13}, {'y': 91.2, 'x': 14}, {'y': 90.7, 'x': 15}, {'y': 90.3, 'x': 16}, {'y': 89.1, 'x': 17},
            {'y': 89.2, 'x': 18}, {'y': 87.3, 'x': 19}, {'y': 87.6, 'x': 20}, {'y': 88.3, 'x': 21}, {'y': 88.6, 'x': 22},
            {'y': 88.9, 'x': 23}, {'y': 89.3, 'x': 24}, {'y': 89.6, 'x': 25}, {'y': 89.8, 'x': 26}, {'y': 90.0, 'x': 27},
            {'y': 90.4, 'x': 28}, {'y': 91.1, 'x': 29}, {'y': 91.1, 'x': 30}, {'y': 90.7, 'x': 31}, {'y': 90.6, 'x': 32},
            {'y': 92.5, 'x': 33}, {'y': 92.0, 'x': 34}], 'color': '#2ca02c', 'strokeWidth': 1.5},
        {'key': 'Construction', 'values': [{'y': 100.0, 'x': 0}, {'y': 98.9, 'x': 1}, {'y': 96.1, 'x': 2},
            {'y': 90.4, 'x': 3}, {'y': 84.0, 'x': 4}, {'y': 82.9, 'x': 5}, {'y': 84.4, 'x': 6}, {'y': 83.3, 'x': 7},
            {'y': 86.7, 'x': 8}, {'y': 91.6, 'x': 9}, {'y': 93.7, 'x': 10}, {'y': 91.1, 'x': 11}, {'y': 92.5, 'x': 12},
            {'y': 93.3, 'x': 13}, {'y': 92.6, 'x': 14}, {'y': 92.6, 'x': 15}, {'y': 89.4, 'x': 16}, {'y': 86.1, 'x': 17},
            {'y': 84.7, 'x': 18}, {'y': 85.4, 'x': 19}, {'y': 85.0, 'x': 20}, {'y': 86.5, 'x': 21}, {'y': 89.0, 'x': 22},
            {'y': 90.1, 'x': 23}, {'y': 92.1, 'x': 24}, {'y': 93.9, 'x': 25}, {'y': 96.2, 'x': 26}, {'y': 96.5, 'x': 27},
            {'y': 99.0, 'x': 28}, {'y': 99.7, 'x': 29}, {'y': 98.9, 'x': 30}, {'y': 99.5, 'x': 31}, {'y': 100.3, 'x': 32},
            {'y': 100.1, 'x': 33}, {'y': 99.0, 'x': 34}], 'color': '#667711', 'strokeWidth': 1.5},
        {'key': 'Services', 'values': [{'y': 100.0, 'x': 0}, {'y': 99.5, 'x': 1}, {'y': 98.0, 'x': 2}, {'y': 96.5, 'x': 3},
            {'y': 95.7, 'x': 4}, {'y': 95.4, 'x': 5}, {'y': 95.6, 'x': 6}, {'y': 95.7, 'x': 7}, {'y': 95.9, 'x': 8},
            {'y': 96.7, 'x': 9}, {'y': 97.5, 'x': 10}, {'y': 97.9, 'x': 11}, {'y': 98.4, 'x': 12}, {'y': 98.4, 'x': 13},
            {'y': 98.7, 'x': 14}, {'y': 98.9, 'x': 15}, {'y': 99.7, 'x': 16}, {'y': 100.2, 'x': 17}, {'y': 101.8, 'x': 18},
            {'y': 101.8, 'x': 19}, {'y': 102.3, 'x': 20}, {'y': 102.4, 'x': 21}, {'y': 102.8, 'x': 22}, {'y': 103.3, 'x': 23},
            {'y': 104.3, 'x': 24}, {'y': 105.5, 'x': 25}, {'y': 106.7, 'x': 26}, {'y': 107.7, 'x': 27}, {'y': 107.8, 'x': 28},
            {'y': 108.3, 'x': 29}, {'y': 108.8, 'x': 30}, {'y': 109.9, 'x': 31}, {'y': 110.6, 'x': 32}, {'y': 111.3, 'x': 33},
            {'y': 112.1, 'x': 34}], 'color': '#ff7f0e', 'strokeWidth': 1.5}];

    d3.select('#gdp2').append('svg')
        .attr("height", 500)
        .datum(json_data2)
        .call(chart2);

    nv.utils.windowResize(chart2.update);

    return chart2;
});