//layerExporter.jsx
//
//Copyright 2011 Pedro L. Morales Rodriguez
//
//layerExporter is free software: you can redistribute it and/or modify it under
//the terms of the GNU General Public License as published by the Free Software
//Foundation, either version 3 of the License, or (at your option) any later
//version.
//
//layerExporter is distributed in the hope that it will be useful, but WITHOUT
//ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
//FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
//
//See http://www.gnu.org/licenses/.


var saveOptions = new PNGSaveOptions();
var doc = app.activeDocument;
var currentFolder = doc.path;
var newFolder = doc.name+"_separated"
var tempFolder = new Folder (currentFolder + "/" + newFolder)

main();

function evalueLayer(refLayer) {
	if (refLayer.typename == "LayerSet") {
		
		for (var idx = 0; idx < refLayer.layers.length; idx++) {
			var newLayer = refLayer.layers[idx];
			if (newLayer.visible) {
				evalueLayer(newLayer);
			}
		}
	}
	else if (refLayer.typename == "ArtLayer") {
		refLayer.copy();
		
		var newDoc = app.documents.add(doc.width, doc.height, doc.resolution, 
			refLayer.name, 
			NewDocumentMode.RGB,
			DocumentFill.TRANSPARENT);
		newDoc.name = refLayer.name;
		newDoc.paste();
		newDoc.trim(TrimType.TRANSPARENT);
		var newFile = new File(tempFolder + "/" + refLayer.name + ".png");
		newDoc.saveAs(newFile, saveOptions, true, Extension.LOWERCASE);
		newDoc.close(SaveOptions.DONOTSAVECHANGES);
		
		app.activeDocument = doc;
	}
}

function main() {
	try {
		var layers = doc.layers;
		tempFolder.create();

		for (var idx = 0; idx < layers.length; idx++) {
			var refLayer = doc.layers[idx];
			if (refLayer.visible) {
				evalueLayer(refLayer);
			}
		}
		alert("The exportation has completed succesful!!");
	} 
	catch (e) {
		alert(e);
	}
}
