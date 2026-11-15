/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6657894736842105, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.6, 500, 1500, "Cucumber page"], "isController": false}, {"data": [0.45, 500, 1500, "Playground page"], "isController": false}, {"data": [0.5, 500, 1500, "Postman page"], "isController": false}, {"data": [0.7, 500, 1500, "Software Testing page"], "isController": false}, {"data": [0.9, 500, 1500, "Tutorials page"], "isController": false}, {"data": [0.7, 500, 1500, "Rest Assured page"], "isController": false}, {"data": [0.7, 500, 1500, "ISTQB page"], "isController": false}, {"data": [0.6, 500, 1500, "Scrum page"], "isController": false}, {"data": [0.7, 500, 1500, "Test Project page"], "isController": false}, {"data": [0.7, 500, 1500, "Home page"], "isController": false}, {"data": [0.55, 500, 1500, "Selenium page"], "isController": false}, {"data": [0.65, 500, 1500, "TestNG page"], "isController": false}, {"data": [0.55, 500, 1500, "Cypress page"], "isController": false}, {"data": [0.75, 500, 1500, "Read More page"], "isController": false}, {"data": [0.55, 500, 1500, "Git page"], "isController": false}, {"data": [0.8, 500, 1500, "Selenium Training page"], "isController": false}, {"data": [0.6, 500, 1500, "Python page"], "isController": false}, {"data": [0.75, 500, 1500, "Enroll Yourself page"], "isController": false}, {"data": [0.9, 500, 1500, "About page"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 190, 0, 0.0, 645.5263157894735, 220, 2563, 601.0, 953.7, 1136.05, 1716.7000000000032, 12.40451785597702, 958.8376706641313, 1.7048561239146047], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Cucumber page", 10, 0, 0.0, 719.6999999999999, 446, 986, 693.0, 982.2, 986.0, 986.0, 2.4354603019970775, 208.60954243789578, 0.3282163297613249], "isController": false}, {"data": ["Playground page", 10, 0, 0.0, 628.4000000000001, 501, 1633, 518.5, 1524.1000000000004, 1633.0, 1633.0, 2.5290844714213456, 1.879524690187152, 0.2840280412240769], "isController": false}, {"data": ["Postman page", 10, 0, 0.0, 933.4, 755, 1300, 885.0, 1276.3000000000002, 1300.0, 1300.0, 1.8429782528566163, 154.76643850211943, 0.26096860025801694], "isController": false}, {"data": ["Software Testing page", 10, 0, 0.0, 683.0999999999999, 286, 2563, 501.0, 2370.4000000000005, 2563.0, 2563.0, 3.3921302578018997, 324.5738636363636, 0.5399582343962008], "isController": false}, {"data": ["Tutorials page", 10, 0, 0.0, 400.0, 248, 866, 329.0, 832.7, 866.0, 866.0, 2.802690582959641, 72.6252671314462, 0.3558103279147982], "isController": false}, {"data": ["Rest Assured page", 10, 0, 0.0, 675.5, 360, 904, 733.0, 903.5, 904.0, 904.0, 2.3046784973496197, 189.94579504206035, 0.31959408849965426], "isController": false}, {"data": ["ISTQB page", 10, 0, 0.0, 761.6999999999999, 452, 1253, 819.0, 1232.7, 1253.0, 1253.0, 1.9880715705765406, 157.88724683151094, 0.3106361829025845], "isController": false}, {"data": ["Scrum page", 10, 0, 0.0, 689.1999999999999, 370, 954, 727.5, 945.2, 954.0, 954.0, 2.3277467411545625, 196.04128477071694, 0.3341589560055866], "isController": false}, {"data": ["Test Project page", 10, 0, 0.0, 550.5999999999999, 302, 982, 569.0, 959.2, 982.0, 982.0, 2.770083102493075, 216.88966196329642, 0.3787222991689751], "isController": false}, {"data": ["Home page", 10, 0, 0.0, 623.5999999999999, 281, 1505, 486.5, 1467.7000000000003, 1505.0, 1505.0, 2.1459227467811157, 123.17554653969957, 0.251475321888412], "isController": false}, {"data": ["Selenium page", 10, 0, 0.0, 725.3, 344, 1176, 661.5, 1157.9, 1176.0, 1176.0, 2.4925224327018944, 311.5950001557827, 0.3821543182951147], "isController": false}, {"data": ["TestNG page", 10, 0, 0.0, 683.3, 423, 1065, 695.0, 1049.1000000000001, 1065.0, 1065.0, 1.9638648860958365, 143.87343197663003, 0.2742506628043991], "isController": false}, {"data": ["Cypress page", 10, 0, 0.0, 709.0, 294, 872, 804.0, 869.8, 872.0, 872.0, 2.127206977238885, 180.49205787332482, 0.2845970272282493], "isController": false}, {"data": ["Read More page", 10, 0, 0.0, 511.8, 294, 802, 495.5, 797.9, 802.0, 802.0, 2.537427048972342, 285.4964733728749, 0.3617815909667597], "isController": false}, {"data": ["Git page", 10, 0, 0.0, 827.0999999999999, 356, 1211, 849.0, 1204.0, 1211.0, 1211.0, 1.9992003198720512, 168.01267774140345, 0.26747113654538185], "isController": false}, {"data": ["Selenium Training page", 10, 0, 0.0, 452.5, 276, 714, 388.5, 708.7, 714.0, 714.0, 2.6116479498563594, 293.8392143020371, 0.3749143053016453], "isController": false}, {"data": ["Python page", 10, 0, 0.0, 706.4000000000001, 475, 1028, 733.0, 1020.3000000000001, 1028.0, 1028.0, 2.1528525296017222, 159.0129675726588, 0.28592572658772875], "isController": false}, {"data": ["Enroll Yourself page", 10, 0, 0.0, 601.1, 317, 1218, 505.0, 1177.7000000000003, 1218.0, 1218.0, 2.359046945034206, 265.42111752477, 0.33634849020995516], "isController": false}, {"data": ["About page", 10, 0, 0.0, 383.3, 220, 900, 310.0, 863.6000000000001, 900.0, 900.0, 2.5549310168625445, 41.82102708226878, 0.3118812276443536], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 190, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
