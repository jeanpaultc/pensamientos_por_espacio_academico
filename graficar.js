//se hace una variable global para no complicar la vida
let data;

//grafica, pero si no se tienen antes las variables globales con algo, no grafica nada xd (por el asincronismo) (puto javascript)
const graficar = function(){
    Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        //aquí se pone el nombre del titulo del gráfico
        title: {
            text: 'Gráfica de pensamiento por espacio académico'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} pensamiento(s)'
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        //aquí es donde se ponen los atrbutos para graficar (los data son tomado de los json que contienen un array de objetos)
        series: data
    });
    console.log(data);
}


//desde aquí empieza la función a punta de sincronismo para que vaya cargando todos los datos para graficar en las variables globales
function continente(){

    const datos = new Promise((resolve, reject) =>{
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'datos.json', true);
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let dat = JSON.parse(this.responseText);
                resolve(dat);
            }
        }
    }).then((dat) => {
        data = dat;
        graficar();
    });

}

continente();

console.log("sapo gonorreaaaa")
