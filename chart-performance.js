const ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.height = 100;
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartDataX,
        datasets: [
            {
                label: 'Average fitness of generation',
                backgroundColor: "rgba(250,90,175,0.5)",
                borderColor: "rgba(250,90,175,1.0)",
                data: chartDataY1,
            },
            {
                label: 'Top performing individual',
                backgroundColor: "rgba(40,110,245,0.5)",
                borderColor: "rgba(40,110,245,1.0)",
                data: chartDataY2,
            },
        ]},
    options: 
    {
        responsive: true,
        interaction:
        {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins:
        {
            legend: 
            {
                position: 'top',
            },
            title:
            {
                display: true,
                text: 'Performance'
            }
        },
        scales:
        {
            y:
            {
                type: 'linear',
                display: true,
                beginAtZero: true,
                title:
                {
                    display: true,
                    text: 'Task Fitness',
                }
            },
            x:
            {
                type: 'linear',
                display: true,
                title:
                {
                    display: true,
                    text: 'Generation',
                }
            },
        },
    }
});
