var fs = require("fs");

fs.readFile("triangle2.txt", function(err, buf) {
  const resultText = buf.toString();
  const triangle = resultText.split("\n").reduce((result, next) => {
    let newResult = [...result];
    newResult.push(next.split(" "));
    return newResult;
  }, []);

  const result = maximumTrianglePathSum(triangle);
  
  console.log(`path: ${result[0]}`);
  console.log(`summary: ${result[1]}`);
});

function maximumTrianglePathSum(triangle) {
  let paths = [];
  function distilLastLine() {
    let lastLine = triangle.pop();
    let aboveLine = triangle.pop();
    let originalAboveLine = [...aboveLine];

    for (let i = 0; i < aboveLine.length; i++) {
      aboveLine[i] = Math.max(
        Number(aboveLine[i]) + Number(lastLine[i]),
        Number(aboveLine[i]) + Number(lastLine[i + 1])
      );
    }

    const index = aboveLine.findIndex(value => {
      return value == Math.max(...aboveLine);
    });

    paths.push(originalAboveLine[index]);
    triangle.push(aboveLine);
  }

  do {
    distilLastLine();
  } while (triangle.length > 1);

  paths.unshift(
    triangle[0][0] -
      paths.reduce((result, next) => {
        return Number(result) + Number(next);
      }, 0)
  );

  let textPaths = paths.reverse().reduce((result, next) => {
    return `${result} -> ${next}`;
  }, "");

  return [textPaths, triangle[0][0]];
}
