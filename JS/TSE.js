
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
              'BLUE',
              'GREEN'
            ],
            borderColor: [
              'BLUE',
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

      var tr = `<tr>
<td class="left aligned">TOTAL VOTOS VALIDOS</td>
<td class="right aligned">`+ data.data["0"].VOTOSVALIDOS + `</td>
<td>`+ data.data["0"].PVOTOSVALIDOS + `</td></tr>
<tr><td class="left aligned">VOTOS NULOS</td>
<td class="right aligned">`+ data.data["0"].NULOS + `</td>
<td>`+ data.data["0"].PNULOS + `</td></tr>
<tr><td class="left aligned">VOTOS EN BLANCO</td>
<td class="right aligned">`+ data.data["0"].BLANCOS + `</td>
<td>`+ data.data["0"].PBLANCOS + `</td></tr>
<tr><td class="left aligned">VOTOS VALIDAMENTE EMITIDOS</td>
<td class="right aligned">`+ data.data["0"].TOTALVOTOS + `</td>
<td>`+ data.data["0"].PTOTALVOTOS + `</td></tr>
<tr><td class="left aligned">VOTOS INVALIDOS</td>
<td class="right aligned">`+ data.data["0"].INVALIDOS + `</td>
<td>`+ data.data["0"].PINVALIDOS + `</td></tr>
<tr><td class="left aligned">IMPUGNACIONES</td>
<td class="right aligned">`+ data.data["0"].CNTIMPUGNA + `</td>
<td>`+ data.data["0"].PCNTIMPUGNA + `</td>
</tr>`;

      var tr2 = `<tr>
<td class="left aligned">VAMOS</td>
<td class="right aligned">`+ data.data["0"].V1 + `</td>
<td>`+ data.data["0"].P1 + `</td></tr>
<tr><td class="left aligned">UNE</td>
<td class="right aligned">`+ data.data["0"].V2 + `</td>
<td>`+ data.data["0"].P2 + `</td>
</tr>`;
      $("#myTable").empty();
      $("#myTable2").empty();
      $("#myTable").append(tr);
      $("#myTable2").append(tr2);
    }

  );
}

$(document).ready(function () {
  Consultar();
});
