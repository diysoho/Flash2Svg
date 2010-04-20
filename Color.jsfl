(function(dx){
	function Color(){
		var args=new dx.Array(arguments).remove([undefined]);
		this.percent=[100,100,100,100];
		if(args.length==1){
			var sel=args[0];
			switch(sel.constructor.name){
				case 'SymbolInstance':
					var rgba=[
						'colorRedAmount',
						'colorGreenAmount',
						'colorBlueAmount',
						'colorAlphaAmount'
					];
					var rgbaX=[
						'colorRedPercent',
						'colorGreenPercent',
						'colorBluePercent',
						'colorAlphaPercent'
					];
					for(var n=0;n<4;n++){this.push(sel[rgba[n]]);}
					for(var n=0;n<4;n++){this.percent[n]=sel[rgbaX[n]];}
					break;
				case 'Shape':
					var fill=dx.doc.getCustomFill(sel);
					if(fill.style!='solid') fill=dx.doc.getCustomFill('toolbar');
					this.hex=fill.color;
					break;
				case 'String':
					this.hex=args[0];
					break;
				case 'Array':
					dx.Array.apply(this,args.$);
			}
		}else{
			dx.Array.apply(this,args.$);
		}
		while(this.length<4) this.push(255);
		return this;
	}
	Color.prototype={
		__proto__:dx.Array.prototype,
		set hex(hstring){
			var hexDigit=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
			if(hstring[0]=="#") hstring=hstring.slice(1);
			this.clear();
			for(var i=0;i<hstring.length;i+=2){
				this.push(hexDigit.indexOf(hstring[i].toUpperCase())*16.0+hexDigit.indexOf(hstring[i+1]));
			}
			while(this.length<4){this.push(255);}
			return this;
		},
		get hex(alpha){
			alpha=alpha||false;
			var hexDigit=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
			var hstring="#";
			for(var i=0;i<this.length-(alpha?0:1);i++){
				hstring+=(
					hexDigit[Math.floor(this[i]/16.0)]+
					hexDigit[Math.round(this[i]-16.0*Math.floor(this[i]/16.0))]
				);
			}
			return hstring;
		},
		set red(value){this[0]=value;},
		get red(){return this[0];},
		set green(value){this[1]=value;},
		get green(){return this[1];},
		set blue(value){this[2]=value;},
		get blue(){return this[2];},
		set alpha(value){this[3]=value;},
		get alpha(){return this[3];},
		set r(value){this[0]=value;},
		get r(){return this[0];},
		set g(value){this[1]=value;},
		get g(){return this[1];},
		set b(value){this[2]=value;},
		get b(){return this[2];},
		set a(value){this[3]=value;},
		get a(){return this[3];},
		//methods
		blend:function(options){
			
		}
	}
	dx.extend({
		Color:Color
	})
})(dx)
