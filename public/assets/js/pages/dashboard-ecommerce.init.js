function getChartColorsArray(e) {
    var r = document.getElementById(e);
    if (r) {
        r = r.dataset.colors;
        if (r)
            return JSON.parse(r).map((e) => {
                var r = e.replace(/\s/g, "");
                return r.includes(",")
                    ? 2 === (e = e.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(e[0])}, ${e[1]})`
                        : r
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(r) || r;
            });
        console.warn("data-colors attribute not found on: " + e);
    }
}
var marketOverviewChart = "",
    areachartmini6Chart = "",
    areachartmini7Chart = "",
    chartColumnChart = "";
function loadCharts() {
    (r = getChartColorsArray("market-overview")) &&
        ((e = {
            series: [
                {
                    name: "Earning",
                    data: [
                        26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32,
                        25, 24.65, 29.32,
                    ],
                },
                {
                    name: "Expense",
                    data: [
                        -10, -17.32, -15.45, -12.3, -19.15, -15.45, -11, -14.32,
                        -15.67, -10, -17.32, -19.2,
                    ],
                },
            ],
            chart: {
                type: "bar",
                height: 328,
                stacked: !0,
                toolbar: { show: !1 },
            },
            stroke: { width: 5, colors: "#000", lineCap: "round" },
            grid: {
                show: !0,
                borderColor: "#000",
                xaxis: { lines: { show: !1 } },
                yaxis: { lines: { show: !1 } },
            },
            plotOptions: {
                bar: {
                    columnWidth: "30%",
                    borderRadius: 5,
                    lineCap: "round",
                    borderRadiusOnAllStackedSeries: !0,
                },
            },
            colors: r,
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
        "" != marketOverviewChart && marketOverviewChart.destroy(),
        (marketOverviewChart = new ApexCharts(
            document.querySelector("#market-overview"),
            e
        )).render()),
        (r = getChartColorsArray("mini-chart-6")) &&
            ((t = {
                series: [{ data: [50, 15, 35, 62, 23, 56, 44, 12] }],
                chart: { type: "line", height: 45, sparkline: { enabled: !0 } },
                colors: r,
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
                t
            )).render()),
        (r = getChartColorsArray("mini-chart-7")) &&
            ((t = {
                series: [{ data: [50, 15, 20, 34, 23, 56, 65, 41] }],
                chart: { type: "line", height: 45, sparkline: { enabled: !0 } },
                colors: r,
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
                t
            )).render());
    (r = getChartColorsArray("column_chart")) &&
        ((e = {
            chart: { height: 360, type: "bar", toolbar: { show: !1 } },
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "45%",
                    endingShape: "rounded",
                },
            },
            dataLabels: { enabled: !1 },
            stroke: { show: !0, width: 1, colors: ["transparent"] },
            legend: { show: !0, position: "top" },
            series: [
                { name: "Search Engine Traffic", data: [74, 83, 102, 97] },
                { name: "Direct Traffic", data: [46, 57, 59, 54] },
            ],
            colors: r,
            xaxis: { categories: ["Feb", "Mar", "Apr", "May"] },
            yaxis: { show: !1 },
            grid: { borderColor: "#f1f1f1" },
        }),
        "" != chartColumnChart && chartColumnChart.destroy(),
        (chartColumnChart = new ApexCharts(
            document.querySelector("#column_chart"),
            e
        )).render());
    var e,
        r,
        t = getChartColorsArray("world-map-line-markers");
    t &&
        ((document.getElementById("world-map-line-markers").innerHTML = ""),
        new jsVectorMap({
            map: "world_merc",
            selector: "#world-map-line-markers",
            zoomOnScroll: !1,
            zoomButtons: !1,
            markers: [
                { name: "Greenland", coords: [72, -42] },
                { name: "Canada", coords: [56.1304, -106.3468] },
                { name: "Brazil", coords: [-14.235, -51.9253] },
                { name: "Serbia", coords: [44.0165, 21.0059] },
                { name: "Russia", coords: [61, 105] },
                { name: "United States", coords: [37.0902, -95.7129] },
            ],
            regionStyle: {
                initial: {
                    stroke: "#9599ad",
                    strokeWidth: 0.25,
                    fill: t,
                    fillOpacity: 1,
                },
            },
            labels: {
                markers: {
                    render(e, r) {
                        return e.name || e.labelName || "Not available";
                    },
                },
            },
        }));
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
var options = {
        valueNames: [
            "order_date",
            "order_id",
            "shop",
            "customer",
            "products",
            "amount",
            "status",
            "rating",
        ],
    },
    contactList = new List("contactList", options).on("updated", function (e) {
        0 == e.matchingItems.length
            ? (document.getElementsByClassName("noresult")[0].style.display =
                  "block")
            : (document.getElementsByClassName("noresult")[0].style.display =
                  "none"),
            0 < e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block");
    }),
    sorttableDropdown = document.querySelectorAll(".sortble-dropdown");
sorttableDropdown &&
    sorttableDropdown.forEach(function (t) {
        t.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (
            r
        ) {
            r.addEventListener("click", function () {
                var e = r.innerHTML;
                t.querySelector(".dropdown-title").innerHTML = e;
            });
        });
    });
