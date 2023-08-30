const xmlhttp = new XMLHttpRequest();
const xmlhttp2 = new XMLHttpRequest();
const xmlhttp3 = new XMLHttpRequest();
applMdls();
//applFirm();
function wenEta(ifonemdl,isover) {
	xmlhttp.open("GET", "https://api.appledb.dev/compat/" + ifonemdl + "/" + isover + ".json");
	xmlhttp.send();
	xmlhttp.onload = function() {
		//const myObj = JSON.parse(this.responseText);
		if (this.responseText == "[]") {
			window.alert("eta son");
		} else if (this.status == "404") {
			window.alert("eta nevr");
		} else {
			const myObj = JSON.parse(this.responseText);
			//window.alert("eta now</br>jelbrek type: " + myObj[0].info.type
			let etanowtxt="eta now";
			let table="<tr><th>jelbrek</th><th>type</th></tr>";
			for (let x in myObj) {
				table += "<tr><td>";
				table += myObj[x].name;
				table += "</td><td>";
				table += myObj[x].info.type;
				table += "</td></tr>";
			}
			document.getElementById("etanow").innerHTML = etanowtxt;
			document.getElementById("jbtable").innerHTML = table;
		}
	}
}

function applMdls() {
	xmlhttp2.onload = function() {
		const mdlObj = JSON.parse(this.responseText);
		//let text = "<select id='ifonemdl'>"
		let text = "<select id='ifonemdl' onchange='applFirm(this.value)'>"
		for (let x in mdlObj) {
			if (mdlObj[x].identifier != "") {
			//for (let y in mdlObj[x].identifier) {
			//text += "<option value='" + mdlObj[x].identifier[y] + "'>" + mdlObj[x].name + "</option>";
			//}
			text += "<option value='" + mdlObj[x].key + "'>" + mdlObj[x].name + "</option>";
			}
		}
		text += "</select>"
		document.getElementById("mdllist").innerHTML = text;
	}
	xmlhttp2.open("GET", "https://api.appledb.dev/device/main.json");
	xmlhttp2.send();
}
/*
function applFirm() {
	xmlhttp3.onload = function() {
		const firmObj = JSON.parse(this.responseText);
		let text = "<select id='isover'>"
		for (let x in firmObj) {
			if (firmObj[x].build != undefined) {
			text += "<option value='" + firmObj[x].build + "'>" + firmObj[x].version + "(" + firmObj[x].build + ")</option>";
			}
		}
		text += "</select>"
		document.getElementById("firmlist").innerHTML = text;
	}
	xmlhttp3.open("GET", "https://api.appledb.dev/ios/main.json");
	xmlhttp3.send();
}
*/
function applFirm(ifonemdl) {
	xmlhttp3.onload = function() {
		const firmObj = JSON.parse(this.responseText);
		let text = "<select id='isover'>"
		for (let x in firmObj.frontmatter.versionArr) {
			//if (firmObj.frontmatter.versionArr[x].build != undefined) {
			//text += "<option value='" + firmObj.frontmatter.versionArr[x].build + "'>" + firmObj.frontmatter.versionArr[x].version + "(" + firmObj.frontmatter.versionArr[x].build + ")</option>";
			//}
			if (firmObj.frontmatter.versionArr[x].uniqueBuild != undefined) {
			text += "<option value='" + firmObj.frontmatter.versionArr[x].uniqueBuild + "'>" + firmObj.frontmatter.versionArr[x].version + "(" + firmObj.frontmatter.versionArr[x].uniqueBuild + ")</option>";
			}
		}
		text += "</select>"
		document.getElementById("firmlist").innerHTML = text;
	}
	xmlhttp3.open("GET", "https://appledb.dev/pageData/device/identifier/" + ifonemdl + ".json");
	xmlhttp3.send();
}