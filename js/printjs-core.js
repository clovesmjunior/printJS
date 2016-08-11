/**  
 * printJS - Export and print files by JavaScript
 * Version 0.0.1-git Built on 2016-08-09T12:15 
 *
 * MIT License
 * 
 * Copyright (c) 2016 Cloves Moreira Junior
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * Contributor(s):
 *    clovesmjunior
 */

var printJS = function(options){
	var self = this;
	var _optConfig = {};

	var _contentValue = null;
	var _isHTML = false;
	var _isJSON = false;

	if(!options){
		options = {};
	}
	this._init=function(){
		//config properties of generator file
		_optConfig.dateConfig = (options.dateConfig)?options.dateConfig:{
			mask: 'DD/MM/YYYY'
		};
		_optConfig.orientation = (options.orientation)?options.orientation:'l';
		_optConfig.grid = (options.grid)?options.grid:true;
		_optConfig.unit = (options.unit)?options.unit:'pt';
		_optConfig.format = (options.format)?options.format:'a4';
		_optConfig.tableWidth= (options.tableWidth)?options.tableWidth:'auto';
		_optConfig.nameReport = (options.nameReport)?options.nameReport:'report';
		_optConfig.margin = (options.margin)?options.margin:{};
		_optConfig.margin.top = (options.margin && options.margin.top)?options.margin.top:80;
		_optConfig.margin.left = (options.margin && options.margin.left)?options.margin.left:40;
	 	_optConfig.styles =  (options.styles)?options.styles:{fillColor: [255, 255, 255]};
	 	
		//config properties of Page Header
		_optConfig.pageHeader = {};
		_optConfig.pageHeader.title = (options.pageHeader && options.pageHeader.title)?options.pageHeader.title:null;		
		_optConfig.pageHeader.manualConfigPDF = function(doc, data){
			if(options.pageHeader){
				if(options.pageHeader.manualConfigPDF && options.pageHeader.manualConfigPDF)
				{	
					options.pageHeader.manualConfigPDF(doc, data);
				}else{
					if(options.pageHeader.isDefaultHeader){
		  				var title = (options.pageHeader.title)?options.pageHeader.title:"";
		  				doc.setFontSize((options.pageHeader.size)?options.pageHeader.size:20);
				        doc.setTextColor((options.pageHeader.color)?options.pageHeader.color:40);
				        doc.setFontStyle((options.pageHeader.fontStyle)?options.pageHeader.fontStyle:'normal');
				        var xOffset;
				        if(options.pageHeader.posCenter){
				        	xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(title) * doc.internal.getFontSize() / 2);			        
				        }else{
				        	xOffset = (options.pageHeader.titleX)?options.pageHeader.titleX:data.settings.margin.left;
				        }

				        if(options.pageHeader.image){
				        	doc.addImage(options.pageHeader.image.image64, 
				        		(options.pageHeader.image.formatImage)?options.pageHeader.image.formatImage:'JPEG', 
				        		(options.pageHeader.image.x)?options.pageHeader.image.x:data.settings.margin.left, 
				        		(options.pageHeader.image.y)?options.pageHeader.image.y:40, 
				        		(options.pageHeader.image.w)?options.pageHeader.image.w:25, 
				        		(options.pageHeader.image.h)?options.pageHeader.image.h:25);		
				        }
				        
				        doc.text(title,xOffset, (options.pageHeader.titleY)?options.pageHeader.titleY:60);					
					}
				}
				
			}
				
		};

		//config properties of Page Footer
		_optConfig.pageFooter = {};
		_optConfig.pageFooter.title = (options.pageFooter && options.pageFooter.title)?options.pageFooter.title:null;
		_optConfig.pageFooter.numberPage = (options.pageFooter && options.pageFooter.numberPage)?options.pageFooter.numberPage:null;
		if(_optConfig.pageFooter.numberPage!==null){
			_optConfig.pageFooter.numberPage.mask = (options.pageFooter && options.pageFooter.numberPage.mask)?options.pageFooter.numberPage.mask:"#currentDate - Page #currentPage of #totalPages";	
			_optConfig.pageFooter.numberPage.positionHorizontal = (options.pageFooter && options.pageFooter.numberPage.positionHorizontal)?options.pageFooter.numberPage.positionHorizontal:"left";	
			_optConfig.pageFooter.numberPage.numSpacePos = (options.pageFooter && options.pageFooter.numberPage.numSpacePos)?options.pageFooter.numberPage.numSpacePos:120;	
			_optConfig.pageFooter.numberPage.positionVertical = (options.pageFooter && options.pageFooter.numberPage.positionVertical)?options.pageFooter.numberPage.positionVertical:"bottom";
			_optConfig.pageFooter.numberPage.positionVerticalPrecision = (options.pageFooter && options.pageFooter.numberPage.positionVerticalPrecision)?options.pageFooter.numberPage.positionVerticalPrecision:(-30);
		}		

		//config properties of file
		_optConfig.properties = {};
		_optConfig.properties.title = (options.properties && options.properties.title)?options.properties.title:"-";
		_optConfig.properties.subject = (options.properties && options.properties.subject)?options.properties.subject:"-";
		_optConfig.properties.author = (options.properties && options.properties.author)?options.properties.author:"printJS";
		_optConfig.properties.keywords = (options.properties && options.properties.keywords)?options.properties.keywords:"";
		_optConfig.properties.subject = (options.properties && options.properties.creator)?options.properties.creator:"-";
		//config properties of column
		_optConfig.configColumns = {};
		_optConfig.configColumns.columns = (options.configColumns && options.configColumns.columns)?options.configColumns.columns:[];
		_optConfig.configColumns.columnStyles = (options.configColumns && options.configColumns.columnStyles)?options.configColumns.columnStyles:{id: {fillColor: 0}};		
		_optConfig.configColumns.headerStyles =  (options.configColumns && options.configColumns.headerStyles)?options.configColumns.headerStyles:{
					fillColor: [70,130,180],
					fontSize: 8,
            		rowHeight: 17,
            		halign: 'center', // left, center, right
    				valign: 'middle', // top, middle, bottom
				};
		_optConfig.configColumns.bodyStyles =  (options.configColumns && options.configColumns.bodyStyles)?options.configColumns.bodyStyles:{
					fillColor: [255, 255, 255],
					fontSize: 8,
					rowHeight: 17,
					halign: 'left', // left, center, right
    				valign: 'middle', // top, middle, bottom
    				overflow: 'linebreak',  // visible, hidden, ellipsize or linebreak
    				lineWidth: 0.1,
    				lineColor: [192,192,192]};
	};

	this.showOptions = function(){
		return _optConfig;
	};

	this.exportPDF = function(modePrint){
		_optConfig.modePrint = (modePrint)?modePrint:'text';
		var printPDFObj = printPDF(_optConfig);		
		printPDFObj.genPDF(_contentValue);

	};

	this.setContent = function(data){
		_contentValue = data;
		_isHTML = false;
		_isJSON = false;
		return self;
	};


	this.setContentHTML = function(data){
		_contentValue = data;
		_isHTML = true;
		_isJSON = false;
		return self;
	};

	this.setContentJSON = function(data){
		_contentValue = data;
		_isHTML = false;
		_isJSON = false;
		return self;
	};
	
		
	this._init();
	return this;
};

