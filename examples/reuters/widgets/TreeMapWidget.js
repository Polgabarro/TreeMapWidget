(function ($) {
        
	AjaxSolr.TreeMapWidget = AjaxSolr.AbstractFacetWidget.extend({
		afterRequest: function () 
		{
	                
			if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
				$(this.target).html('no items found in current selection');
				return;
			}else{
				
				
                    		
					
				//objectedItems is my list of facets & counts
				var maxCount = 0;
				var objectedItems = [];
				for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
				  var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
				  if (count > maxCount) {
					maxCount = count;
				  }
				  objectedItems.push({ name: facet, size: count });
				}
				maxCount = 0;
				var objectedItems2 = [];
				for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
				  var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
				  if (count > maxCount) {
					maxCount = count;
				  }
				  objectedItems2.push({ name: facet, children : [{name: facet, size: count}] });
				}
				

				
				//see print values
				/*for(var i=0; i<objectedItems.length;i++){
					document.write(objectedItems[i].facet); 
					document.write(",");
					document.write(objectedItems[i].count);
					document.write("\n");
				}*/
				
				var joder= JSON.stringify(objectedItems2);
				//document.write(joder);
				
				var joder2 = '{ "name" : "node" , "children" : ';
				joder2 += joder;
				joder2 += '}';
				//document.write(joder2); 
				
				
				var margin = {
				    top: 40, right: 10, bottom: 10, left: 10},
				    width = 960 - margin.left - margin.right,
				    height = 500 - margin.top - margin.bottom;

				var color = d3.scale.category20c();

				var treemap = d3.layout.treemap()
				    .size([width, height])
				    .sticky(true)
				    .value(function(d) { return d.size; });

				var div = d3.select("body").append("div")
				    .style("position", "relative")
				    .style("width", (width + margin.left + margin.right) + "px")
				    .style("height", (height + margin.top + margin.bottom) + "px")
				    .style("left", margin.left + "px")
				    .style("top", margin.top + "px");
				
				//"" is the path of the json, if gives error, it would use the root value
				d3.json("", function(error, root) {
					root=JSON.parse( joder2 );
				  var node = div.datum(root).selectAll(".node")
				      .data(treemap.nodes)
				    .enter().append("div")
				      .attr("class", "node")
				      .call(position)
				      .style("background", function(d) { return d.children ? color(d.name) : null; })
				      .text(function(d) { return d.children ? null : d.name; });
					

				  d3.selectAll("input").on("change", function change() {
				    var value = this.value === "count"
					? function() { return 1; }
					: function(d) { return d.size; };

				    node
					.data(treemap.value(value).nodes)
				      .transition()
					.duration(1500)
					.call(position);
				  });
				});

				function position() {
				  this.style("left", function(d) { return d.x + "px"; })
				      .style("top", function(d) { return d.y + "px"; })
				      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
				      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
				}
				

          		}
		}
	});

})(jQuery);

