var mlib = {
 	displayMatrice: function(matrice){
		matrice.map(function(line){
			if(line.length == undefined)line = [line];
			console.log(line);
		});
 	},
 	cloneMatrice: function(matrice){
 		var m = [];
 		matrice.forEach(function(line){
 			m.unshift(line);
 		});
 		m = m.reverse();
 		return m;
 	},
 	getPosition : function(matrice){
 		var x = 0;
 		var y = 0;
 		var done = false;
 		matrice.forEach(function(line){
 			if(done == false){
 				line.forEach(function(val){
	 				if(done == false){
	 					if(val == 0){
		 					done = true;
		 					return false;
		 				}
		 				x = x+1;	
	 				} 

	 			});
	 			if(done == false){
	 				y = y+1;
	 				x=0;
	 			}
	 		}
 		});
 		if(y == matrice.length){x = "none";y = "none";}
 		return [x,y];
 	},
 	getEmptySpace : function(pos,matrice){
 		var x = 0;
 		var y = 0;
 		var largeurs = [];
 		var Longueur = 0;
 		var done = false;
 		matrice.forEach(function(line){
 			if(done != true){
	 			if(y >= pos[1]){// Si on est à la bonne hauteur
	 				l = 0;
	 				if(line[pos[0]] == 0){
	 					Longueur = Longueur+1;
	 					i = pos[0];
	 					while(i<line.length){// tant qu'on est pas au bord de la matrice
	 						if(line[i] == 0){
	 							l = l+1;	
	 						}else{
	 							break;
	 						}
	 						i = i+1;
	 					}
			 			largeurs.unshift(l);
			 			x=0;
	 				}else{
	 					done = true;
	 					return false;	
	 				}
	 			}
	 			y = y+1;	
 			}
 		});
 		largeur = Math.min.apply(Math,largeurs);
 		if(largeur == Infinity) largeur = 0;
 		return [largeur,Longueur];
 	},
 	matriceFusion : function(m1,m2){
 		var i = 0;
 		var first = [];
 		var second = [];
 		var m4 = [];
 		if(m1.length > m2.length){
 			first = m1;
 			second = m2;
 			if(first.length == undefined) first = [m1];
	 		if(second.length == undefined) second = [m2];	
 		}else{
 			first = m2;
 			second = m1;
 			if(first.length == undefined) first = [m2];
	 		if(second.length == undefined) second = [m1];	
 		} 
 		l = 0;
 		first.forEach(function(line){
 			m4[l] = mlib.fusionArray(line,second[l]);
 			m4[l] = mlib.arrayIntReplaceMethod(m4[l],2,1);
 			l = l+1;
 		});
 		var m5 = mlib.completeEmptyMatrice(m4);
 		return m5;
 	},
 	completeEmptyMatrice : function(matrice){
 		var l_max = 0;
 		matrice.forEach(function(line){
 			if(line.length > l_max) l_max = line.length;
 		});
 		var result = [];
 		matrice.forEach(function(line){
 			i=0;
 			while(i<l_max){
 				if(line[i] == undefined) line[i] = 0;
 				i=i+1;
 			}
 			result.unshift(line);
 		})
 		result = result.reverse();
 		return result;
 	},
 	fusionArray : function(a1,a2){
 		var a3 = [];
 		if(a1 == undefined){
 			a3 = a2;
 		}else if(a2 == undefined){
 			a3 = a1;
 		}else{
 			var c = 0;
	 		var first = [];
	 		var second = [];
	 		if(a1.length > a2.length){
	 			first = a1;
	 			second = a2;
	 			if(first.length == undefined) first = [a1];
	 			if(second.length == undefined) second = [a2];
	 		}else{
	 			first = a2;
	 			second = a1;
	 			if(first.length == undefined) first = [a2];
	 			if(second.length == undefined) second = [a1];
	 		}

	 		first.forEach(function(col){ 
	 			if(second[c] == undefined) a3[c] = col;
	 			else a3[c] = second[c] + col;
	 			c = c+1;
	 		});
 		}
 		return a3;
 	},
 	parseArrayInt : function(array){
 		return array.map(function (x) { 
			return parseInt(x, 10); 
		});
 	},
 	arrayIntReplaceMethod : function(array, val1, val2){
 		if(array.length == undefined)array = [array];
 		return array.map(function (x) { 
 			if(x == val1)x=val2; 
			return x;
		});
 	},
 	arrayStringReplaceMethod : function(array, val1, val2){
 		return array.map(function (x) { 
			return x.replace(val1,val2); 
		});
 	},
 	positionMatriceIntoMatrice : function(main,m,pos){
 		var result = [];
 		var delta_x = pos[0];
 		var delta_y = pos[1];
 		var l_m = m[0].length;
 		if(l_m == undefined)l_m=1;
 		var h_m = m.length;
 		if(h_m == undefined)h_m=1;
 		var l_main = 0;
 		var h_main = 0;
 		while(l_main<l_m){
 			while(h_main<h_m){
 				if(m[0].length != undefined){
 					if(m[h_main][l_main] != 0)main[h_main+delta_y][l_main+delta_x] = m[h_main][l_main]	
 				}else if(m[0] == 1){
 					main[h_main+delta_y][l_main+delta_x] = 1
 				}
 				
 				h_main = h_main+1;
 			}
 			h_main = 0;
 			l_main = l_main+1;	
 		}
 		return main;
 	},
 	getYArrayInMatrix : function(y1,y2,matrice){
 		var result = [];
 		for(l = 0; l < matrice.length; l++){
		    for(c = 0; c < matrice[l].length; c++){
		        if(matrice[l][c] == y1){
		        	if(l+1 < matrice.length){
		        		if(matrice[l+1][c] == y2){
		        			// On prend les coordonnees du plus petit
		        			if(matrice[l][c] < matrice[l+1][c]) result.unshift([c,l]);
		        			else result.unshift([c,l+1]);
		        		} 	
		        	}
		        }
		    }
		}

		return result;
 	},
 	getXArrayInMatrix : function(x1,x2,matrice){
 		var result = [];
 		for(l = 0; l < matrice.length; l++){
		    for(c = 0; c < matrice[l].length; c++){
		        if(matrice[l][c] == x1){
		        	if(c+1 < matrice[0].length){
		        		if(matrice[l][c+1] == x2){
		        			// On prend les coordonnees du plus petit
		        			if(matrice[l][c] < matrice[l][c+1]) result.unshift([c,l]);
		        			else result.unshift([c+1,l]);
		        		} 	
		        	}
		        }
		    }
		}

		return result;
 	},
 	setValToCoordinates : function(val,matrice,coordinates){
 		var result = matrice;
 		coordinates.forEach(function(c){
 			matrice[c[1]][c[0]] = val;
 		});

		return result;
 	}
 }
