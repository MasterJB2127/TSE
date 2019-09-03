
function Consultar() {

  var _TIPOELECCION = $("#TIPOELECCION").val();
  var _DEP = $("#DEP").val();
  var _MUN = $("#MUN").val();

  $.post("https://ws2v.tse.org.gt/api/tse/resultados", {
    PROCESO: "201902",
    TIPOELECCION: _TIPOELECCION,
    DEP: _DEP,
    MUN: _MUN
  },
    function (data, status) {

      var UNE = data.data["0"].V1;
      var VAMOS = data.data["0"].V2;

      var ctx = document.getElementById('myChart');

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['VAMOS', 'UNE'],
          datasets: [{
            label: 'VOTOS',
            data: [UNE, VAMOS],
            backgroundColor: [
              'SKYBLUE',
              'LIGHTGREEN'
            ],
            borderColor: [
              'DARKBLUE',
              'GREEN'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
var PVOTOSVALIDOS = data.data["0"].PVOTOSVALIDOS.toFixed(2);
var PNULOS = data.data["0"].PNULOS.toFixed(2);
var PBLANCOS = data.data["0"].PBLANCOS.toFixed(2);
var PTOTALVOTOS = data.data["0"].PTOTALVOTOS.toFixed(2);
var PINVALIDOS = data.data["0"].PINVALIDOS.toFixed(2);
var PCNTIMPUGNA = data.data["0"].PCNTIMPUGNA.toFixed(2);
var P1 = data.data["0"].P1.toFixed(2);
var P2 = data.data["0"].P2.toFixed(2);
      var tr = `<tr>
<td class="left aligned">TOTAL VOTOS VALIDOS</td>
<td class="right aligned">`+ data.data["0"].VOTOSVALIDOS + `</td>
<td>`+ PVOTOSVALIDOS + `%</td></tr>
<tr><td class="left aligned">VOTOS NULOS</td>
<td class="right aligned">`+ data.data["0"].NULOS + `</td>
<td>`+ PNULOS + `%</td></tr>
<tr><td class="left aligned">VOTOS EN BLANCO</td>
<td class="right aligned">`+ data.data["0"].BLANCOS + `</td>
<td>`+ PBLANCOS + `%</td></tr>
<tr><td class="left aligned">VOTOS VALIDAMENTE EMITIDOS</td>
<td class="right aligned">`+ data.data["0"].TOTALVOTOS + `</td>
<td>`+ PTOTALVOTOS + `%</td></tr>
<tr><td class="left aligned">VOTOS INVALIDOS</td>
<td class="right aligned">`+ data.data["0"].INVALIDOS + `</td>
<td>`+ PINVALIDOS + `%</td></tr>
<tr><td class="left aligned">IMPUGNACIONES</td>
<td class="right aligned">`+ data.data["0"].CNTIMPUGNA + `</td>
<td>`+ PCNTIMPUGNA + `%</td>
</tr>`;

      var tr2 = `<tr>
<td class="left aligned">VAMOS</td>
<td class="right aligned">`+ data.data["0"].V1 + `</td>
<td>`+ P1 + `%</td></tr>
<tr><td class="left aligned">UNE</td>
<td class="right aligned">`+ data.data["0"].V2 + `</td>
<td>`+ P2 + `%</td>
</tr>`;
      $("#myTable").empty();
      $("#myTable2").empty();
      $("#myTable").append(tr);
      $("#myTable2").append(tr2);
    }

  );
}

function Mesas() {

  var _TIPOELECCION = $("#TIPOELECCION").val();
  var _DEP = $("#DEP").val();
  var _MUN = $("#MUN").val();

  $.post("https://ws2v.tse.org.gt/api/tse/resultados", {
    PROCESO: "201902",
    TIPOELECCION: _TIPOELECCION,
    DEP: _DEP,
    MUN: _MUN
  },
    function (data, status) {

      var TOTALMESAS = data.data["0"].CNTMESAS;
      var MESASPRO = data.data["0"].MESASPRO;
      var MESASFALT = data.data["0"].MESASFALT;
      var CNTVOTANTES = data.data["0"].CNTVOTANTES;
      var ABSTENCIONISMO = data.data["0"].ABSTENCIONISMO;

      var ctx = document.getElementById('myChart2');

      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['MESAS PROCESADAS', 'MESAS FALTANTES'],
          datasets: [{
            label: 'VOTOS',
            data: [MESASPRO,MESASFALT],
            backgroundColor: [
              'YELLOW',
              'DARKRED'
            ],
            borderColor: [
              'none',
              'none'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      var tr = `<tr>
<td class="left aligned">TOTAL MESAS:</td>
<td class="right aligned">`+ TOTALMESAS + `</td></tr>
<tr><td class="left aligned">MESAS PROCESADAS:</td>
<td class="right aligned">`+ MESASPRO + `</td></tr>
<tr><td class="left aligned">MESAS NO PROCESADAS:</td>
<td class="right aligned">`+ MESASFALT+ `</td>
</tr>`;

      var tr2 = `<tr>
<td class="left aligned">VOTANTES INSCRITOS:</td>
<td class="right aligned">`+ CNTVOTANTES + `</td></tr>
<tr><td class="left aligned">ABSTENCIONISMO:</td>
<td class="right aligned">`+ABSTENCIONISMO+ `</td>
</tr>`;
      $("#myTable3").empty();
      $("#myTable4").empty();
      $("#myTable3").append(tr);
      $("#myTable4").append(tr2);
    }

  );
}


$(document).ready(function () {
  Consultar();
  Mesas();
});
