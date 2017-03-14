---
---
var imgPrefix = "{{ site.baseurl }}{{ site.imagedir }}";

{% if site.attribution %}
function attribution (){
  window.alert("{{ site.attribution }}");
}
{% else %}
function attribution () {};
{% endif %}

var mapimg = L.tileLayer('{{ site.mapdir }}', {maxZoom: 12, minZoom: 6, attribution: '<a href="javascript: attribution()">Map Attributions</a>'});

var radarimg = L.imageOverlay('{{ site.radarimg }}', {{ site.radarbounds }}, {opacity: 0.5});
