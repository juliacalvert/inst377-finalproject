function getImages() {
  const url = "https://api.fbi.gov/wanted/v1/list";

    fetch(url)
        .then((result) => result.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            const namesContainer = document.getElementById('criminal-names');
            const criminals = data.items.slice(0, 10);

            const nameList = document.createElement('ol');
            namesContainer.appendChild(nameList);

            criminals.forEach((criminal) => {
                if (criminal.images && criminal.images.length > 0) {
                    const img = document.createElement('img');
                    img.src = criminal.images[0].original;
                    img.alt = criminal.title;
                    carousel.appendChild(img);

                    const nameItem = document.createElement('li');
                    nameItem.textContent = criminal.title || "Unknown Name";
                    nameList.appendChild(nameItem);
                }
            });
            setTimeout(() => {
                simpleslider.getSlider({
                    container: carousel,
                    delay: 3,
                    duration: 0.5
                });
            }, 300);
        })
}

function officeChart() {
    const url = "https://api.fbi.gov/wanted/v1/list";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const genderCounts = { Male: 0, Female: 0, Unknown: 0 };

            const firstTen = data.items.slice(0, 10);

            firstTen.forEach(item => {
                const gender = item.sex;
                if (gender === "Male" || gender === "Female") {
                    genderCounts[gender] += 1;
                } else {
                  genderCounts.Unknown += 1;
                }
            });

            const labels = Object.keys(genderCounts);
            const counts = Object.values(genderCounts);

            const ctx = document.getElementById('wantedChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Gender Counts',
                        data: counts,
                        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 0.6)', 'lightgray'],
                        borderColor: ['rgb(17, 130, 206)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Gender'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of People'
                            }
                        }
                    }
                }
            });
        });
}

window.onload = function () {
  officeChart();
  getImages();
};