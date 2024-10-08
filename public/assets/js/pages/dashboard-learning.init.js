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
var totalStudentsChart = "",
    totalCoursesChart = "",
    chartStorkeRadialbarChart = "",
    linechartDatalabelChart = "",
    areachartSplineChart = "";
function loadCharts() {
    var t, e;
    (e = getChartColorsArray("total_students")) &&
        ((t = {
            series: [
                { name: "Total Students", data: [33, 56, 37, 51, 42, 83, 71] },
            ],
            chart: { height: 95, type: "bar", toolbar: { show: !1 } },
            plotOptions: { bar: { distributed: !0 } },
            legend: { show: !1 },
            dataLabels: { enabled: !1 },
            grid: {
                show: !1,
                padding: { top: -15, right: 0, left: 0, bottom: -10 },
                yaxis: { lines: { show: !1 } },
            },
            stroke: { width: 2, curve: "smooth" },
            colors: e,
            xaxis: {
                categories: ["S", "M", "T", "W", "T", "F", "S"],
                labels: { show: !1 },
            },
            yaxis: { show: !1 },
        }),
        "" != totalStudentsChart && totalStudentsChart.destroy(),
        (totalStudentsChart = new ApexCharts(
            document.querySelector("#total_students"),
            t
        )).render()),
        (e = getChartColorsArray("total_courses")) &&
            ((t = {
                series: [
                    {
                        name: "Total Courses",
                        data: [33, 56, 37, 51, 42, 83, 71],
                    },
                ],
                chart: { height: 95, type: "line", toolbar: { show: !1 } },
                legend: { show: !1 },
                dataLabels: { enabled: !1 },
                grid: {
                    show: !1,
                    padding: { top: -15, right: 0, left: 0, bottom: -10 },
                    yaxis: { lines: { show: !1 } },
                },
                stroke: { width: 2, curve: "smooth" },
                colors: e,
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                    ],
                    labels: { show: !1 },
                },
                yaxis: { show: !1 },
            }),
            "" != totalCoursesChart && totalCoursesChart.destroy(),
            (totalCoursesChart = new ApexCharts(
                document.querySelector("#total_courses"),
                t
            )).render()),
        (e = getChartColorsArray("stroked_radialbar")) &&
            ((t = {
                series: [67],
                chart: { height: 320, type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        startAngle: -120,
                        endAngle: 120,
                        dataLabels: {
                            name: {
                                fontSize: "16px",
                                color: void 0,
                                offsetY: 80,
                            },
                            value: {
                                offsetY: 30,
                                fontSize: "20px",
                                color: "#87888a",
                                formatter: function (t) {
                                    return t + "%";
                                },
                            },
                        },
                    },
                },
                grid: {
                    show: !1,
                    padding: { top: -15, right: 0, left: 0, bottom: -10 },
                    yaxis: { lines: { show: !1 } },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: 0.15,
                        inverseColors: !1,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91],
                    },
                },
                stroke: { dashArray: 4 },
                labels: ["Daily Goal"],
                colors: e,
            }),
            "" != chartStorkeRadialbarChart &&
                chartStorkeRadialbarChart.destroy(),
            (chartStorkeRadialbarChart = new ApexCharts(
                document.querySelector("#stroked_radialbar"),
                t
            )).render()),
        (e = getChartColorsArray("line_chart_datalabel")) &&
            ((t = {
                chart: {
                    height: 405,
                    zoom: { enabled: !0 },
                    toolbar: { show: !1 },
                },
                colors: e,
                markers: {
                    size: 0,
                    colors: "#ffffff",
                    strokeColors: e,
                    strokeWidth: 1,
                    strokeOpacity: 0.9,
                    fillOpacity: 1,
                },
                dataLabels: { enabled: !1 },
                stroke: { width: [2, 2, 2], curve: "smooth" },
                series: [
                    {
                        name: "Orders",
                        type: "line",
                        data: [
                            180, 274, 346, 290, 370, 420, 490, 542, 510, 580,
                            636, 745,
                        ],
                    },
                    {
                        name: "Refunds",
                        type: "area",
                        data: [
                            100, 154, 302, 411, 300, 284, 273, 232, 187, 174,
                            152, 122,
                        ],
                    },
                    {
                        name: "Earnings",
                        type: "line",
                        data: [
                            260, 360, 320, 345, 436, 527, 641, 715, 832, 794,
                            865, 933,
                        ],
                    },
                ],
                fill: {
                    type: ["solid", "gradient", "solid"],
                    gradient: {
                        shadeIntensity: 1,
                        type: "vertical",
                        inverseColors: !1,
                        opacityFrom: 0.3,
                        opacityTo: 0,
                        stops: [20, 80, 100, 100],
                    },
                },
                grid: {
                    row: {
                        colors: ["transparent", "transparent"],
                        opacity: 0.2,
                    },
                    borderColor: "#f1f1f1",
                },
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
                },
                legend: {
                    position: "top",
                    horizontalAlign: "right",
                    floating: !0,
                    offsetY: -25,
                    offsetX: -5,
                },
                responsive: [
                    {
                        breakpoint: 600,
                        options: {
                            chart: { toolbar: { show: !1 } },
                            legend: { show: !1 },
                        },
                    },
                ],
            }),
            "" != linechartDatalabelChart && linechartDatalabelChart.destroy(),
            (linechartDatalabelChart = new ApexCharts(
                document.querySelector("#line_chart_datalabel"),
                t
            )).render());
    (e = getChartColorsArray("area_chart_spline")) &&
        ((t = {
            series: [
                {
                    name: "This Month",
                    data: [49, 54, 48, 54, 67, 88, 96, 102, 120, 133],
                },
                {
                    name: "Last Month",
                    data: [57, 66, 74, 63, 55, 70, 84, 97, 112, 99],
                },
            ],
            chart: { height: 320, type: "area", toolbar: { show: !1 } },
            fill: {
                type: ["gradient", "gradient"],
                gradient: {
                    shadeIntensity: 1,
                    type: "vertical",
                    inverseColors: !1,
                    opacityFrom: 0.2,
                    opacityTo: 0,
                    stops: [50, 70, 100, 100],
                },
            },
            markers: {
                size: 4,
                strokeColors: e,
                strokeWidth: 1,
                strokeOpacity: 0.9,
                fillOpacity: 1,
                hover: { size: 6 },
            },
            grid: { show: !1, padding: { top: 0, right: 0, bottom: 0 } },
            legend: { show: !1 },
            dataLabels: { enabled: !1 },
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
            stroke: { width: [2, 2], curve: "smooth" },
            colors: e,
        }),
        "" != areachartSplineChart && areachartSplineChart.destroy(),
        (areachartSplineChart = new ApexCharts(
            document.querySelector("#area_chart_spline"),
            t
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
var options = new List("coursesList", {
        valueNames: [
            "courses_Name",
            "category",
            "instructor",
            "lessons",
            "duration",
            "fees",
            "status",
            "rating",
        ],
        page: 5,
        pagination: !0,
    }),
    sorttableDropdown = document.querySelectorAll(".sortble-dropdown");
sorttableDropdown &&
    sorttableDropdown.forEach(function (a) {
        a.querySelectorAll(".dropdown-menu .dropdown-item").forEach(function (
            e
        ) {
            e.addEventListener("click", function () {
                var t = e.innerHTML;
                a.querySelector(".dropdown-title").innerHTML = t;
            });
        });
    });
