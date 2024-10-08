function getChartColorsArray(t) {
    var e = document.getElementById(t);
    if (e) {
        e = e.dataset.colors;
        if (e)
            return JSON.parse(e).map((t) => {
                var e = t.replace(/\s/g, "");
                return e.includes(",")
                    ? 2 === (t = t.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(t[0])}, ${t[1]})`
                        : e
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(e) || e;
            });
        console.warn("data-colors attribute not found on: " + t);
    }
}
var chartLineAreaMultiChart = "";
function loadCharts() {
    var t;
    (t = getChartColorsArray("portfolio_charts")) &&
        ((t = {
            series: [
                {
                    name: "Earnings",
                    type: "column",
                    data: [
                        23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21, 37, 23,
                        11, 22,
                    ],
                },
                {
                    name: "Orders",
                    type: "area",
                    data: [
                        44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 45, 64, 44,
                        55, 41,
                    ],
                },
                {
                    name: "Refunds",
                    type: "line",
                    data: [
                        30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 25, 21, 30,
                        25, 36,
                    ],
                },
            ],
            chart: {
                height: 400,
                type: "line",
                stacked: !1,
                toolbar: { show: !1 },
            },
            stroke: { width: [0, 2, 3], curve: "smooth" },
            plotOptions: { bar: { columnWidth: "25%" } },
            fill: {
                opacity: [1, 0.08, 1],
                gradient: {
                    inverseColors: !1,
                    shade: "light",
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            legend: { show: !0, position: "top", horizontalAlign: "right" },
            labels: [
                "01/01/2022",
                "02/01/2022",
                "03/01/2022",
                "04/01/2022",
                "05/01/2022",
                "06/01/2022",
                "07/01/2022",
                "08/01/2022",
                "09/01/2022",
                "10/01/2022",
                "11/01/2022",
                "12/01/2022",
                "01/01/2023",
                "02/01/2023",
                "03/01/2023",
                "04/01/2023",
            ],
            markers: { size: 0 },
            xaxis: { type: "datetime" },
            tooltip: {
                shared: !0,
                intersect: !1,
                y: {
                    formatter: function (t) {
                        return void 0 !== t ? "$" + t.toFixed(0) : t;
                    },
                },
            },
            colors: t,
        }),
        "" != chartLineAreaMultiChart && chartLineAreaMultiChart.destroy(),
        (chartLineAreaMultiChart = new ApexCharts(
            document.querySelector("#portfolio_charts"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