var printPDF = function(options){
	var self = this;
	var totalPagesExp = "{total_pages_count_string}";
	this.genTest = function(){
		var doc = new jsPDF(options.orientation,options.unit, nameReport);
		doc.text(20, 20, 'Hello world.');
		doc.save(options.nameReport+'.pdf');	
	};

	this.getJsonByTableHTML = function(doc, obj){
		return doc.autoTableHtmlToJson(obj);    	
	};

	this.createTablePDF = function(doc, res, isByTable){
		var defOpt = {
		   	tableWidth: options.tableWidth,
		    styles: options.styles,
		    columnStyles: options.configColumns.columnStyles,
		    headerStyles: options.configColumns.headerStyles,
		    bodyStyles: options.configColumns.bodyStyles,
		    margin: {
		    	top: options.margin.top,
		    	//left: options.margin.left,
		    },
		    beforePageContent: function(data) {
		        options.pageHeader.manualConfigPDF(doc, data);				        
		    },
		    afterPageContent: function(data) {
		    	self.genNumberPagesPDF(data, doc);
		    }
		};
		if(options.grid){
			defOpt.theme= 'grid';
		}
		doc.autoTable((isByTable)? res.columns :options.configColumns.columns, (isByTable)? res.data :res, defOpt);
		return doc;
	};

	this.genPDF = function(data){
		var doc = new jsPDF('p', options.unit);
		var nameReport = options.nameReport+'.pdf';
		switch(options.modePrint){			
			case 'text':				
				var strPos = "";
				data.forEach(function(resp, i){
					for(var index in resp){
						strPos+=index+":"+resp[index]+" ";									
					}
					doc.text(20, 10 + (i * 10),strPos);
					strPos = "";
				    
				});	
			break;

			case 'table':								
				doc = self.createTablePDF(doc, data, false);
			break;

			case 'html':
				jsonData = self.getJsonByTableHTML(doc, data);
				doc = self.createTablePDF(doc, jsonData, true);
			break;
		}
		
		if (typeof doc.putTotalPages === 'function') {
	        doc.putTotalPages(totalPagesExp);
	    }

		doc.save(nameReport);
	};

	this.genNumberPagesPDF=function(data, doc){
		if(options.pageFooter!==null && options.pageFooter.numberPage!==null){
			var numberPageObj = options.pageFooter.numberPage;
			var strReplaced = numberPageObj.mask.replace("#currentDate", (moment().format(options.dateConfig.mask))).replace("#currentPage", data.pageCount);
	        // Total page number plugin only available in jspdf v1.0+
	        if (typeof doc.putTotalPages === 'function') {
	    	 	strReplaced = strReplaced.replace("#totalPages",totalPagesExp);
	        }
	        var calcSize = strReplaced.length * ((strReplaced.length>110)?3.6: 2.9);
	        var calcPosition = 0;
	        switch(numberPageObj.positionHorizontal){
	        	case 'right':
	        		calcPosition = (doc.internal.pageSize.width - calcSize);
	        	break;
	        	case 'left':
	        		calcPosition = data.settings.margin.left;
	        	break;
	        	case 'center':
	        		var posTot = doc.internal.pageSize.width - calcSize;
	        		calcPosition = posTot/2;
	        	break;
	        }

	        doc.text(strReplaced, calcPosition,(numberPageObj.positionVertical==="bottom")?(doc.internal.pageSize.height + numberPageObj.positionVerticalPrecision):((- numberPageObj.positionVerticalPrecision) - doc.internal.pageSize.height));
	    }
	};
	return this;
};
