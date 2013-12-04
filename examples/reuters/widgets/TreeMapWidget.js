(function ($) {
        
	AjaxSolr.TreeMapWidget = AjaxSolr.AbstractFacetWidget.extend({
		afterRequest: function () 
		{
	                
			if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
				$(this.target).html('no items found in current selection');
				return;
			}else{

				//extraccio de fields
				var maxCount = 0;
			    	var objectedItems = [];
			    	for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
			      		var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
			      		if (count > maxCount) {
						maxCount = count;
			      		}
			      		objectedItems.push({ facet: facet, count: count });
			    	}
			    	objectedItems.sort(function (a, b) {
			      		return a.facet < b.facet ? -1 : 1;
			    	});
				
				//construccio dels tags del tagcloud
				$(this.target).empty();
				for (var i = 0, l = objectedItems.length; i < l; i++) {
					var facet = objectedItems[i].facet;
			      		$(this.target).append(
						$('<a href="#" class="treemap_item"></a>')
							.text(facet)
								.addClass('treemap_size_' + parseInt(objectedItems[i].count / maxCount * 10))
									.click(this.clickHandler(facet))
			      		);
			    	}
				
				//codi treemap
				/*
                                var w = 960,
				    h = 500,
				    color = d3.scale.category20c();
				
				var treemap = d3.layout.treemap()
				    .size([w, h])
				    .sticky(true)
				    .value(function(d) { return d.size; });
					
				var div = d3.select("#chart").append("div")
				    .style("position", "relative")
				    .style("width", w + "px")
				    .style("height", h + "px");
				
					//ara extreu de un json, el nostre objectiu es extreure dels facets (mirar lo de objecteditems)
				d3.json("../data/flare.json", function(json) {
				  div.data([json]).selectAll("div")
				      .data(treemap.nodes)
				    .enter().append("div")
				      .attr("class", "cell")
				      .style("background", function(d) { return d.children ? color(d.name) : null; })
				      .call(cell)
				      .text(function(d) { return d.children ? null : d.name; });
					//end

				  d3.select("#size").on("click", function() {
				    div.selectAll("div")
					.data(treemap.value(function(d) { return d.size; }))
				      .transition()
					.duration(1500)
					.call(cell);

				    d3.select("#size").classed("active", true);
				    d3.select("#count").classed("active", false);
				  });

				  d3.select("#count").on("click", function() {
				    div.selectAll("div")
					.data(treemap.value(function(d) { return 1; }))
				      .transition()
					.duration(1500)
					.call(cell);

				    d3.select("#size").classed("active", false);
				    d3.select("#count").classed("active", true);
				  });
				});

				function cell() {
				  this
				      .style("left", function(d) { return d.x + "px"; })
				      .style("top", function(d) { return d.y + "px"; })
				      .style("width", function(d) { return d.dx - 1 + "px"; })
				      .style("height", function(d) { return d.dy - 1 + "px"; });
				}
				*/

                        }
		}
	});

})(jQuery);

//backup
/* 
(function ($) {
        
	AjaxSolr.TreeMapWidget = AjaxSolr.AbstractFacetWidget.extend({
		afterRequest: function () 
		{
	                
			if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
				$(this.target).html('no items found in current selection');
				return;
			}else{
				
                                ///codi tagcloud
                                
				var maxCount = 0;
			    	var objectedItems = [];
			    	for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
			      		var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
			      		if (count > maxCount) {
						maxCount = count;
			      		}
			      		objectedItems.push({ facet: facet, count: count });
			    	}
			    	objectedItems.sort(function (a, b) {
			      		return a.facet < b.facet ? -1 : 1;
			    	});

				$(this.target).empty();
				for (var i = 0, l = objectedItems.length; i < l; i++) {
					var facet = objectedItems[i].facet;
			      		$(this.target).append(
						$('<a href="#" class="treemap_item"></a>')
							.text(facet)
								.addClass('treemap_size_' + parseInt(objectedItems[i].count / maxCount * 10))
									.click(this.clickHandler(facet))
			      		);
			    	}
                        }
		}
	});

})(jQuery);
*/
