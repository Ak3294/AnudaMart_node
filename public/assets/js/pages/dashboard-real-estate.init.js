function getChartColorsArray(e) {
    var t = document.getElementById(e);
    if (t) {
        t = t.dataset.colors;
        if (t)
            return JSON.parse(t).map((e) => {
                var t = e.replace(/\s/g, "");
                return t.includes(",")
                    ? 2 === (e = e.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(e[0])}, ${e[1]})`
                        : t
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(t) || t;
            });
        console.warn("data-colors attribute not found on: " + e);
    }
}
var pieChart,
    propertySaleChart = "",
    propertyRentChart = "",
    visitorsChart = "",
    residencyChart = "",
    totalRevenueChart = "",
    totalIncomeChart = "",
    propertySale2Chart = "",
    propetryRentChart = "",
    chartRadialbarMultipleChart = "",
    areachartmini6Chart = "",
    areachartmini7Chart = "",
    areachartmini8Chart = "",
    areachartmini9Chart = "";
function loadCharts() {
    (t = getChartColorsArray("property_sale")) &&
        ((e = {
            series: [80],
            chart: {
                width: 110,
                height: 110,
                type: "radialBar",
                sparkline: { enabled: !0 },
            },
            plotOptions: {
                radialBar: {
                    hollow: { margin: 0, size: "50%" },
                    track: { margin: 0, background: t, opacity: 0.2 },
                    dataLabels: { show: !1 },
                },
            },
            grid: { padding: { top: -15, bottom: -15 } },
            stroke: { lineCap: "round" },
            labels: ["Cricket"],
            colors: t,
        }),
        "" != propertySaleChart && propertySaleChart.destroy(),
        (propertySaleChart = new ApexCharts(
            document.querySelector("#property_sale"),
            e
        )).render()),
        (t = getChartColorsArray("property_rent")) &&
            ((e = {
                series: [65],
                chart: {
                    width: 110,
                    height: 110,
                    type: "radialBar",
                    sparkline: { enabled: !0 },
                },
                plotOptions: {
                    radialBar: {
                        hollow: { margin: 0, size: "50%" },
                        track: { margin: 0, background: t, opacity: 0.2 },
                        dataLabels: { show: !1 },
                    },
                },
                grid: { padding: { top: -15, bottom: -15 } },
                stroke: { lineCap: "round" },
                labels: ["Cricket"],
                colors: t,
            }),
            "" != propertyRentChart && propertyRentChart.destroy(),
            (propertyRentChart = new ApexCharts(
                document.querySelector("#property_rent"),
                e
            )).render()),
        (t = getChartColorsArray("visitors_chart")) &&
            ((e = {
                series: [47],
                chart: {
                    width: 110,
                    height: 110,
                    type: "radialBar",
                    sparkline: { enabled: !0 },
                },
                plotOptions: {
                    radialBar: {
                        hollow: { margin: 0, size: "50%" },
                        track: { margin: 0, background: t, opacity: 0.2 },
                        dataLabels: { show: !1 },
                    },
                },
                grid: { padding: { top: -15, bottom: -15 } },
                stroke: { lineCap: "round" },
                labels: ["Cricket"],
                colors: t,
            }),
            "" != visitorsChart && visitorsChart.destroy(),
            (visitorsChart = new ApexCharts(
                document.querySelector("#visitors_chart"),
                e
            )).render()),
        (t = getChartColorsArray("residency_property")) &&
            ((e = {
                series: [43],
                chart: {
                    width: 110,
                    height: 110,
                    type: "radialBar",
                    sparkline: { enabled: !0 },
                },
                plotOptions: {
                    radialBar: {
                        hollow: { margin: 0, size: "50%" },
                        track: { margin: 0, background: t, opacity: 0.2 },
                        dataLabels: { show: !1 },
                    },
                },
                grid: { padding: { top: -15, bottom: -15 } },
                stroke: { lineCap: "round" },
                labels: ["Cricket"],
                colors: t,
            }),
            "" != residencyChart && residencyChart.destroy(),
            (residencyChart = new ApexCharts(
                document.querySelector("#residency_property"),
                e
            )).render()),
        (t = getChartColorsArray("total_revenue")) &&
            ((e = {
                series: [
                    {
                        name: "Income",
                        data: [
                            26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65,
                            27.32, 25, 24.65, 29.32,
                        ],
                    },
                ],
                chart: {
                    type: "bar",
                    height: 328,
                    stacked: !0,
                    toolbar: { show: !1 },
                },
                plotOptions: {
                    bar: {
                        columnWidth: "30%",
                        lineCap: "round",
                        borderRadiusOnAllStackedSeries: !0,
                    },
                },
                grid: { padding: { left: 0, right: 0, top: -15, bottom: -15 } },
                colors: t,
                fill: { opacity: 1 },
                dataLabels: { enabled: !1, textAnchor: "top" },
                yaxis: {
                    labels: {
                        show: !0,
                        formatter: function (e) {
                            return e.toFixed(0) + "k";
                        },
                    },
                },
                legend: { show: !1, position: "top", horizontalAlign: "right" },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    labels: { rotate: -90 },
                    axisTicks: { show: !0 },
                    axisBorder: { show: !0, stroke: { width: 1 } },
                },
            }),
            "" != totalRevenueChart && totalRevenueChart.destroy(),
            (totalRevenueChart = new ApexCharts(
                document.querySelector("#total_revenue"),
                e
            )).render()),
        (t = getChartColorsArray("total_income")) &&
            ((e = {
                series: [
                    {
                        name: "Income",
                        data: [
                            32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53,
                            69, 72, 83, 90, 110, 130, 117, 103, 92, 95, 119, 80,
                            96, 116, 125,
                        ],
                    },
                ],
                chart: { height: 328, type: "line", toolbar: { show: !1 } },
                grid: { yaxis: { lines: { show: !1 } } },
                markers: { size: 0, hover: { sizeOffset: 4 } },
                stroke: { curve: "smooth", width: 2 },
                colors: t,
                xaxis: {
                    type: "datetime",
                    categories: [
                        "02/01/2023 GMT",
                        "02/02/2023 GMT",
                        "02/03/2023 GMT",
                        "02/04/2023 GMT",
                        "02/05/2023 GMT",
                        "02/06/2023 GMT",
                        "02/07/2023 GMT",
                        "02/08/2023 GMT",
                        "02/09/2023 GMT",
                        "02/10/2023 GMT",
                        "02/11/2023 GMT",
                        "02/12/2023 GMT",
                        "02/13/2023 GMT",
                        "02/14/2023 GMT",
                        "02/15/2023 GMT",
                        "02/16/2023 GMT",
                        "02/17/2023 GMT",
                        "02/18/2023 GMT",
                        "02/19/2023 GMT",
                        "02/20/2023 GMT",
                        "02/21/2023 GMT",
                        "02/22/2023 GMT",
                        "02/23/2023 GMT",
                        "02/24/2023 GMT",
                        "02/25/2023 GMT",
                        "02/26/2023 GMT",
                        "02/27/2023 GMT",
                        "02/28/2023 GMT",
                    ],
                },
                yaxis: {
                    labels: {
                        show: !0,
                        formatter: function (e) {
                            return "$" + e.toFixed(0);
                        },
                    },
                },
            }),
            "" != totalIncomeChart && totalIncomeChart.destroy(),
            (totalIncomeChart = new ApexCharts(
                document.querySelector("#total_income"),
                e
            )).render()),
        (t = getChartColorsArray("property_sale_chart")) &&
            ((e = {
                series: [
                    {
                        name: "Property Rent",
                        data: [
                            30, 57, 25, 33, 20, 27, 38, 49, 42, 58, 33, 46, 40,
                            34, 41, 53, 19, 23, 36, 52, 58, 43,
                        ],
                    },
                ],
                chart: { height: 328, type: "bar", toolbar: { show: !1 } },
                colors: t,
                plotOptions: {
                    bar: {
                        columnWidth: "30%",
                        distributed: !0,
                        borderRadius: 5,
                    },
                },
                dataLabels: { enabled: !1 },
                legend: { show: !1 },
                xaxis: {
                    type: "datetime",
                    categories: [
                        "01/01/2023 GMT",
                        "01/02/2023 GMT",
                        "01/03/2023 GMT",
                        "01/04/2023 GMT",
                        "01/05/2023 GMT",
                        "01/06/2023 GMT",
                        "01/07/2023 GMT",
                        "01/08/2023 GMT",
                        "01/09/2023 GMT",
                        "01/10/2023 GMT",
                        "01/11/2023 GMT",
                        "01/12/2023 GMT",
                        "01/13/2023 GMT",
                        "01/14/2023 GMT",
                        "01/15/2023 GMT",
                        "01/16/2023 GMT",
                        "01/17/2023 GMT",
                        "01/18/2023 GMT",
                        "01/19/2023 GMT",
                        "01/20/2023 GMT",
                        "01/21/2023 GMT",
                        "01/22/2023 GMT",
                    ],
                },
            }),
            "" != propertySale2Chart && propertySale2Chart.destroy(),
            (propertySale2Chart = new ApexCharts(
                document.querySelector("#property_sale_chart"),
                e
            )).render()),
        (t = getChartColorsArray("propetry_rent")) &&
            ((e = {
                series: [
                    {
                        name: "Property Rent",
                        data: [
                            31, 40, 28, 43, 59, 87, 75, 60, 51, 66, 109, 100,
                        ],
                    },
                ],
                chart: { height: 328, type: "area", toolbar: { show: !1 } },
                fill: { opacity: "0.01" },
                dataLabels: { enabled: !1 },
                stroke: { width: 2, curve: "smooth" },
                colors: t,
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    labels: { rotate: -90 },
                    axisTicks: { show: !0 },
                    axisBorder: { show: !0, stroke: { width: 1 } },
                },
            }),
            "" != propetryRentChart && propetryRentChart.destroy(),
            (propetryRentChart = new ApexCharts(
                document.querySelector("#propetry_rent"),
                e
            )).render());
    (t = getChartColorsArray("multiple_radialbar")) &&
        ((e = {
            series: [44, 55, 67, 83],
            chart: { height: 335, type: "pie" },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: { fontSize: "22px" },
                        value: { fontSize: "16px" },
                        total: {
                            show: !0,
                            label: "Total",
                            formatter: function (e) {
                                return 249;
                            },
                        },
                    },
                },
            },
            legend: { show: !0 },
            labels: ["Commercial", "Residential", "Villa", "Apartment"],
            colors: t,
        }),
        "" != chartRadialbarMultipleChart &&
            chartRadialbarMultipleChart.destroy(),
        (chartRadialbarMultipleChart = new ApexCharts(
            document.querySelector("#multiple_radialbar"),
            e
        )).render());
    var e,
        t = getChartColorsArray("property_type");
    t &&
        ((e = document.getElementById("property_type")),
        (pieChart = echarts.init(e)),
        "object" ==
            typeof (e = {
                tooltip: { trigger: "item" },
                legend: {
                    bottom: "0%",
                    left: "center",
                    selectedMode: !1,
                    textStyle: { color: "#87888a" },
                },
                series: [
                    {
                        type: "pie",
                        radius: ["70%", "100%"],
                        center: ["50%", "70%"],
                        startAngle: 180,
                        label: {
                            color: "#87888a",
                            formatter(e) {
                                return e.name + " (" + 2 * e.percent + "%)";
                            },
                        },
                        itemStyle: { borderWidth: 4 },
                        data: [
                            { value: 1048, name: "Residency" },
                            { value: 735, name: "Commercial" },
                            { value: 580, name: "Villa" },
                            { value: 484, name: "Apartment" },
                            {
                                value: 2847,
                                itemStyle: {
                                    color: "none",
                                    decal: { symbol: "none" },
                                },
                                label: { show: !1 },
                            },
                        ],
                    },
                ],
                color: t,
            })) &&
        pieChart.setOption(e),
        (t = getChartColorsArray("mini-chart-6")) &&
            ((e = {
                series: [{ data: [50, 15, 35, 62, 23, 56, 44, 12] }],
                chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
                colors: t,
                stroke: { curve: "smooth", width: 1 },
                tooltip: {
                    fixed: { enabled: !1 },
                    x: { show: !1 },
                    y: {
                        title: {
                            formatter: function (e) {
                                return "";
                            },
                        },
                    },
                    marker: { show: !1 },
                },
            }),
            "" != areachartmini6Chart && areachartmini6Chart.destroy(),
            (areachartmini6Chart = new ApexCharts(
                document.querySelector("#mini-chart-6"),
                e
            )).render()),
        (t = getChartColorsArray("mini-chart-7")) &&
            ((e = {
                series: [{ data: [50, 15, 20, 34, 23, 56, 65, 75] }],
                chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
                colors: t,
                stroke: { curve: "smooth", width: 1 },
                tooltip: {
                    fixed: { enabled: !1 },
                    x: { show: !1 },
                    y: {
                        title: {
                            formatter: function (e) {
                                return "";
                            },
                        },
                    },
                    marker: { show: !1 },
                },
            }),
            "" != areachartmini7Chart && areachartmini7Chart.destroy(),
            (areachartmini7Chart = new ApexCharts(
                document.querySelector("#mini-chart-7"),
                e
            )).render()),
        (t = getChartColorsArray("mini-chart-8")) &&
            ((e = {
                series: [{ data: [32, 18, 29, 31, 46, 33, 39, 46] }],
                chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
                colors: t,
                stroke: { curve: "smooth", width: 1 },
                tooltip: {
                    fixed: { enabled: !1 },
                    x: { show: !1 },
                    y: {
                        title: {
                            formatter: function (e) {
                                return "";
                            },
                        },
                    },
                    marker: { show: !1 },
                },
            }),
            "" != areachartmini8Chart && areachartmini8Chart.destroy(),
            (areachartmini8Chart = new ApexCharts(
                document.querySelector("#mini-chart-8"),
                e
            )).render());
    (t = getChartColorsArray("mini-chart-9")) &&
        ((e = {
            series: [{ data: [36, 25, 18, 34, 39, 30, 34, 42] }],
            chart: { type: "line", height: 50, sparkline: { enabled: !0 } },
            colors: t,
            stroke: { curve: "smooth", width: 1 },
            tooltip: {
                fixed: { enabled: !1 },
                x: { show: !1 },
                y: {
                    title: {
                        formatter: function (e) {
                            return "";
                        },
                    },
                },
                marker: { show: !1 },
            },
        }),
        "" != areachartmini9Chart && areachartmini9Chart.destroy(),
        (areachartmini9Chart = new ApexCharts(
            document.querySelector("#mini-chart-9"),
            e
        )).render());
}
window.addEventListener("resize", function () {
    pieChart.resize(),
        setTimeout(() => {
            loadCharts();
        }, 0);
}),
    loadCharts();
var options = {
        valueNames: [
            "propert_id",
            "propert_type",
            "propert_name",
            "address",
            "agent_name",
            "price",
            "status",
        ],
    },
    propertyList = new List("propertyList", options).on(
        "updated",
        function (e) {
            0 == e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none"),
                0 < e.matchingItems.length
                    ? (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "none")
                    : (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "block");
        }
    ),
    sorttableDropdown = document.querySelectorAll(".sortble-dropdown");
sorttableDropdown &&
    sorttableDropdown.forEach(function (r) {
        r.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (
            t
        ) {
            t.addEventListener("click", function () {
                var e = t.innerHTML;
                r.querySelector(".dropdown-title").innerHTML = e;
            });
        });
    });
