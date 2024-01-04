const fs = require("fs");
const pdfparse = require("pdf-parse");
const prompt = require("prompt-sync")();

let path1, path2; //to store relative paths of pdf files
path1 = prompt("Enter the relative path to first file : ");
path2 = prompt("Enter the relative path to second file : ");
console.log(" ");

const pdffile1 = fs.readFileSync(path1);
const pdffile2 = fs.readFileSync(path2);

let text1, text2; //to store contents of pdf files
pdfparse(pdffile1).then(function (data) {
  text1 = data.text;
  pdfparse(pdffile2).then(function (data) {
    text2 = data.text;
    let linesOfPdf1 = [],
      linesOfPdf2 = [];
    linesOfPdf1 = text1.split("\n"); //creating an array which contains each line of pdf 1.
    linesOfPdf2 = text2.split("\n"); //creating an array which contains each line of pdf 2.
    len2 = linesOfPdf2.length;
    len1 = linesOfPdf1.length;
    let ind1 = 0,
      ind2 = 0,
      eq = true; //
    // compairing line by line if files are identical or not
    while (ind1 < len1 && ind2 < len2) {
      if (linesOfPdf1[ind1] != linesOfPdf2[ind2]) {
        eq = false;
        break;
      }
      ind1++;
      ind2++;
    }
    if (eq) {
      console.log(" ");
      console.log("Files are identical");
      console.log(" ");
    } else {
      console.log(" ");
      console.log("Files are different");
      console.log(" ");
    }
    ind1 = 0;
    ind2 = 0;
    //printing lines which are different
    while (ind1 < len1 && ind2 < len2) {
      if (linesOfPdf1[ind1] != linesOfPdf2[ind2]) {
        eq = false;
        console.log(`PDF 1 : ${linesOfPdf1[ind1]}`);
        console.log(`PDF 2 : ${linesOfPdf2[ind2]}`);
        console.log("");
      }
      ind1++;
      ind2++;
    }
    if (ind1 != len1) {
      console.log("These lines are missing in PDF 2");
      while (ind1 != len1) {
        console.log(linesOfPdf1[ind1]);
        ind1++;
      }
    }
    if (ind2 != len1) {
      console.log("These lines are missing in PDF 1");
      while (ind2 != len2) {
        console.log(linesOfPdf2[ind2]);
        ind2++;
      }
    }
  });
});
