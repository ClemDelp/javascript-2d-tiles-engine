var utilities = {
	//////////////////////////////
  	// UTILITIES
  	//////////////////////////////
	getJsonSize : function(json){
		var key, count = 0;
		for(key in json) {
		  if(json.hasOwnProperty(key)) {
		    count++;
		  }
		}
		return count;
	},
}